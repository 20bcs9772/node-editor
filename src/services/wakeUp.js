import { api_url } from "./api";
import axios from "axios";

export const wakeUp = async () => {
  if (api_url) {
    await axios.get(`${api_url}`);
  }
};
