import type { RealtimeItem } from '@openai/agents/realtime';

function logSessionHistory(history: RealtimeItem[]) {
  history.forEach((item) => {
    if (item.type === 'message') {
      if (item.role === 'user') {
        const content = item.content[0];
        if (!content?.type) return;
        const userText =
          content.type === "input_audio" ? content.transcript : "not found";
        if (userText === null) return;
        console.log(
          "%cUser said:%c %c%s",
          "font-weight: bold;",
          "",
          "font-style: italic;",
          userText,
          'item ID: ' + item.itemId
        );
      } else if (item.role === "assistant") {
        const content = item.content[0];
        if (!content?.type) return;
        const assistantText =
          content.type === "output_audio" ? content.transcript : "not found";
        if (assistantText === null) return;
        console.log(
          "%cAssistant said:%c %c%s",
          "font-weight: bold;",
          "",
          "font-style: italic;",
          assistantText,
          'item ID: ' + item.itemId
        );
      }
    } else if (item.type === 'function_call') {
      console.log(
        "%cTool used:%c %c`%s`",
        "font-weight: bold;",
        "",
        "font-family: monospace; font-style: italic;",
        item.name,
      );
      console.log(
        "%cWith arguments:%c %c`%s`",
        "font-weight: bold;",
        "",
        "font-family: monospace; font-style: italic;",
        JSON.stringify(item.arguments),
        'item ID: ' + item.itemId
      );
    }
  });
}

export default logSessionHistory;
