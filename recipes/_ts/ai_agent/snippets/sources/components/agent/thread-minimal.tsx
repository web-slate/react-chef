import { ThreadPrimitive, ComposerPrimitive, MessagePrimitive } from "@assistant-ui/react";
import { ArrowUpIcon } from "lucide-react";
import { FC } from "react";

export const MinimalThread: FC = () => {
  return (
    <div className="flex h-full flex-col">
      <ThreadPrimitive.Root className="flex-1 overflow-y-auto p-4">
        <ThreadPrimitive.Messages
          components={{
            UserMessage: () => (
              <MessagePrimitive.Root className="mb-4">
                <div className="bg-blue-100 rounded p-3 max-w-md ml-auto">
                  <MessagePrimitive.Content />
                </div>
              </MessagePrimitive.Root>
            ),
            AssistantMessage: () => (
              <MessagePrimitive.Root className="mb-4">
                <div className="bg-gray-100 rounded p-3 max-w-md">
                  <MessagePrimitive.Content />
                </div>
              </MessagePrimitive.Root>
            ),
          }}
        />
      </ThreadPrimitive.Root>

      <div className="border-t p-4">
        <ComposerPrimitive.Root className="flex gap-2">
          <ComposerPrimitive.Input
            className="flex-1 border rounded px-3 py-2"
            placeholder="Type a message..."
            onKeyDown={(e) => {
              console.log("Key pressed:", e.key);
              if (e.key === "Enter" && !e.shiftKey) {
                console.log("Enter pressed - should submit");
              }
            }}
          />
          <ComposerPrimitive.Send asChild>
            <button 
              className="bg-blue-500 text-white rounded px-4 py-2"
              onClick={() => {
                console.log("=== SEND BUTTON CLICKED ===");
              }}
            >
              <ArrowUpIcon className="w-5 h-5" />
            </button>
          </ComposerPrimitive.Send>
        </ComposerPrimitive.Root>
      </div>
    </div>
  );
};