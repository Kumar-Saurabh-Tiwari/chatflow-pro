import { useEffect, useState } from "react";

import { warmBackend } from "@/services/api";

type WarmupState = "idle" | "warming" | "ready" | "error";

export function useBackendWarmup() {
  const [state, setState] = useState<WarmupState>("idle");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    let active = true;

    setState("warming");

    const messageTimer = window.setTimeout(() => {
      if (active) {
        setShowMessage(true);
      }
    }, 1000);

    void warmBackend()
      .then(() => {
        if (!active) return;
        setState("ready");
        setShowMessage(false);
      })
      .catch(() => {
        if (!active) return;
        setState("error");
        setShowMessage(true);
      });

    return () => {
      active = false;
      window.clearTimeout(messageTimer);
    };
  }, []);

  return {
    isWarming: state === "warming",
    showWarmupMessage: showMessage && state !== "ready",
    warmupFailed: state === "error",
  };
}
