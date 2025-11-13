import { createNode } from "./baseNode";
import { ClockFading } from "lucide-react";
export const DelayNode = createNode({
  label: "Delay",
  icon: <ClockFading />,
  color: "#06b6d4",
  width: 200,
  description: "Add time delay",
  fields: [
    {
      name: "duration",
      label: "Duration (ms)",
      type: "number",
      defaultValue: 1000,
      min: 0,
      step: 100,
    },
  ],
  inputs: [{ id: "input" }],
  outputs: [{ id: "output" }],
});
