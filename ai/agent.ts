import {
  type InferAgentUIMessage,
  type LanguageModelUsage,
  ToolLoopAgent,
} from "ai";
import { z } from "zod";

type TContext = {
  lastInputTokens: number;
};

export const agent = new ToolLoopAgent({
  model: "anthropic/claude-haiku-4.5",
  callOptionsSchema: z.object({
    lastInputTokens: z.number(),
  }),
  prepareStep: ({ steps, experimental_context }) => {
    const lastStep = steps.at(-1);
    const lastStepUsage =
      lastStep?.usage?.inputTokens ??
      (experimental_context as TContext)?.lastInputTokens ??
      0;
    console.log("Preparing step. Last step input tokens:", lastStepUsage);
    return { experimental_context: { lastStepUsage } };
  },
  prepareCall: ({ options, ...settings }) => {
    return {
      ...settings,
      experimental_context: { lastInputTokens: options.lastInputTokens },
    };
  },
});

type AgentMetadata = {
  usage: LanguageModelUsage;
};

export type AgentUIMessage = InferAgentUIMessage<typeof agent, AgentMetadata>;
