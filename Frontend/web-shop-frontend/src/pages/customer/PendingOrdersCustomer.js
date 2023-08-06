import React, { useContext, useEffect, useState } from "react";
import Orders from "../../components/orders/Orders";
import useService from "../../services/useService";
import { useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

const PendingOrdersCustomer = () => {
  const {
    data,
    error,
    statusCode,
    isLoading,
    getCustomerPendingOrdersRequest,
    deleteCustomerOrderRequest,
    clearRequest,
  } = useService();
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [cancelOrder, setCancel] = useState(false);
  const { role } = useContext(AuthContext);

  useEffect(() => {
    getCustomerPendingOrdersRequest();
  }, [getCustomerPendingOrdersRequest]);

  useEffect(() => {
    if (isLoading) {
      return;
    } else if (statusCode === 200 && !error && data) {
      setOrders(data.orders);
      clearRequest();
    } else if (statusCode === 200 && !error && cancelOrder) {
        setCancel(false);
      getCustomerPendingOrdersRequest();
      clearRequest();
    } else if (statusCode !== 200 && error) {
      console.log(error);
    }
  }, [
    isLoading,
    statusCode,
    error,
    data,
    getCustomerPendingOrdersRequest,
    cancelOrder,
    clearRequest,
  ]);

  const handleCancel=(id)=>{
    setCancel(true);
    deleteCustomerOrderRequest(id);
  }
  const handleButton=(id)=>{
    navigate('/pending-orders/'+id)
  }
  return (
    <>
      {!isLoading && (
        <Orders
          data={orders}
          role={role}
          button={handleButton}
          buttonText="Details"
          buttonCancel={handleCancel}
        />
      )}
    </>
  );
};

export default PendingOrdersCustomer;
