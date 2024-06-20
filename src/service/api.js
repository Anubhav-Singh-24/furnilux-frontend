import axios from "axios";
import {
  getAccessToken,
  setAccessToken,
  getType,
  logoutUser
} from "../utils/common_utils";
import { API_NOTIFICATION_MESSAGES, service_urls } from "./constants";

const API_URL = "https://furnilux-backend.onrender.com";

const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 20000,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials:true,
});

axiosInstance.interceptors.request.use(
  function (config) {
    const token = getAccessToken();
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + "/" + config.TYPE.query;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  function (response) {
    return processResponse(response);
  },
  async function (error) {
    const originalRequest = error.config;
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;
      try {
        const refreshtoken = await getRefreshToken();
        setAccessToken(refreshtoken.accessToken);
        originalRequest.headers[
          "Authorization"
        ] = `Bearer ${refreshtoken.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (error) {
        return Promise.reject(error);
      }
    }
    return Promise.reject(ProcessError(error));
  }
);

const processResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response.data };
  } else {
    return {
      status: response?.status,
      msg: response?.msg,
      code: response?.code,
    };
  }
};

const ProcessError = (error) => {
  if (error.response) {
    if (error.response?.status === 403) {
      if(logoutUser()){
        window.location.reload();
      }
    } else {
      console.log("ERROR IN RESPONSE: ", error.toJSON());
      return {
        msg: error.response.data.msg,
        code: error.response.status,
      };
    }
  } else if (error.request) {
    console.log("ERROR IN RESPONSE: ", error.toJSON());
    return {
      msg: API_NOTIFICATION_MESSAGES.networkError.message,
      code: "",
    };
  } else {
    console.log("ERROR IN RESPONSE: ", error.toJSON());
    return {
      msg: API_NOTIFICATION_MESSAGES.responseFailure.message,
      code: "",
    };
  }
};

const getRefreshToken = async () => {
  try {
    const response = await axios.post(`${API_URL}/refreshtoken`,{}, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    throw new Error("Unable to refresh token");
  }
};

const API = {};

for (const [key, value] of Object.entries(service_urls)) {
  API[key] = (body) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === "DELETE" ? {} : body,
      responseType: value.responseType,
      headers: {
        authorization: getAccessToken(),
        Accept: "application/json, form-data",
        "Content-Type": "application/json",
      },
      TYPE: getType(value, body),
    });
}

export { API };
