import "./PipelineAlert.css";
import {ClipboardCheck} from "lucide-react";

export const PipelineAlert = ({ open, onClose, data }) => {
  if (!open || !data) return null;

  const { num_nodes, num_edges, is_dag } = data;

  return (
    <div className="pm-overlay" onClick={onClose}>
      <div className="pm-modal" onClick={(e) => e.stopPropagation()}>
        <div className="pm-header">
          <span className="pm-icon"><ClipboardCheck /></span>
          <h2>Pipeline Analysis</h2>
        </div>

        <div className="pm-content">
          <div className="pm-row">
            <span className="pm-label">Nodes</span>
            <span className="pm-value">{num_nodes}</span>
          </div>

          <div className="pm-row">
            <span className="pm-label">Edges</span>
            <span className="pm-value">{num_edges}</span>
          </div>

          <div className="pm-row">
            <span className="pm-label">DAG Status</span>
            <span className={`pm-badge ${is_dag ? "pm-success" : "pm-error"}`}>
              {is_dag ? "Valid DAG ✔" : "Cycle Detected ✖"}
            </span>
          </div>
        </div>

        <button className="pm-close" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};
