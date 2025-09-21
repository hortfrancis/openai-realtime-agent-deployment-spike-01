import { useMemo, useState } from 'react';
import { useRealtimeAgent } from './hooks/';
import { getWeather, createDisplayTextTool } from './tools';
import './App.css';

function App() {
  const [displayText, setDisplayText] = useState<string>('');
  const [customMagicWord, setCustomMagicWord] = useState<string>('');

  const tools = useMemo(() => {
    return [getWeather, createDisplayTextTool(setDisplayText)];
  }, [setDisplayText]);

  // useRealtimeAgent(tools);
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
      </main>
    </>
  );
}

export default App;
