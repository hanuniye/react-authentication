import { useEffect, useRef } from "react";
import { privateAxios } from "../api/axois";
import { useAuth } from "./useAuth";
import useRefresh from "./useRefresh";

export const usePrivateAxios = () => {
    const refresh = useRefresh();
    const { auth } = useAuth();

    useEffect(() => {
        const requestIntercept = privateAxios.interceptors.request.use(
            config => {
                if(!config?.headers['auth']){
                    config.headers['auth'] = `Bearer ${auth?.accessToken}`
                }
                return config;
            },
            (error) => {
                return Promise.reject(error)
            }
        )

        const responseIntercept = privateAxios.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if(error?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['auth'] = `Bearer ${newAccessToken}`;
                    return privateAxios(prevRequest)
                }

                return Promise.reject(error)
            }
        )

        // after cleaning cencel responseIntercept
        return () => {
            privateAxios.interceptors.request.eject(requestIntercept);
            privateAxios.interceptors.response.eject(responseIntercept);
        }

    }, [auth, refresh]);

    return privateAxios;
}