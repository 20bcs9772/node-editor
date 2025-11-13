import { createNode } from "./baseNode";
import { Shuffle } from "lucide-react";
export const ConditionalNode = createNode({
  label: "Conditional",
  icon: <Shuffle />,
  color: "#ec4899",
  width: 220,
  height: 140,
  description: "Route based on condition",
  fields: [
    {
      name: "condition",
      label: "Condition",
      type: "select",
      defaultValue: "equals",
      options: ["equals", "contains", "greater_than", "less_than"],
    },
    {
      name: "value",
      label: "Compare Value",
      type: "text",
      defaultValue: "",
      placeholder: "Value to compare",
    },
  ],
  inputs: [{ id: "input" }],
  outputs: [
    { id: "true", position: "33%" },
    { id: "false", position: "67%" },
  ],
});
