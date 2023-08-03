import { useCallback } from "react";
import useHttp from "./useHttp";

const baseUrl = process.env.REACT_APP_BASE_URL;
const registerUrl = baseUrl + process.env.REACT_APP_REGISTER_URL;
const loginUrl = baseUrl + process.env.REACT_APP_LOGIN_URL;
const newArticleUrl = baseUrl + process.env.REACT_APP_POST_NEW_ARTICLE_URL;
const getSalesmanArticlesUrl =
  baseUrl + process.env.REACT_APP_SALESMAN_ARTICLES_URL;
const updateSalesmanStatusUrl = baseUrl + process.env.REACT_APP_UPDATE_SALESMAN_STATUS_URL;
const getAllSalesmenUrl = baseUrl + process.env.REACT_APP_ALL_SALESMEN_URL; 
const useService = () => {
  const {
    data,
    isLoading,
    error,
    statusCode,
    postRequestFormData,
    postRequest,
    getRequest,
    resetHttp,
    putRequest
  } = useHttp();

  const registerRequest = useCallback(
    (user) => {
      console.log(registerUrl);
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

  const newArticleRequest = useCallback(
    (article) => {
      postRequestFormData(newArticleUrl, article);
    },
    [postRequestFormData]
  );

  const getSalesmanArticlesRequest = useCallback(() => {
    getRequest(getSalesmanArticlesUrl);
  }, [getRequest]);

  const getAllSalesmenRequest = useCallback(() => {
    getRequest(getAllSalesmenUrl);
  }, [getRequest]);

  const updateSalesmanStatusRequest = useCallback(
    (data) => {
      putRequest(updateSalesmanStatusUrl, data);
    },
    [putRequest]
  );
  return {
    data,
    isLoading,
    error,
    statusCode,
    clearRequest: resetHttp,
    registerRequest,
    loginRequest,
    newArticleRequest,
    getSalesmanArticlesRequest,
    updateSalesmanStatusRequest,
    getAllSalesmenRequest
  };
};

export default useService;
