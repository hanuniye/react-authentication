import axios from "axios";
import { useAuth } from "./useAuth";

const REFRESH_URL = 'http://localhost:5000/api/refresh_token';

const useRefresh = () => {
    const { setAuth } = useAuth();

    const refresh = async () => {
        try {
            const resp = await axios.get(REFRESH_URL,
                {
                    withCredentials: true,
                },
            )

            setAuth(prev => {
                console.log(prev.accessToken);
                console.log(resp.data.accessToken);
                return {...prev, accessToken: resp.data.accessToken}
            });

            return resp.data.accessToken;
        } catch (error) {
            console.log(error.response);
        }
    }

    return refresh;
}

export default useRefresh;
