import { useMemo, useState } from 'react';
import { useRealtimeAgent } from './hooks/';
import { getWeather, createDisplayTextTool } from './tools';
import './App.css';

function App() {

  // function fetchEphemeralKey() {
  //   fetch("/api/ephemeral-key")
  //     .then((res) => res.json() as Promise<APIEphemeralKeyResponse>)
  //     // .then((result) => console.log(result.data.value));
  //     .then((result) => console.log("ephemeral key:", result.data.value));
  // }

  // useEffect(() => {
  //   fetchEphemeralKey();
  // }, []);




  const [displayText, setDisplayText] = useState<string>('');

  const tools = useMemo(() => {
    return [getWeather, createDisplayTextTool(setDisplayText)];
  }, [setDisplayText]);

  useRealtimeAgent(tools);


  return (
    <>
      <main>
        <h1>OpenAI Realtime Agent Deployment Spike 01</h1>
        <div>Output:</div>
        <div>{displayText}</div>
      </main>
    </>
  );
}

export default App;
