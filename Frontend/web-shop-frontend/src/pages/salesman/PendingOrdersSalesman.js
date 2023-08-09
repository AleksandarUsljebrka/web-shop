import React, { useContext, useEffect, useState } from "react";
import useService from "../../services/useService";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import Orders from "../../components/orders/Orders";

const PendingOrdersSalesman = () => {
  const {
    isLoading,
    statusCode,
    error,
    data,
    getSalesmanPendingOrders,
    clearRequest,
  } = useService();
  const { role } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getSalesmanPendingOrders();
  }, [getSalesmanPendingOrders]);

  useEffect(() => {
    if (isLoading) {
      return;
    } else if (statusCode === 200 && !error && data) {
      setOrders(data.orders);
      clearRequest();
    } else if (statusCode !== 200 && error) {
      console.log(error);
    }
  }, [isLoading, data, statusCode, error, clearRequest]);

  const handleButton = (id) => {
    navigate("/pending-orders/" + id);
  };

  return (
    <div>
      <Orders
        data={orders}
        role={role}
        button={handleButton}
        buttonText={"Details"}
      ></Orders>
    </div>
  );
};

export default PendingOrdersSalesman;
