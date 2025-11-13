import { createNode } from "./baseNode";
import { TypeOutline } from "lucide-react";
export const TextNode = createNode({
  label: "Text",
  icon: <TypeOutline />,
  color: "#3b82f6",
  width: 200,
  fields: [
    {
      name: "text",
      label: "Text",
      type: "text",
      defaultValue: "{{input}}",
      placeholder: "Enter text...",
    },
  ],
  outputs: [{ id: "output" }],
});
