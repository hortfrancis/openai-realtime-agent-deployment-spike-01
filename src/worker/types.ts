/**
 * See: https://platform.openai.com/docs/api-reference/realtime-sessions/create-realtime-client-secret
 * 
 * POST https://api.openai.com/v1/realtime/client_secrets
 *
 * Represents the response from the OpenAI Realtime Ephemeral API key endpoint.
 */
export interface OpenAIEphemeralApiKeyResponseData {
  /** The ephemeral client secret value. */
  value: string;
  /** Expiry time as a Unix timestamp (seconds since epoch). */
  expires_at: number;
  /** Session details for the realtime API. */
  session: {
    type: string;
    object: string;
    id: string;
    model: string;
    output_modalities: string[];
    instructions: string;
    tools: unknown[];
    tool_choice: string;
    max_output_tokens: string;
    tracing: null | unknown;
    truncation: string;
    prompt: null | string;
    expires_at: number;
    audio: {
      input: {
        format: {
          type: string;
          rate: number;
        };
        transcription: null | unknown;
        noise_reduction: null | unknown;
        turn_detection: {
          type: string;
        };
      };
      output: {
        format: {
          type: string;
          rate: number;
        };
        voice: string;
        speed: number;
      };
    };
    include: null | unknown;
  };
}
