export type NotificationPermissionState = NotificationPermission | "unsupported";

const NOTIFICATION_ICON =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" fill="none">
      <rect width="64" height="64" rx="18" fill="#111827"/>
      <path
        d="M18 22.5C18 19.4624 20.4624 17 23.5 17H40.5C43.5376 17 46 19.4624 46 22.5V37.5C46 40.5376 43.5376 43 40.5 43H31L23 50V43H23.5C20.4624 43 18 40.5376 18 37.5V22.5Z"
        fill="#22c55e"
      />
      <path d="M25 27H39" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
      <path d="M25 33H34" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
    </svg>
  `);

function getNotificationApi() {
  if (typeof window === "undefined" || !("Notification" in window)) {
    return null;
  }

  return window.Notification;
}

export function getNotificationSupport() {
  return getNotificationApi() !== null;
}

export function getNotificationPermissionState(): NotificationPermissionState {
  const api = getNotificationApi();
  return api ? api.permission : "unsupported";
}

export async function requestNotificationPermission(): Promise<NotificationPermissionState> {
  const api = getNotificationApi();
  if (!api) {
    return "unsupported";
  }

  if (api.permission === "granted" || api.permission === "denied") {
    return api.permission;
  }

  return api.requestPermission();
}

export function showChatNotification({
  title,
  body,
  onClick,
}: {
  title: string;
  body: string;
  onClick?: () => void;
}) {
  const api = getNotificationApi();
  if (!api || api.permission !== "granted") {
    return null;
  }

  const notification = new api(title, {
    body,
    icon: NOTIFICATION_ICON,
  });

  notification.addEventListener("click", () => {
    window.focus();
    onClick?.();
    notification.close();
  });

  return notification;
}
