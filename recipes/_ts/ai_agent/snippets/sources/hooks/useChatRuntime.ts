import { useCallback, useEffect, useState } from "react";
import { useExternalStoreRuntime } from "@assistant-ui/react";
import { API } from "../lib/api";

  //  QUOTA HOOK (internal)

function useQuota() {
  const [quotaInfo, setQuotaInfo] = useState<any>(null);

  const checkQuota = useCallback(async () => {
    try {
      const res = await fetch(API.QUOTA);
      const data = await res.json();
      setQuotaInfo(data);
      return data;
    } catch (err) {
      console.error("Quota error:", err);
      return null;
    }
  }, []);

  useEffect(() => {
    checkQuota();
  }, [checkQuota]);

  return { quotaInfo, checkQuota };
}

  //  MAIN CHAT HOOK

export function useChatRuntime() {
  const [messages, setMessages] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);

  const { quotaInfo, checkQuota } = useQuota();

  const addAssistant = (text: string) => {
    setMessages((prev) => [
      ...prev,
      {
        id: `assistant-${Date.now()}`,
        role: "assistant",
        content: [{ type: "text", text }],
        attachments: [],
        createdAt: new Date(),
        status: { type: "complete" },
        metadata: {},
        unstable_state: {},
      },
    ]);
  };

  const runtime = useExternalStoreRuntime({
    messages,
    isRunning,

    onNew: async (message) => {
      const quota = await checkQuota();
      if (quota && !quota.can_request) {
        addAssistant(
          `⚠️ **Rate Limit Exceeded**\n\nPlease wait **${quota.retry_after_seconds}s** before trying again.`
        );
        return;
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `user-${Date.now()}`,
          role: "user",
          content: message.content,
          attachments: [],
          createdAt: new Date(),
          status: { type: "complete" },
          metadata: {},
          unstable_state: {},
        },
      ]);

      setIsRunning(true);

      const userText = message.content
        .filter((p: any) => p.type === "text")
        .map((p: any) => p.text)
        .join("");

      try {
        const res = await fetch(API.CHAT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userText }),
        });

        if (res.status === 429) {
          const err = await res.json();
          addAssistant(
            `⚠️ **Rate Limit Exceeded**\n\n${err.detail?.message || ""}`
          );
          await checkQuota();
          return;
        }

        const data = await res.json();
        addAssistant(data.reply);
        await checkQuota();
      } catch (err) {
        addAssistant("❌ **Error** — Unable to reach the server.");
      } finally {
        setIsRunning(false);
      }
    },
  });

  return { runtime, quotaInfo };
}
