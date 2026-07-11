// Simple client-only session store for the dummy auth username.
// Kept SSR-safe while persisting the active name in localStorage.

const STORAGE_KEY = "pulse-chat-username";

let currentUsername: string | null = null;
let hydratedFromStorage = false;
const listeners = new Set<() => void>();

function isBrowser() {
  return typeof window !== "undefined";
}

function readStoredUsername() {
  if (!isBrowser()) return null;

  try {
    return window.localStorage.getItem(STORAGE_KEY);
  } catch {
    return null;
  }
}

function writeStoredUsername(name: string | null) {
  if (!isBrowser()) return;

  try {
    if (name) {
      window.localStorage.setItem(STORAGE_KEY, name);
    } else {
      window.localStorage.removeItem(STORAGE_KEY);
    }
  } catch {
    // Ignore storage failures and keep the in-memory session working.
  }
}

function ensureUsernameLoaded() {
  if (hydratedFromStorage) return;

  hydratedFromStorage = true;
  currentUsername = readStoredUsername();
}

export function getUsername(): string | null {
  ensureUsernameLoaded();
  return currentUsername;
}

export function setUsername(name: string | null) {
  ensureUsernameLoaded();
  currentUsername = name;
  writeStoredUsername(name);
  listeners.forEach((l) => l());
}

export function subscribeUsername(cb: () => void): () => void {
  listeners.add(cb);
  return () => listeners.delete(cb);
}
