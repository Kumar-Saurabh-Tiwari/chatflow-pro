import { createFileRoute } from "@tanstack/react-router";
import { ClientOnly } from "@tanstack/react-router";
import { ChatApp } from "@/components/chat/ChatApp";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  return <ClientOnly fallback={<div className="min-h-dvh bg-background" />}>{() => <ChatApp />}</ClientOnly>;
}
