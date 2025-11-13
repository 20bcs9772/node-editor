import { createNode } from "./baseNode";
import { ListCheck } from "lucide-react";
export const ValidatorNode = createNode({
  label: "Validator",
  icon: <ListCheck />,
  color: "#84cc16",
  width: 280,
  description: "Validate input data",
  fields: [
    {
      name: "validationType",
      label: "Validation Type",
      type: "select",
      defaultValue: "email",
      options: ["email", "url", "number", "regex", "length"],
    },
    {
      name: "pattern",
      label: "Pattern/Rule",
      type: "text",
      defaultValue: "",
      placeholder: "Validation pattern",
    },
    {
      name: "errorMessage",
      label: "Error Message",
      type: "textarea",
      defaultValue: "Validation failed",
      rows: 2,
    },
  ],
  inputs: [{ id: "input" }],
  outputs: [
    { id: "valid", position: "33%" },
    { id: "invalid", position: "67%" },
  ],
});
