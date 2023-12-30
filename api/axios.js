import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Navigate } from "../utils/navigate";

export const baseURL = "http://192.168.46.201:4000/mob";
export const socketURL = "http://192.168.46.201:4001";

export const Axios = axios.create({ baseURL });

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error?.response?.status === 401) {
      await AsyncStorage.clear();
      Navigate("Login");
    }
    return Promise.reject(error.response);
  }
);

Axios.interceptors.request.use(
  async (config) => {
    config.headers["token"] = await AsyncStorage.getItem("token");
    return config;
  },
  (error) => Promise.reject(error)
);
