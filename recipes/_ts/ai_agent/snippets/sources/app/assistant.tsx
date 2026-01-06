"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
import { useExternalStoreRuntime } from "@assistant-ui/react";
import { Thread } from "@/components/agent/thread";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { ThreadListSidebar } from "@/components/agent/threadlist-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { useState, useEffect } from "react";
import { Clock } from "lucide-react";

const LANGCHAIN_API_URL = "http://127.0.0.1:8000/api/chat";
const QUOTA_API_URL = "http://127.0.0.1:8000/api/quota";

export const Assistant = () => {
  const [messages, setMessages] = useState<any[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [quotaInfo, setQuotaInfo] = useState<any>(null);

  // Check quota only once on mount
  useEffect(() => {
    checkQuota();
  }, []);

  const checkQuota = async () => {
    try {
      const response = await fetch(QUOTA_API_URL);
      const data = await response.json();
      setQuotaInfo(data);
      console.log("Quota checked:", data);
    } catch (error) {
      console.error("Error checking quota:", error);
    }
  };

  const runtime = useExternalStoreRuntime({
    messages,
    isRunning,
    onNew: async (message) => {
      console.log("=== Message submitted ===");

      // Check quota on submit (efficient - only when needed)
      await checkQuota();
      
      if (quotaInfo && !quotaInfo.can_request) {
        const errorMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant" as const,
          content: [
            {
              type: "text" as const,
              text: `⚠️ **Rate Limit Exceeded**\n\nYou've used all your available requests. Please wait **${quotaInfo.retry_after_seconds} seconds** before trying again.\n\nThe quota will reset automatically.`,
            },
          ],
          attachments: [],
          createdAt: new Date(),
          status: { type: "complete" as const },
          metadata: {},
          unstable_state: {},
        };
        setMessages((prev) => [...prev, errorMessage]);
        return;
      }

      const userMessage = {
        id: `user-${Date.now()}`,
        role: "user" as const,
        content: message.content,
        attachments: [],
        createdAt: new Date(),
        status: { type: "complete" as const },
        metadata: {},
        unstable_state: {},
      };
      
      setMessages((prev) => [...prev, userMessage]);
      setIsRunning(true);

      const userText = message.content
        .filter((part: any) => part.type === "text")
        .map((part: any) => part.text)
        .join("");

      console.log("Sending to API:", userText);

      try {
        const response = await fetch(LANGCHAIN_API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            message: userText,
          }),
        });

        if (response.status === 429) {
          const errorData = await response.json();
          const retryAfter = errorData.detail?.retry_after_seconds || 60;
          
          const rateLimitMessage = {
            id: `assistant-${Date.now()}`,
            role: "assistant" as const,
            content: [
              {
                type: "text" as const,
                text: `⚠️ **Rate Limit Exceeded**\n\n${errorData.detail?.message || "Too many requests"}\n\nPlease wait **${retryAfter} seconds** before trying again.`,
              },
            ],
            attachments: [],
            createdAt: new Date(),
            status: { type: "complete" as const },
            metadata: {},
            unstable_state: {},
          };
          
          setMessages((prev) => [...prev, rateLimitMessage]);
          // Update quota after rate limit error
          await checkQuota();
          return;
        }

        if (!response.ok) {
          throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        console.log("API response received");

        const assistantMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant" as const,
          content: [
            {
              type: "text" as const,
              text: data.reply,
            },
          ],
          attachments: [],
          createdAt: new Date(),
          status: { type: "complete" as const },
          metadata: {},
          unstable_state: {},
        };

        setMessages((prev) => [...prev, assistantMessage]);
        // Update quota after successful request
        await checkQuota();
        
      } catch (error) {
        console.error("Error calling LangChain API:", error);
        
        const errorMessage = {
          id: `assistant-${Date.now()}`,
          role: "assistant" as const,
          content: [
            {
              type: "text" as const,
              text: `❌ **Error**\n\n${error instanceof Error ? error.message : "Unknown error"}\n\nPlease make sure your FastAPI server is running at ${LANGCHAIN_API_URL}`,
            },
          ],
          attachments: [],
          createdAt: new Date(),
          status: { type: "complete" as const },
          metadata: {},
          unstable_state: {},
        };

        setMessages((prev) => [...prev, errorMessage]);
      } finally {
        setIsRunning(false);
      }
    },
  });

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SidebarProvider>
        <div className="flex h-dvh w-full pr-0.5">
          <ThreadListSidebar />
          <SidebarInset>
            <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
              <SidebarTrigger />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Gemini</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
              
              {/* Quota indicator - only updates on page load and after each request */}
              {quotaInfo && (
                <div className="ml-auto flex items-center gap-2 text-sm">
                  {quotaInfo.can_request ? (
                    <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
                      <span className="font-medium">{quotaInfo.remaining_requests}</span>
                      <span className="text-muted-foreground">requests left</span>
                    </div>
                  ) : (
                    <div className="flex items-center gap-1 text-orange-600 dark:text-orange-400">
                      <Clock className="h-4 w-4" />
                      <span className="text-xs">Wait {quotaInfo.retry_after_seconds}s</span>
                    </div>
                  )}
                </div>
              )}
            </header>
            <div className="flex-1 overflow-hidden">
              <Thread />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </AssistantRuntimeProvider>
  );
};