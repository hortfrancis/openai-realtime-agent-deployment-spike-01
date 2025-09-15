import { useEffect, useRef } from 'react';
import { RealtimeAgent, RealtimeSession } from '@openai/agents/realtime';
import { logSessionHistory } from '../utils';
import type { WorkerAPIResponseData } from '../../types';

const ASSISTANT_NAME = 'Assistant';
const ASSISTANT_INSTRUCTIONS = `We are testing the OpenAI Realtime Agent SDK! Your assistance is appreciated 🙂.`;
const ASSISTANT_VOICE = 'alloy';

// To avoid TypeScript errors from using `FunctionTool`
type RealtimeAgentTools = ConstructorParameters<typeof RealtimeAgent>[0]["tools"];

function useRealtimeAgent(tools: RealtimeAgentTools) {
  const sessionRef = useRef<RealtimeSession | null>(null);

  useEffect(() => {
    const agent = new RealtimeAgent({
      name: ASSISTANT_NAME,
      instructions: ASSISTANT_INSTRUCTIONS,
      tools: tools,
      voice: ASSISTANT_VOICE,
      // More options available, see:
      // https://openai.github.io/openai-agents-js/openai/agents/realtime/classes/realtimeagent
    });

    const session = new RealtimeSession(agent);
    sessionRef.current = session;

    const connectSession = async () => {
      try {
        const response = await fetch('/api/ephemeral-key');
        const result: WorkerAPIResponseData = await response.json();
        if (result.error || !result.data) {
          throw new Error(result.error || "No data in response");
        }
        await session.connect({ apiKey: result.data.value });
      } catch (error) {
        console.error("Failed to connect session:", error);
      }
    };

    connectSession();

    session.on('history_updated', (history) => {
      // Log the session history to the console whenever it updates. 
      // Expect to see incomplete history items & repetitions as the session progresses. 
      logSessionHistory(history);
    });

    return () => {
      session.close();
    };
  }, [tools]);

  return sessionRef;
}

export default useRealtimeAgent;
