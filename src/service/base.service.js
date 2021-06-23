import axios from "axios";
import config from "../util/config";
import StatusCode from "./status-code";
import { refresh } from "./auth.service";

export const api = (dontUseAuthorizationHeader) => {
  const baseConfig = {
    baseURL: config.BASE_ENDPOINT_URL,
  };

  const createInstance = (baseConfig) => {
    const instance = axios.create(baseConfig);
    instance.defaults.headers.common["Content-Type"] = "application/json";
    instance.interceptors.request.use(
      async (config) => {
        if (dontUseAuthorizationHeader) return config;
        else {
          const token = await sessionStorage.getItem("accessToken");
          if (token && config.url !== "/login") {
            config.headers = {
              ...config.params,
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            };
          }
          return config;
        }
      },
      (error) => {
        Promise.reject(error);
      }
    );
    return instance;
  };

  const instance = createInstance(baseConfig);

  instance.interceptors.response.use(
    async (response) => {
      // const token = await localStorage.getItem("token");
      //TODO Check if token in Authorization response is different than token in local storage
      // If yes, then new access token is issued
      // If no, do nothing

      return response;
    },
    async (error) => {
      if (error.config.url !== "/refresh") {
        const originalRequest = error.config;
        switch (error.response.status) {
          case StatusCode.UNAUTHORIZED:
            // eslint-disable-next-line no-case-declarations
            try {
              const {
                data: { accessToken, refreshToken },
              } = await refresh({
                accessToken: sessionStorage.getItem("accessToken"),
                refreshToken: localStorage.getItem("refreshToken"),
              });
              sessionStorage.setItem("accessToken", accessToken);
              localStorage.setItem("refreshToken", refreshToken);
              return api()(originalRequest);
            } catch (err) {
              sessionStorage.removeItem("accessToken");
              localStorage.removeItem("refreshToken");
              delete instance.defaults.headers.common["Authorization"];
              window.location.href = "/login";
            }
            break;
          default:
            throw error.response;
        }
      } else {
        if (error.response.status === StatusCode.UNAUTHORIZED) {
          sessionStorage.removeItem("accessToken");
          localStorage.removeItem("refreshToken");
          delete instance.defaults.headers.common["Authorization"];
          window.location.href = "/login";
        }
      }
    }
  );

  return instance;
};

export default api;
