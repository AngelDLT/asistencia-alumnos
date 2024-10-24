import React, { createContext, useContext } from "react";
import axios from "axios";

const AxiosContext = createContext();

const API = axios.create({
  baseURL: "http://localhost:3000",
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const AxiosProvider = ({ children }) => {
  return <AxiosContext.Provider value={API}>{children}</AxiosContext.Provider>;
};

export const useAxios = () => useContext(AxiosContext);
