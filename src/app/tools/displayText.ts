import { tool } from "@openai/agents/realtime";
import { z } from "zod";

const createDisplayTextTool = (
  setDisplayText: (text: string) => void
) => {
  return tool({
    name: "display_text",
    description: "Display a text message to the user.",
    parameters: z.object({ text: z.string() }),
    async execute({ text }) {
      setDisplayText(text);
      return `Displayed text: ${text}`;
    },
  });
};

export default createDisplayTextTool;
