import { createNode } from "./baseNode";
import { TypeOutline } from "lucide-react";

export const TextNode = createNode({
  label: "Text",
  icon: <TypeOutline />,
  color: "#3b82f6",
  width: 220,
  height: 150,
  description: "Text with variable inputs",
  enableVariables: true,
  enableDynamicSize: true,
  fields: [
    {
      name: "text",
      label: "Text",
      type: "textarea",
      defaultValue: "{{input}}",
      placeholder: "Enter text with {{variables}}...",
      rows: 3,
      enableVariables: true,
      enableDynamicSize: true,
    },
  ],

  outputs: [{ id: "output" }],
});
