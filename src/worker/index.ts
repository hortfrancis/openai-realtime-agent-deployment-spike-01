import { Hono } from "hono";
import { OpenAIEphemeralApiKeyResponseData } from '../types';

const app = new Hono<{ Bindings: Env }>();


app.get("/api/heartbeat", (context) => {
  return context.json({ message: 'API available' });
});

/**
 * GET /api/ephemeral-key
 *
 * Mint a short-lived "ephemeral" API key for OpenAI’s Realtime API.
 *
 * @remarks
 * - This endpoint must run server-side because it uses your long-lived
 *   `OPENAI_API_KEY` secret (bound in the Worker/Pages Function environment).
 * - The ephemeral key returned is valid for only a short time: 10 minutes by default.
 *
 * @param context - Hono context object. Exposes:
 *   - `context.env.OPENAI_API_KEY`: The server-side secret (required).
 *   - Request/response helpers like `context.json()`.
 *
 * @returns JSON response with either:
 * ```json
 * { "ephemeralKey": "<short-lived token>" }
 * ```
 * or an error payload like:
 * ```json
 * { "error": "Failed to fetch ephemeral key from OpenAI." }
 * ```
 *
 * @see https://platform.openai.com/docs/api-reference/realtime-sessions/create-realtime-client-secret
 */
app.get("/api/ephemeral-key", async (context) => {
  // The 'context' parameter provides request and response helpers from Hono, such as context.json().
  // http://hono.dev/docs/api/context
  const OPENAI_API_KEY = context.env.OPENAI_API_KEY;
  if (!OPENAI_API_KEY) {
    return context.json({ error: "OPENAI_API_KEY is not set in environment." }, 500);
  }

  const endpoint = "https://api.openai.com/v1/realtime/client_secrets";
  const headers = {
    "Authorization": `Bearer ${OPENAI_API_KEY}`,
    "Content-Type": "application/json"
  };
  const body = JSON.stringify({
    session: {
      type: "realtime",
      model: "gpt-realtime"
    }
  });

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers,
      body
    });

    if (!response.ok) {
      const errorMsg = "Failed to fetch ephemeral key from OpenAI.";
      return context.json({ error: errorMsg }, 502);
    }

    const data: OpenAIEphemeralApiKeyResponseData = await response.json();
    if (!data.value) {
      return context.json({ error: "No ephemeral key returned from OpenAI." }, 502);
    }

    return context.json({ data }); // Success case 

  } catch (err: unknown) {
    const errorMessage = err instanceof Error ? err.message : "Unknown error occurred.";
    return context.json({ error: errorMessage }, 502);
  }
});


export default app;
