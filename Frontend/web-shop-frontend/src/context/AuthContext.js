import {  useState, createContext, useCallback } from "react";
import tokenObj from '../helpers/tokenHelper';

const AuthContext = createContext({
    login: () => {},
    logout: () => {},
    loadUser:()=>{},
    isLoggedin: false,
    username: '',
    role: '',
    status: null,
    rawToken: '',
});

export const AuthContextProvider=({children})=>{
    const [user, setUser] = useState({
      username: "",
      role: "",
      status: null,
      rawToken: "",
    });
    const[isLoggedin, setIsLoggedin] = useState(false);

    const login = useCallback((data)=>{
        tokenObj.saveToken(data);
        setIsLoggedin(tokenObj.isLoggedin());
        const user = tokenObj.getUser();
        setUser(user);
    },[]);
    
    const logout = useCallback(()=>{
        tokenObj.removeToken();
        setIsLoggedin(false);
        setUser(emptyUser);
    }, []);

    const loadUser = useCallback(() => {
        if (!tokenObj.isLoggedin()) {
          return;
        }
    
        if (tokenObj.isTokenExpired()) {
          tokenObj.removeToken();
          return;
        }
    
        setIsLoggedin(tokenObj.isLoggedin());
        const user = tokenObj.getUser();
        setUser(user);
      }, []);
    
    return (
        <AuthContext.Provider
          value={{
            login,
            logout,
            loadUser,
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


const emptyUser = {
    username: '',
    role: '',
    status: null,
    rawToken: '',
  };
export default AuthContext;