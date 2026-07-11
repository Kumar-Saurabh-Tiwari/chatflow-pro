import { LoaderCircle } from "lucide-react";

type BackendWarmupBannerProps = {
  warmupFailed?: boolean;
};

export function BackendWarmupBanner({ warmupFailed = false }: BackendWarmupBannerProps) {
  return (
    <div className="flex items-center gap-2 border-b border-border bg-muted/60 px-4 py-2 text-xs text-muted-foreground backdrop-blur-sm">
      <LoaderCircle className="h-3.5 w-3.5 animate-spin text-primary" />
      <span>
        {warmupFailed
          ? "The backend is taking longer than usual. The app will keep trying in the background."
          : "Waking up the backend so your chat opens faster after inactivity."}
      </span>
    </div>
  );
}
