import { createNode } from "./baseNode";
import { LogOut } from "lucide-react";
export const OutputNode = createNode({
  label: "Output",
  icon: <LogOut />,
  color: "#ef4444",
  width: 200,
  fields: [
    {
      name: "outputName",
      label: "Name",
      type: "text",
      defaultValue: "output_1",
      placeholder: "Enter output name",
    },
    {
      name: "outputType",
      label: "Type",
      type: "select",
      defaultValue: "Text",
      options: ["Text", "Image"],
    },
  ],
  inputs: [{ id: "value" }],
});
