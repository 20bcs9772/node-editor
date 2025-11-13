"use client"

import { useState } from "react"
import { Handle, Position } from "reactflow"
import "./baseNode.css"

const BaseNode = ({ id, data, config }) => {
  const [fieldValues, setFieldValues] = useState(() => {
    const initial = {}
    config.fields?.forEach((field) => {
      initial[field.name] = data?.[field.name] || field.defaultValue || ""
    })
    return initial
  })

  const handleFieldChange = (fieldName, value) => {
    setFieldValues((prev) => ({ ...prev, [fieldName]: value }))
    if (data?.onChange) {
      data.onChange(fieldName, value)
    }
  }

  return (
    <div
      className="base-node"
      style={{
        borderLeftColor: config.color || "var(--accent-primary)",
        "--node-color": config.color || "var(--accent-primary)",
      }}
    >
      {config.inputs?.map((input, idx) => (
        <Handle
          key={`input-${idx}`}
          type="target"
          position={Position.Left}
          id={`${id}-${input.id}`}
          className="node-handle"
        />
      ))}

      <div className="node-header">
        {config.icon && <span className="node-icon">{config.icon}</span>}
        <div className="node-title">{config.label}</div>
      </div>

      {config.description && <div className="node-description">{config.description}</div>}

      {config.fields && config.fields.length > 0 && (
        <div className="node-fields">
          {config.fields?.map((field, idx) => (
            <div key={idx} className="field-group">
              <label className="field-label">{field.label}:</label>
              {field.type === "text" && (
                <input
                  type="text"
                  value={fieldValues[field.name]}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  className="field-input"
                />
              )}
              {field.type === "textarea" && (
                <textarea
                  value={fieldValues[field.name]}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  placeholder={field.placeholder}
                  rows={field.rows || 2}
                  className="field-textarea"
                />
              )}
              {field.type === "select" && (
                <select
                  value={fieldValues[field.name]}
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
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
                  onChange={(e) => handleFieldChange(field.name, e.target.value)}
                  min={field.min}
                  max={field.max}
                  step={field.step}
                  className="field-input"
                />
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
        />
      ))}
    </div>
  )
}

export const createNode = (config) => {
  return ({ id, data }) => <BaseNode id={id} data={data} config={config} />
}
