import { Bell, BellOff, BellRing } from "lucide-react";
import type { NotificationPermissionState } from "@/lib/browser-notifications";

export function NotificationBanner({
  supported,
  permission,
}: {
  supported: boolean;
  permission: NotificationPermissionState;
}) {
  if (!supported) {
    return (
      <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-1.5 text-xs font-medium text-muted-foreground">
        <BellOff className="h-3.5 w-3.5" />
        <span>Browser notifications are not supported in this browser.</span>
      </div>
    );
  }

  if (permission === "granted") {
    return (
      <div className="flex items-center gap-2 border-b border-success/30 bg-success/10 px-4 py-1.5 text-xs font-medium text-success">
        <BellRing className="h-3.5 w-3.5" />
        <span>Notifications enabled for new messages.</span>
      </div>
    );
  }

  if (permission === "denied") {
    return (
      <div className="flex items-center gap-2 border-b border-amber-500/30 bg-amber-500/10 px-4 py-1.5 text-xs font-medium text-amber-600">
        <BellOff className="h-3.5 w-3.5" />
        <span>Notifications are blocked in browser settings.</span>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2 border-b border-border bg-muted/40 px-4 py-1.5 text-xs font-medium text-muted-foreground">
      <Bell className="h-3.5 w-3.5" />
      <span>Allow notifications to catch new messages when you switch tabs.</span>
    </div>
  );
}
