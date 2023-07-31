import {  useState, createContext, useCallback } from "react";
import tokenObj from '../helpers/tokenHelper';

const AuthContext = createContext({
    login: () => {},
    logout: () => {},
    isLoggedin: false,
    username: '',
    role: '',
    status: null,
    rawToken: '',
});

export const AuthContextProvider=({children})=>{
    const[user,setUser] = useState(null);
    const[isLoggedin, setIsLoggedin] = useState(false);

    const login = useCallback((data)=>{
        tokenObj.saveToken(data);
        console.log(data);
        setIsLoggedin(tokenObj.isLoggedin());
        const user = tokenObj.getUser();
        setUser(user);
    },[]);
    
    const logout = useCallback(()=>{
        tokenObj.removeToken();
        setIsLoggedin(false);
        setUser(null);
    }, []);

    return (
        <AuthContext.Provider
          value={{
            login,
            logout,
            isLoggedin,
            username: user.username,
            role: user.role,
            rawToken: user.rawToken,
            status: user.status,
          }}
        >
          {children}
        </AuthContext.Provider>
      );
};

export default AuthContext;