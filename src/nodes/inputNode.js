import { createNode } from "./baseNode";
import { LogIn } from "lucide-react";
export const InputNode = createNode({
  label: "Input",
  icon: <LogIn />,
  color: "#10b981",
  width: 250,
  fields: [
    {
      name: "inputName",
      label: "Name",
      type: "text",
      defaultValue: "input_1",
      placeholder: "Enter input name",
    },
    {
      name: "inputType",
      label: "Type",
      type: "select",
      defaultValue: "Text",
      options: ["Text", "File"],
    },
  ],
  outputs: [{ id: "value" }],
});
