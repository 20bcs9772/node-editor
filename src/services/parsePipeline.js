import { api_url } from "./api";
import axios from "axios";

export const parsePipeline = async (nodes, edges) => {
  const formData = new FormData();
  formData.append("pipeline", JSON.stringify({ nodes, edges }));
  const response = await axios.post(`${api_url}/pipelines/parse`, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });

  return response.data;
};
