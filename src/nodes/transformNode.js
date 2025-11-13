import { createNode } from "./baseNode";
import { Rotate3d } from "lucide-react";
export const TransformNode = createNode({
  label: "Transform",
  icon: <Rotate3d />,
  color: "#f59e0b",
  width: 220,
  description: "Transform data",
  fields: [
    {
      name: "operation",
      label: "Operation",
      type: "select",
      defaultValue: "uppercase",
      options: ["uppercase", "lowercase", "reverse", "trim", "capitalize"],
    },
  ],
  inputs: [{ id: "input" }],
  outputs: [{ id: "output" }],
});
