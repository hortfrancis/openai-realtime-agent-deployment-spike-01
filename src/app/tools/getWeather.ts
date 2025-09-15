import { tool } from "@openai/agents/realtime";
import { z } from "zod";

// Mock implementation of a weather tool
const getWeather = tool({
  name: "get_weather",
  description: "Return the weather for a city.",
  parameters: z.object({ city: z.string() }),
  async execute({ city }) {
    return `The weather in ${city} is sunny.`;
  },
});

export default getWeather;
