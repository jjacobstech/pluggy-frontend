import { BASE_URL } from "@/config";
import axios from "axios";

export const request = axios.create({
  baseURL: `${BASE_URL}`,
  headers: {
    "Content-Type": "application/json",
  },
});

export const post = request.post;
export const get = request.get;
export const patch = request.patch;
