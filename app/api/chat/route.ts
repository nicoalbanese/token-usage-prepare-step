import { convertToModelMessages } from "ai";
import { type AgentUIMessage, agent } from "@/ai/agent";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: AgentUIMessage[] } = await req.json();

  const lastInputTokens =
    messages.filter((m) => m.role === "assistant").at(-1)?.metadata?.usage
      .inputTokens ?? 0;

  const result = await agent.stream({
    messages: await convertToModelMessages(messages),
    options: {
      lastInputTokens,
    },
  });

  return result.toUIMessageStreamResponse<AgentUIMessage>({
    messageMetadata: ({ part }) => {
      if (part.type === "finish-step") {
        return { usage: part.usage };
      }
      if (part.type === "finish") {
        return { usage: part.totalUsage };
      }
    },
  });
}
