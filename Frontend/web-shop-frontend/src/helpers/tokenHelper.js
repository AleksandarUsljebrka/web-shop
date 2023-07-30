
import jwtDecode from 'jwt-decode';

export const getToken = () => {
    const token = window.localStorage.getItem('token');

    if (!token) {
      return null;
    }
  
    try {
      const decoded = jwtDecode(token);
  
      return decoded;
    } catch (exception) {
      //error(exception.message);
    }
};

export const getRawToken = () => {
    const token = window.localStorage.getItem('token');
    const tokenJson = token && JSON.parse(token)?.token;
  
    return tokenJson;
};

const tokenObj={
    getToken,
    getRawToken
}
export default tokenObj;