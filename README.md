# Token Usage in Prepare Step

This example demonstrates how to access token usage within the `prepareStep` function of the AI SDK's `ToolLoopAgent`. This pattern is useful for multi-turn and agentic applications where you need visibility into token consumption across conversation turns.

## Use case

Track input token usage throughout an agent's execution to implement context-compaction strategies. By monitoring token usage in `prepareStep`, you can trigger compaction when approaching context limits.

## How it works

1. The `ToolLoopAgent` tracks token usage from each step via the `usage` property
2. `prepareStep` receives the previous step's usage, enabling decisions based on cumulative token consumption
3. Token usage is passed to the client via message metadata for UI display

## Setup

1. Create a `.env` file with your AI Gateway API key:

```
AI_GATEWAY_API_KEY=your_api_key_here
```

2. Install dependencies:

```bash
bun install
```

3. Start the development server:

```bash
bun run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to interact with the agent.
