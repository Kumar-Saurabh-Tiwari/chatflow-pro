import { useState } from "react";
import { LoginScreen } from "./LoginScreen";
import { Sidebar } from "./Sidebar";
import { ChatWindow } from "./ChatWindow";
import { useChat } from "@/hooks/useChat";
import { NotificationBanner } from "./NotificationBanner.tsx";
import { useBackendWarmup } from "@/hooks/useBackendWarmup";
import { BackendWarmupBanner } from "./BackendWarmupBanner";

export function ChatApp() {
  const chat = useChat();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const warmup = useBackendWarmup();

  if (!chat.username) {
    return (
      <LoginScreen
        showWarmupMessage={warmup.showWarmupMessage}
        warmupFailed={warmup.warmupFailed}
      />
    );
  }

  return (
    <div className="flex h-dvh w-full overflow-hidden bg-background text-foreground">
      <Sidebar
        me={chat.username}
        users={chat.users}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <ChatWindow
        me={chat.username}
        messages={chat.messages}
        loading={chat.loadingHistory}
        connected={chat.connected}
        notificationBanner={
          <>
            {warmup.showWarmupMessage && <BackendWarmupBanner warmupFailed={warmup.warmupFailed} />}
            <NotificationBanner
              supported={chat.notificationSupported}
              permission={chat.notificationPermission}
            />
          </>
        }
        typingUser={chat.typingUser}
        onSend={chat.send}
        onTyping={chat.notifyTyping}
        onTypingStop={chat.stopTyping}
        onEdit={chat.editMessage}
        onDelete={chat.deleteMessage}
        onOpenSidebar={() => setSidebarOpen(true)}
        onlineCount={chat.users.filter((u) => u.online).length}
      />
    </div>
  );
}
