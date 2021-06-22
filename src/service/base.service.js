import axios from "axios";
import config from "../util/config";
// import StatusCode from "./status-code";
// import { refresh } from "./auth.service";

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

    return instance;
};

export default api;
