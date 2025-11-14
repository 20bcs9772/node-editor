import { useState } from "react";
import { DraggableNode } from "../draggableNode";
import {
  ChevronDown,
  ChartColumnStacked,
  Settings,
  GitPullRequestCreateArrow,
  Sparkles,
} from "lucide-react";
import { SubmitButton } from "../submit";
import "./Sidebar.css";

export const Sidebar = ({ isOpen }) => {
  const [expandedCategory, setExpandedCategory] = useState("inputs");

  const nodeCategories = {
    inputs: {
      label: "Input & Output",
      icon: <ChartColumnStacked />,
      nodes: [
        { type: "customInput", label: "Input" },
        { type: "customOutput", label: "Output" },
      ],
    },
    processing: {
      label: "Processing",
      icon: <Settings />,
      nodes: [
        { type: "llm", label: "LLM" },
        { type: "text", label: "Text" },
        { type: "transform", label: "Transform" },
      ],
    },
    logic: {
      label: "Logic & Control",
      icon: <GitPullRequestCreateArrow />,
      nodes: [
        { type: "conditional", label: "Conditional" },
        { type: "validator", label: "Validator" },
      ],
    },
    advanced: {
      label: "Advanced",
      icon: <Sparkles />,
      nodes: [
        { type: "aggregator", label: "Aggregator" },
        { type: "delay", label: "Delay" },
      ],
    },
  };

  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <div className="sidebar-content">
        {Object.entries(nodeCategories).map(([key, category]) => (
          <div key={key} className="category">
            <button
              className="category-header"
              onClick={() =>
                setExpandedCategory(expandedCategory === key ? null : key)
              }
            >
              <span className="category-icon">{category.icon}</span>
              <span className="category-title">{category.label}</span>
              <ChevronDown
                size={16}
                className={`chevron ${
                  expandedCategory === key ? "expanded" : ""
                }`}
              />
            </button>

            {expandedCategory === key && (
              <div className="category-nodes">
                {category.nodes.map((node) => (
                  <DraggableNode
                    key={node.type}
                    type={node.type}
                    label={node.label}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <SubmitButton />
    </aside>
  );
};
