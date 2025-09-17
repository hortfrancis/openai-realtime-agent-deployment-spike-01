# openai-realtime-agent-deployment-spike-01

This spike project explores deploying an **AI voice agent** using _OpenAI's Agents SDK_ & _Realtime API_ to _Cloudflare Workers_, with a _React_ frontend.

The deployed frontend in the browser calls the backend Cloudflare Worker to get an ephemeral client secret for connecting to OpenAI's Realtime API.

## Installation

**Clone the repository:**

```bash
git clone https://github.com/hortfrancis/openai-realtime-agent-deployment-spike-01.git
```

.. or, using the [GitHub CLI](https://cli.github.com/):

```bash
gh repo clone hortfrancis/openai-realtime-agent-deployment-spike-01
```

**Navigate to the project directory:**

```bash
cd openai-realtime-agent-deployment-spike-01
```

**Install dependencies:**

```bash
npm install
```

## Configuration

Get your OpenAI API key from [OpenAI's platform](https://platform.openai.com/account/api-keys).

Create a `.dev.vars` file in the root directory and add your OpenAI API key:

```env
OPENAI_API_KEY=your_openai_api_key
```

## Running the project locally

Start the development server:

```bash
npm run dev
```

Open your browser and navigate to `http://localhost:5173` (or the URL provided in the terminal) to see the React frontend.

This project has two 'tools' (functions) the Realtime agent can call: 

- `get_weather`: Returns a generic string response: "The weather in &lt;city&gt; is sunny."
- `display_text`: Renders text to the screen, so it is visible to the user.

You will have to say 'Hello' to trigger the voice agent's first response. You might start by asking it "What can you do in this environment?" -- it should respond by describing the tools above. Try asking it to get the weather for a city of your choice and displaying that info on the screen 🙂

## Additional resources

- [OpenAI Voice Agents documentation](https://platform.openai.com/docs/guides/voice-agents?voice-agent-architecture=speech-to-speech)
- [OpenAI Realtime API documentation](https://platform.openai.com/docs/guides/realtime)
- [Cloudflare Workers documentation](https://developers.cloudflare.com/workers/)
- [Vite documentation](https://vitejs.dev/guide/)
- [React documentation](https://reactjs.org/)
- [Hono documentation](https://hono.dev/)
