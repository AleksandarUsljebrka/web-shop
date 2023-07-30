
import { useCallback, useState } from 'react';
import { getRawToken } from '../helpers/tokenHelper';
const useHttp = (resolve) => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [statusCode, setStatusCode] = useState(null);
    
    const prepare = () => {
      setIsLoading(true);
      setError(null);
      setStatusCode(null);
      setData(null);
    };
    const processResponse = (response) => {
      setStatusCode(response.status);
      // Action if its JSON response
      if (response.headers.get('content-type')?.includes('application/json')) {
        if (!response.ok) {
          return response.json().then((data) => {
            const errorMessage = data.message || data.title || '';
  
            throw new Error(errorMessage);
          });
        }
        return response.json();
      }
      // Action if its TEXT response
      else if (response.headers.get('content-type')?.includes('text/plain')) {
        if (!response.ok) {
          return response.text().then((errorMessage) => {
            throw new Error(errorMessage);
          });
        }
      }
      // Action for neither
      else {
        if (!response.ok) {
          const errorMessage = response?.title || '';
          throw new Error(errorMessage);
        }
      }
    };
    const postRequestFormData = useCallback(
        (url, data) => {
          prepare();
    
          const formData = new FormData();
          for (const key in data) {
            formData.append(key, data[key]);
          }
    
          fetch(url, {
            method: 'post',
            body: formData,
            mode: 'cors',
            headers: {
              Authorization: 'Bearer ' + getRawToken(),
            },
          })
            .then((response) => {
              return processResponse(response);
            })
            .then((data) => {
              setData(data);
            })
            .catch((error) => {
              setError('Error doing POST request! ' + error.message);
            })
            .finally(() => {
              setIsLoading(false);
              resolve && resolve();
            });
        },
        [resolve]
      );

      const postRequest = useCallback(
        (url, data) => {
          prepare();
    
          fetch(url, {
            method: 'post',
            body: JSON.stringify(data),
            mode: 'cors',
            headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer ' + getRawToken(),
            },
          })
            .then((response) => {
              return processResponse(response);
            })
            .then((data) => {
              setData(data);
            })
            .catch((error) => {
              setError('Error doing POST request! ' + error.message);
            })
            .finally(() => {
              setIsLoading(false);
              resolve && resolve();
            });
        },
        [resolve]
      );

      return{
        data,
        isLoading,
        error,
        statusCode,
        postRequestFormData,
        postRequest
      };


}

export default useHttp;
