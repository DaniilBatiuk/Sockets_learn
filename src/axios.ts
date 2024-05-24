import axios, { type CreateAxiosDefaults } from "axios";

const options: CreateAxiosDefaults = {
  baseURL: process.env.NEXT_URL,
  headers: {
    "Content-Type": "application/json",
  },
};

export const myAxios = axios.create(options);
