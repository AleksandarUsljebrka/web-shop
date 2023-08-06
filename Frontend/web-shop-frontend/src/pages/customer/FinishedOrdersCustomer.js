import { useContext, useEffect, useState } from "react";
import Orders from "../../components/orders/Orders";
import useService from "../../services/useService";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const FinishedOrdersCustomer = () => {
  const [orders, setOrder] = useState([]);
  const {
    isLoading,
    data,
    statusCode,
    error,
    clearRequest,
    getCustomerFinishedOrdersRequest,
  } = useService();
  const navigate = useNavigate();
  const { role } = useContext(AuthContext);

  useEffect(() => {
    getCustomerFinishedOrdersRequest();
  },[getCustomerFinishedOrdersRequest]);
  useEffect(() => {
    if (isLoading) {
      return;
    } else if (statusCode === 200 && !error && data) {
      setOrder(data.orders);
      clearRequest();
    } else if (statusCode !== 200 && error) {
      console.log(error);
      clearRequest();
    }
  }, [isLoading, data, statusCode, error, clearRequest]);

  const handleButton = (id) => {
    navigate("/finished-orders/" + id);
  };
  return (
    <div>
      <Orders
        data={orders}
        role={role}
        button={handleButton}
        buttonText="Details"
      ></Orders>
    </div>
  );
};

export default FinishedOrdersCustomer;
