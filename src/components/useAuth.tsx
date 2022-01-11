import React, {useEffect, useState} from 'react';
import axios from 'axios';

const useAuth =(aCode: string | null): string | null => {
    const [token, setToken] = useState<string>("")
    const getToken = async () => {
        const tokenResponse = await axios.post("http://localhost:3001/login", {
            aCode
        })
        console.log(tokenResponse.data);
        setToken(tokenResponse.data.accessToken);
        console.log(token)
    }
    useEffect(() => {
       getToken()
      }, [aCode])
    return token;
}

export default useAuth;