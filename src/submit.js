import "./submit.css";
import { useStore } from "./store";
import { shallow } from "zustand/shallow";
import { parsePipeline } from "./services/parsePipeline";
import { useState } from "react";
import { PipelineAlert } from "./components/PipelineAlert";

const selector = (state) => ({
  nodes: state.nodes,
  edges: state.edges,
});

export const SubmitButton = () => {
  const { nodes, edges } = useStore(selector, shallow);
  const [alertOpen, setAlertOpen] = useState(false);
  const [alertData, setAlertData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsSubmitting(true);
      const response = await parsePipeline(nodes, edges);
      setAlertData(response);
      setAlertOpen(true);
    } catch (err) {
      console.error("Error: ", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <div className="submit-container">
        <button
          type="submit"
          className="submit-button"
          disabled={isSubmitting}
          onClick={handleSubmit}
        >
          <span className="submit-text">Execute Pipeline</span>
        </button>
      </div>

      <PipelineAlert
        open={alertOpen}
        onClose={() => setAlertOpen(false)}
        data={alertData}
      />
    </>
  );
};
