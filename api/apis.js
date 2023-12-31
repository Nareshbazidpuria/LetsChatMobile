import { Axios } from "./axios";

export const ENDPOINT = {
  SIGNUP: "/pub/signup",
  LOGIN: "/pub/login",
  LOGOUT: "/api/auth/logout",
  CHANGE_PASSWORD: "/api/auth/change-password",
  DELETE_ACCOUNT: "/api/auth/account",
  PROFILE: "/api/profile",
  PREFERENCES: "/api/user/preferences",
  USERS: "/api/user",
  UPLOAD: "/api/generic/upload",
  REQUEST: "/api/request",
  MESSAGE: "/api/message",
};

export const signUpApi = (payload) => Axios.post(ENDPOINT.SIGNUP, payload);

export const loginApi = (payload) => Axios.post(ENDPOINT.LOGIN, payload);

export const getProfileApi = () => Axios.get(ENDPOINT.PROFILE);

export const setPreferencesApi = (payload) =>
  Axios.put(ENDPOINT.PREFERENCES, payload);

export const updateProfileApi = (payload) =>
  Axios.put(ENDPOINT.PROFILE, payload);

export const logoutApi = () => Axios.post(ENDPOINT.LOGOUT);

export const changePasswordApi = (payload) =>
  Axios.post(ENDPOINT.CHANGE_PASSWORD, payload);

export const deleteAccountApi = () => Axios.delete(ENDPOINT.DELETE_ACCOUNT);

export const getUsersApi = (params) =>
  Axios.get(ENDPOINT.USERS, { params: { ...params, limit: 20 } });

export const getUserInfoApi = (id) => Axios.get(`${ENDPOINT.USERS}/${id}`);

export const unfriendApi = (id) => Axios.put(`${ENDPOINT.USERS}/${id}`);

export const uploadImageApi = (formData) =>
  Axios.post(ENDPOINT.UPLOAD, formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
    transformRequest: () => formData,
  });

// export const uploadImageApi = (formData) =>
//   Axios.post(ENDPOINT.UPLOAD, formData);

export const getReqsApi = (params) => Axios.get(ENDPOINT.REQUEST, { params });

export const sendRequestApi = (payload) =>
  Axios.post(ENDPOINT.REQUEST, payload);

export const confirmRequestApi = (reqId) =>
  Axios.put(`${ENDPOINT.REQUEST}/${reqId}`);

export const rejectReqApi = (reqId, params) =>
  Axios.delete(`${ENDPOINT.REQUEST}/${reqId}`, { params });

export const sendMsgApi = (roomId, payload) =>
  Axios.post(`${ENDPOINT.MESSAGE}/${roomId}`, payload);

export const getMsgsApi = (roomId, page = 1, limit = 20) =>
  Axios.get(`${ENDPOINT.MESSAGE}/${roomId}`, { params: { page, limit } });
