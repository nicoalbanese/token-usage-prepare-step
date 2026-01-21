"use client";

import { useChat } from "@ai-sdk/react";
import { useState } from "react";
import type { AgentUIMessage } from "@/ai/agent";

export default function Chat() {
  const [input, setInput] = useState("");
  const { messages, error, sendMessage } = useChat<AgentUIMessage>();
  if (error) return <div>{error.message}</div>;

  return (
    <div className="flex flex-col w-full max-w-md py-24 mx-auto stretch">
      <div className="space-y-4">
        {messages.map((m) => (
          <div key={m.id} className="whitespace-pre-wrap">
            <div className="font-bold">{m.role}</div>
            {m.parts.map((p, i) => {
              switch (p.type) {
                case "text":
                  return <p key={i}>{p.text}</p>;
                case "tool-greet":
                  return (
                    <p key={i} className="italic">
                      [Tool: Greet{" "}
                      {p.state === "input-available" ||
                      p.state === "output-available"
                        ? p.input.name
                        : "executing..."}
                      ]
                    </p>
                  );
                default:
                  return null;
              }
            })}
            {m.metadata?.usage && (
              <div className="text-xs text-gray-500">
                Input token usage: {m.metadata.usage.inputTokens}
              </div>
            )}
          </div>
        ))}
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          sendMessage({ text: input });
          setInput("");
        }}
      >
        <input
          className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
          value={input}
          placeholder="Say something..."
          onChange={(e) => setInput(e.currentTarget.value)}
        />
      </form>
    </div>
  );
}
