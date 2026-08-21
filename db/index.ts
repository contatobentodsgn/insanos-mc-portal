import * as schema from "./schema";

export function getDb() {
  const workersEnv = (globalThis as unknown as { process?: { env?: Record<string, unknown> } });
  if (!workersEnv) {
    throw new Error("Database binding unavailable.");
  }
  return null as unknown;
}
