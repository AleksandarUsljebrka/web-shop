import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Articles from "../../components/article/Articles";
import AuthContext from "../../context/AuthContext";
import useService from "../../services/useService";
import OrderContext from "../../context/OrderContext";

const CustomerArticles = () => {
  const {
    data,
    error,
    statusCode,
    isLoading,
    getCustomerArticlesRequest,
    clearRequest,
  } = useService();

  const [articles, setArticles] = useState([]);
  const { role } = useContext(AuthContext);
  const orderContext = useContext(OrderContext);

  useEffect(() => {
    getCustomerArticlesRequest();
  }, [getCustomerArticlesRequest]);

  useEffect(() => {
    if (isLoading) {
      return;
    } else if (statusCode === 200 && !error && data) {
      setArticles(data.articles);

      clearRequest();
    } else if (statusCode !== 200 && error) {
      console.log(statusCode);
    }
  }, [isLoading, statusCode, error, data, clearRequest]);

  const handleButton = (article) => {
    orderContext.addItemToOrder(article, 1);
  };

  return (
  <div>
    {!isLoading && (
        <Articles
          data={articles}
          role={role}
          buttonFunction={handleButton}
          buttonText='Add to Order'
        ></Articles>
      )}
  </div>);
};

export default CustomerArticles;
