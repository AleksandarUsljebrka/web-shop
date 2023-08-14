import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";

import Articles from "../../components/article/Articles";
import AuthContext from "../../context/AuthContext";
import useService from "../../services/useService";
const SalesmanArticles = () => {
  const {
    data,
    error,
    statusCode,
    isLoading,
    getSalesmanArticlesRequest,
    clearRequest,
  } = useService();

  const [articles, setArticles] = useState([]);
  const { role } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    getSalesmanArticlesRequest();
  }, [getSalesmanArticlesRequest]);

  useEffect(() => {
    if (isLoading) {
      return;
    } else if (statusCode === 200 && !error && data) {
      data?.articles.forEach((item) => {
        item.productImage = 'data:image/*;base64,' + item.productImage;
        setArticles(data.articles);
      });

      clearRequest();
    } else if (statusCode !== 200 && error) {
      console.log(statusCode);
    }
  }, [isLoading, statusCode, error, data, clearRequest]);

  const handleButton = (article) => {
    navigate("/articles/" + article.name);
  };

  return (
  <div>
    {!isLoading && (
        <Articles
          data={articles}
          role={role}
          buttonFunction={handleButton}
          buttonText='Details'
        ></Articles>
      )}
  </div>);
};

export default SalesmanArticles;
