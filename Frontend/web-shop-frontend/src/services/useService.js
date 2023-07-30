
import { useCallback } from 'react'
import useHttp from './useHttp'

const baseUrl = process.env.REACT_APP_BASE_URL;
const registerUrl = baseUrl + process.env.REACT_APP_REGISTER_URL;
const loginUrl = baseUrl + process.env.REACT_APP_LOGIN_URL;

const useService = () => {

    
    const{
        data,
        isLoading,
        error,
        statusCode,
        postRequestFormData,
        postRequest
    } = useHttp();

    const registerRequest = useCallback(
        (user)=>{
            console.log(registerUrl)
            postRequestFormData(registerUrl, user);
        },
        [postRequestFormData]
    );

    const loginRequest = useCallback(
        (credentials) => {
          postRequest(loginUrl, credentials);
        },
        [postRequest]
      );


    return{
        data,
        isLoading,
        error,
        statusCode,
        registerRequest,
        loginRequest
    };
}

export default useService;