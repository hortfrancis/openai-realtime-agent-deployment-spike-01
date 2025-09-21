import { tool } from "@openai/agents/realtime";
import { z } from "zod";

const pickRandomNumber = tool({
  name: "pick_random_number",
  description: "Pick a random number between 1 and 10 (inclusive).",
  parameters: z.object({
    number: z.number().min(1).max(10),
  }),
  async execute({ number }) {

    console.log(`Picked random number: ${number}`);

    // Test: can we pass info back to the agent via the return value?
    // Answer: Yes, we fkn can :)
    if (number > 0 && number <= 3) {
      return "Today's shape is CIRCLE.";
    } else if (number > 3 && number <= 7) {
      return "Today's shape is TRIANGLE.";
    } else if (number > 7 && number <= 10) {
      return "Today's shape is SQUARE.";
    }
  },
});

export default pickRandomNumber;
