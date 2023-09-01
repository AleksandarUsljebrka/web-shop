import { useCallback } from "react";
import useHttp from "./useHttp";

const baseUrl = process.env.REACT_APP_BASE_URL;
const registerUrl = baseUrl + process.env.REACT_APP_REGISTER_URL;
const loginUrl = baseUrl + process.env.REACT_APP_LOGIN_URL;
const newArticleUrl = baseUrl + process.env.REACT_APP_POST_NEW_ARTICLE_URL;
const getSalesmanArticlesUrl =
  baseUrl + process.env.REACT_APP_SALESMAN_ARTICLES_URL;
const updateSalesmanStatusUrl =
  baseUrl + process.env.REACT_APP_UPDATE_SALESMAN_STATUS_URL;
const getAllSalesmenUrl = baseUrl + process.env.REACT_APP_ALL_SALESMEN_URL;
const updateArticleUrl = baseUrl + process.env.REACT_APP_UPDATE_ARTICLE_URL;
const getArticleDetailsUrl =
  baseUrl + process.env.REACT_APP_GET_ARTICAL_DETAILS_URL;
const deleteArticleUrl = baseUrl + process.env.REACT_APP_DELETE_ARTICLE_URL;
const customerArticlesUrl =
  baseUrl + process.env.REACT_APP_CUSTOMER_ARTICLES_URL;
const customerPostOrderUrl =
  baseUrl + process.env.REACT_APP_CUSTOMER_POST_ORDER;
const customerPendingOrdersUrl =
  baseUrl + process.env.REACT_APP_CUSTOMER_PENDING_ORDERS_URL;
const customerFinishedOrdersUrl =
  baseUrl + process.env.REACT_APP_CUSTOMER_FINISHED_ORDERS_URL;
const customerDeleteOrderUrl =
  baseUrl + process.env.REACT_APP_CUSTOMER_DELETE_ORDER_URL;
const customerOrderUrl =
  baseUrl + process.env.REACT_APP_CUSTOMER_ORDER_DETAILS_URL;
const getSalesmanOrderDetailsUrl =
  baseUrl + process.env.REACT_APP_SALESMAN_ORDER_DETAILS_URL;
const getAdminOrderDetailsUrl =
  baseUrl + process.env.REACT_APP_ADMIN_ORDER_DETAILS_URL;
const getSalesmanFinishedOrdersUrl =
  baseUrl + process.env.REACT_APP_SALESMAN_FINISHED_ORDERS_URL;
const getSalesmanPendingOrdersUrl =
  baseUrl + process.env.REACT_APP_SALESMAN_PENDING_ORDERS_URL;
const getUserUrl = baseUrl + process.env.REACT_APP_GET_USER_URL;
const updateUserUrl = baseUrl + process.env.REACT_APP_UPDATE_USER_URL;
const changePasswordUrl = baseUrl + process.env.REACT_APP_CHANGE_PASSWORD_URL;
const getProfileImageUrl =
  baseUrl + process.env.REACT_APP_GET_PROFILE_IMAGE_URL;
const changeProfileImageUrl =
  baseUrl + process.env.REACT_APP_CHANGE_PROFILE_IMAGE_URL;
const allOrdersUrl = baseUrl + process.env.REACT_APP_ALL_ORDERS_URL;
const googleLoginUrl = baseUrl + process.env.REACT_APP_GOOGLE_LOGIN_URL;
const googleRegisterUrl = baseUrl + process.env.REACT_APP_GOOGLE_REGISTER_URL; 

const useService = () => {
  const {
    data,
    isLoading,
    error,
    statusCode,
    postRequestFormData,
    putRequestFormData,
    postRequest,
    getRequest,
    resetHttp,
    putRequest,
    deleteRequest,
  } = useHttp();

  const registerRequest = useCallback(
    (user) => {
      console.log(registerUrl);
      postRequestFormData(registerUrl, user);
    },
    [postRequestFormData]
  );

  const googleRegisterRequest = useCallback(
    (credentials) => {
      postRequest(googleRegisterUrl, credentials);
    },
    [postRequest]
  );


  const loginRequest = useCallback(
    (credentials) => {
      postRequest(loginUrl, credentials);
    },
    [postRequest]
  );
  const googleLoginRequest = useCallback(
    (credentials) => {
      postRequest(googleLoginUrl, credentials);
    },
    [postRequest]
  );

  const newArticleRequest = useCallback(
    (article) => {
      postRequestFormData(newArticleUrl, article);
    },
    [postRequestFormData]
  );
  const getAdminOrderDetailsRequest = useCallback(
    (id) => {
      getRequest(getAdminOrderDetailsUrl + "?id=" + id);
    },
    [getRequest]
  );
  const getSalesmanArticlesRequest = useCallback(() => {
    getRequest(getSalesmanArticlesUrl);
  }, [getRequest]);

  const getArticleDetailsRequest = useCallback(
    (name) => {
      getRequest(getArticleDetailsUrl + "?name=" + name);
    },
    [getRequest]
  );
  const updateArticleRequest = useCallback(
    (article) => {
      console.log(article, updateArticleUrl);
      putRequest(updateArticleUrl, article);
    },
    [putRequest]
  );
  const deleteArticleRequest = useCallback(
    (name) => {
      deleteRequest(deleteArticleUrl + "?name=" + name);
    },
    [deleteRequest]
  );
  const getAllSalesmenRequest = useCallback(() => {
    getRequest(getAllSalesmenUrl);
  }, [getRequest]);

  const updateSalesmanStatusRequest = useCallback(
    (data) => {
      console.log("service");
      putRequest(updateSalesmanStatusUrl, data);
    },
    [putRequest]
  );

  const getSalesmanFinishedOrders = useCallback(() => {
    getRequest(getSalesmanFinishedOrdersUrl);
  }, [getRequest]);

  const getSalesmanPendingOrders = useCallback(() => {
    getRequest(getSalesmanPendingOrdersUrl);
  }, [getRequest]);

  const getCustomerArticlesRequest = useCallback(() => {
    getRequest(customerArticlesUrl);
  }, [getRequest]);

  const getSalesmanOrderDetailsRequest = useCallback(
    (id) => {
      getRequest(getSalesmanOrderDetailsUrl + "?id=" + id);
    },
    [getRequest]
  );
  const postCustomerOrderRequest = useCallback(
    (order) => {
      postRequest(customerPostOrderUrl, order);
    },
    [postRequest]
  );

  const getCustomerFinishedOrdersRequest = useCallback(() => {
    getRequest(customerFinishedOrdersUrl);
  }, [getRequest]);

  const getCustomerPendingOrdersRequest = useCallback(() => {
    getRequest(customerPendingOrdersUrl);
  }, [getRequest]);

  const getCustomerOrderDetailsRequest = useCallback(
    (id) => {
      getRequest(customerOrderUrl + "?id=" + id);
    },
    [getRequest]
  );
  const deleteCustomerOrderRequest = useCallback(
    (orderId) => {
      deleteRequest(customerDeleteOrderUrl + "?id=" + orderId);
    },
    [deleteRequest]
  );

  const getUserProfileRequest = useCallback(() => {
    getRequest(getUserUrl);
  }, [getRequest]);

  const updateUserRequest = useCallback(
    (user) => {
      putRequest(updateUserUrl, user);
    },
    [putRequest]
  );

  const changePasswordRequest = useCallback(
    (data) => {
      putRequest(changePasswordUrl, data);
    },
    [putRequest]
  );

  const getProfileImageRequest = useCallback(() => {
    getRequest(getProfileImageUrl);
  }, [getRequest]);

  const updateProfileImageRequest = useCallback(
    (data) => {
      putRequestFormData(changeProfileImageUrl, data);
    },
    [putRequestFormData]
  );
  const getAllOrdersRequest = useCallback(() => {
    getRequest(allOrdersUrl);
  }, [getRequest]);


  return {
    data,
    isLoading,
    error,
    statusCode,
    clearRequest: resetHttp,
    registerRequest,
    googleRegisterRequest,
    loginRequest,
    googleLoginRequest,
    newArticleRequest,
    getSalesmanArticlesRequest,
    updateSalesmanStatusRequest,
    getAllSalesmenRequest,
    updateArticleRequest,
    getArticleDetailsRequest,
    deleteArticleRequest,
    getCustomerArticlesRequest,
    postCustomerOrderRequest,
    getCustomerFinishedOrdersRequest,
    getCustomerPendingOrdersRequest,
    deleteCustomerOrderRequest,
    getAdminOrderDetailsRequest,
    getSalesmanOrderDetailsRequest,
    getCustomerOrderDetailsRequest,
    getSalesmanPendingOrders,
    getSalesmanFinishedOrders,
    getUserProfileRequest,
    updateUserRequest,
    changePasswordRequest,
    getProfileImageRequest,
    updateProfileImageRequest,
    getAllOrdersRequest
  };
};

export default useService;
