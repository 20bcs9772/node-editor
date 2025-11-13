import { createNode } from "./baseNode";
import { Merge } from "lucide-react";
export const AggregatorNode = createNode({
  label: "Aggregator",
  icon: <Merge />,
  color: "#14b8a6",
  width: 220,
  height: 150,
  description: "Combine multiple inputs",
  fields: [
    {
      name: "method",
      label: "Method",
      type: "select",
      defaultValue: "concat",
      options: ["concat", "merge", "sum", "average"],
    },
    {
      name: "separator",
      label: "Separator",
      type: "text",
      defaultValue: ", ",
      placeholder: "e.g., , or space",
    },
  ],
  inputs: [
    { id: "input1", position: "25%" },
    { id: "input2", position: "50%" },
    { id: "input3", position: "75%" },
  ],
  outputs: [{ id: "output" }],
});
