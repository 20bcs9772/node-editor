import { createNode } from "./baseNode";
import { Bot } from "lucide-react";
export const LLMNode = createNode({
  label: 'LLM',
  icon: <Bot />,
  color: '#8b5cf6',
  width: 200,
  description: 'This is a LLM.',
  inputs: [
    { id: 'system', position: '33%' },
    { id: 'prompt', position: '67%' }
  ],
  outputs: [{ id: 'response' }]
});
