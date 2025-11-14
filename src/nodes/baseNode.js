import { useState, useEffect } from "react";
import { Handle, Position } from "reactflow";
import "./baseNode.css";

const BaseNode = ({ id, data, config }) => {
  const [fieldValues, setFieldValues] = useState(() => {
    const initial = {};
    config.fields?.forEach((field) => {
      initial[field.name] = data?.[field.name] || field.defaultValue || "";
    });
    return initial;
  });

  const [dynamicVariables, setDynamicVariables] = useState([]);

  const [dimensions, setDimensions] = useState({
    width: config.width || 220,
    height: config.height || "auto",
  });

  useEffect(() => {
    if (!config.enableVariables) return;

    const variablePattern = /\{\{(\s*\w+\s*)\}\}/g;
    const allVariables = [];

    config.fields?.forEach((field) => {
      if (field.enableVariables && fieldValues[field.name]) {
        const text = fieldValues[field.name];
        const matches = [...text.matchAll(variablePattern)];
        const extractedVars = matches.map((match) => match[1].trim());
        allVariables.push(...extractedVars);
      }
    });

    const uniqueVars = [...new Set(allVariables)];
    setDynamicVariables(uniqueVars);
  }, [fieldValues, config.enableVariables, config.fields]);

  useEffect(() => {
    if (!config.enableDynamicSize) return;

    const field = config.fields?.find((f) => f.enableDynamicSize);
    if (!field || !fieldValues[field.name]) return;

    const text = fieldValues[field.name];
    const baseWidth = config.width || 220;
    const baseHeight = config.height || 140;
    const charCount = text.length;
    const lineCount = text.split("\n").length;

    const newWidth = Math.min(Math.max(baseWidth, charCount * 1.5 + 100), 400);
    const newHeight = Math.max(baseHeight, lineCount * 30 + 100);

    setDimensions({ width: newWidth, height: newHeight });
  }, [
    fieldValues,
    config.enableDynamicSize,
    config.width,
    config.height,
    config.fields,
  ]);

  const handleFieldChange = (fieldName, value) => {
    setFieldValues((prev) => ({ ...prev, [fieldName]: value }));
    if (data?.onChange) {
      data.onChange(fieldName, value);
    }
  };

  return (
    <div
      className="base-node"
      style={{
        borderLeftColor: config.color || "var(--accent-primary)",
        "--node-color": config.color || "var(--accent-primary)",
        width: config.enableDynamicSize ? `${dimensions.width}px` : undefined,
        minHeight: config.enableDynamicSize
          ? `${dimensions.height}px`
          : undefined,
      }}
    >
      {config.inputs?.map((input, idx) => (
        <Handle
          key={`input-${idx}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          className="node-handle"
          style={input.position ? { top: input.position } : undefined}
        />
      ))}

      {config.enableVariables &&
        dynamicVariables.map((variable, idx) => {
          const totalVars = dynamicVariables.length;
          const headerHeight = 5;
          const footerPadding = 5;
          const availableHeight =
            (typeof dimensions.height === "number" ? dimensions.height : 140) -
            headerHeight -
            footerPadding;

          const spacing =
            totalVars > 1
              ? availableHeight / (totalVars + 1)
              : availableHeight / 2;
          const topPosition = headerHeight + spacing * (idx + 1);

          return (
            <Handle
              key={`var-${variable}`}
              type="target"
              position={Position.Left}
              id={`${id}-${variable}`}
              className="node-handle"
              style={{
                top: `${topPosition}px`,
              }}
              title={`Input for {{${variable}}}`}
            >
              <span
                style={{
                  position: "absolute",
                  left: "-60px",
                  top: "-8px",
                  fontSize: "0.65rem",
                  color: "var(--text-secondary)",
                  backgroundColor: "var(--bg-primary)",
                  padding: "2px 6px",
                  borderRadius: "4px",
                  whiteSpace: "nowrap",
                  border: "1px solid var(--border-color)",
                }}
              >
                {variable}
              </span>
            </Handle>
          );
        })}

      <div className="node-header">
        {config.icon && <span className="node-icon">{config.icon}</span>}
        <div className="node-title">{config.label}</div>
      </div>

      {config.description && (
        <div className="node-description">{config.description}</div>
      )}

      {config.fields && config.fields.length > 0 && (
        <div className="node-fields">
          {config.fields?.map((field, idx) => (
            <div key={idx} className="field-group">
              <label className="field-label">
                {field.label}
                {field.enableVariables && " (use {{variable}})"}:
              </label>
              {field.type === "text" && (
                <input
                  type="text"
                  value={fieldValues[field.name]}
                  onChange={(e) =>
                    handleFieldChange(field.name, e.target.value)
                  }
                  placeholder={field.placeholder}
                  className="field-input"
                />
              )}
              {field.type === "textarea" && (
                <textarea
                  value={fieldValues[field.name]}
                  onChange={(e) => {
                    handleFieldChange(field.name, e.target.value);
                    if (field.enableDynamicSize) {
                      e.target.style.height = "auto";
                      e.target.style.height = `${e.target.scrollHeight}px`;
                    }
                  }}
                  placeholder={field.placeholder}
                  rows={field.enableDynamicSize ? 1 : field.rows || 2}
                  className="field-textarea"
                  style={
                    field.enableDynamicSize
                      ? {
                          minHeight: "60px",
                          resize: "vertical",
                          overflow: "hidden",
                        }
                      : undefined
                  }
                  ref={(el) => {
                    if (el && field.enableDynamicSize) {
                      el.style.height = "auto";
                      el.style.height = `${el.scrollHeight}px`;
                    }
                  }}
                />
              )}
              {field.type === "select" && (
                <select
                  value={fieldValues[field.name]}
                  onChange={(e) =>
                    handleFieldChange(field.name, e.target.value)
                  }
                  className="field-select"
                >
                  {field.options.map((opt, i) => (
                    <option key={i} value={opt.value || opt}>
                      {opt.label || opt}
                    </option>
                  ))}
                </select>
              )}
              {field.type === "number" && (
                <input
                  type="number"
                  value={fieldValues[field.name]}
                  onChange={(e) =>
                    handleFieldChange(field.name, e.target.value)
                  }
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  className="field-input"
                />
              )}
              {field.enableVariables && dynamicVariables.length > 0 && (
                <div
                  style={{
                    fontSize: "0.65rem",
                    color: "var(--text-tertiary)",
                    marginTop: "4px",
                    fontStyle: "italic",
                  }}
                >
                  Variables: {dynamicVariables.join(", ")}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {config.outputs?.map((output, idx) => (
        <Handle
          key={`output-${idx}`}
          type="source"
          position={Position.Right}
          id={`${id}-${output.id}`}
          className="node-handle"
          style={output.position ? { top: output.position } : undefined}
        />
      ))}
    </div>
  );
};

export const createNode = (config) => {
  return ({ id, data }) => <BaseNode id={id} data={data} config={config} />;
};
