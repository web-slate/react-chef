"use client";

import { AssistantRuntimeProvider } from "@assistant-ui/react";
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
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Clock } from "lucide-react";

import { useChatRuntime } from "@/hooks/useChatRuntime";

export const Assistant = () => {
  const { runtime, quotaInfo } = useChatRuntime();

  return (
    <AssistantRuntimeProvider runtime={runtime}>
      <SidebarProvider>
        <div className="flex h-dvh w-full pr-0.5">
          <ThreadListSidebar />

          <SidebarInset>
            <header className="flex h-16 items-center gap-2 border-b px-4">
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

              {/* Quota Indicator */}
              {quotaInfo && (
                <div className="ml-auto flex items-center gap-2 text-sm">
                  {quotaInfo.can_request ? (
                    <span className="text-green-600 dark:text-green-400">
                      {quotaInfo.remaining_requests} requests left
                    </span>
                  ) : (
                    <span className="flex items-center gap-1 text-orange-500">
                      <Clock className="h-4 w-4" />
                      Wait {quotaInfo.retry_after_seconds}s
                    </span>
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
