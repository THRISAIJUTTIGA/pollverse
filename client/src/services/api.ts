import axios from "axios";
const deviceStorageKey = "pollverse-device-id";
const createDeviceId = () => {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`;
};
const getDeviceId = () => {
  const existing = window.localStorage.getItem(deviceStorageKey);
  if (existing) return existing;
  const id = createDeviceId();
  window.localStorage.setItem(deviceStorageKey, id);
  return id;
};

export const api = axios.create({ baseURL: import.meta.env.VITE_API_URL ?? "http://localhost:5000/api", withCredentials: true, headers: { "Content-Type": "application/json" } });
api.interceptors.request.use((config) => {
  config.headers.set("x-pollverse-device-id", getDeviceId());
  return config;
});
