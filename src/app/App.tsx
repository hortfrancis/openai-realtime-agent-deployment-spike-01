import { useMemo, useState } from 'react';
import { useRealtimeAgent } from './hooks/';
import {
  getWeather,
  createDisplayTextTool,
  pickRandomNumber
} from './tools';
import './App.css';
import type { RealtimeItem } from '@openai/agents/realtime';

function App() {
  const [displayText, setDisplayText] = useState<string>('');
  const [customMagicWord, setCustomMagicWord] = useState<string>('');

  const tools = useMemo(() => {
    return [
      getWeather,
      createDisplayTextTool(setDisplayText),
      pickRandomNumber
    ];
  }, [setDisplayText]);

  const agent = useRealtimeAgent(tools);

  const handleClick = (magicWord: string) => {
    if (!magicWord) {
      console.warn('Please provide a magic word.');
      return;
    }
    if (agent.current) {
      // The agent will not be able to distinguish this from a normal message from the user. 
      // In the convo history, the agent will perceive this as if the user just sent this message.
      agent.current.sendMessage(`The magic word is ${magicWord}`);
      console.log(`Sent message to agent: The magic word is ${magicWord}`);
    } else {
      console.warn('Agent is not initialized yet.');
    }
  };

  const updateHistory = () => {
    if (agent.current) {
      const newHistoryItem: RealtimeItem = {
        // For example: `itemId: "item_CIMVzUvJVI5jXYuApsoI6w"`
        itemId: 'item_' + Math.random().toString(36).substring(2, 15),
        role: 'system',
        type: 'message',
        content: [
          {
            type: "input_text",
            text: "My favourite color is blue."
          }
        ],
      };
      console.log('New history item:', newHistoryItem);
      // Preserve existing history and add the new item
      agent.current.updateHistory([...agent.current.history, newHistoryItem]);
    } else {
      console.warn('Agent is not initialized yet.');
    }
  };

  function logHistory() {
    if (agent.current) {
      const history = agent.current.history;
      console.log("Current conversation history:", history);
    } else {
      console.warn('Agent is not initialized yet.');
    }
  }


  return (
    <>
      <main>
        <h1>OpenAI Realtime Agent Deployment Spike 01</h1>
        <div>Output:</div>
        <div>{displayText}</div>
        <div style={{ marginTop: 40 }}>
          <button onClick={() => handleClick("Goose")}>Say "The magic word is Goose" to the agent</button>
        </div>
        <div style={{ marginTop: 40 }}>
          <label htmlFor="magic-word">Magic Word:</label>
          <input type="text" id="magic-word" value={customMagicWord} onChange={(e) => setCustomMagicWord(e.target.value)} />
          <button onClick={() => handleClick(customMagicWord)}>Send your custom magic word!</button>
        </div>
        <div style={{ marginTop: 40 }}>
          <button onClick={updateHistory}>Update 'history' with new item</button>
        </div>
        <div style={{ marginTop: 40 }}>
          <button onClick={logHistory}>Log conversation history</button>
        </div>
      </main>
    </>
  );
}

export default App;
