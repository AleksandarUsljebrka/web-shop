import {useEffect, useState,useContext} from 'react'
import AuthContext from '../../context/AuthContext';
import useService from '../../services/useService';
import { useNavigate } from 'react-router-dom';
import Orders from '../../components/orders/Orders';


const FinishedOrdersSalesman = () => {
    const {
        isLoading,
        statusCode,
        error,
        data,
        getSalesmanFinishedOrders,
        clearRequest,
      } = useService();
      const { role } = useContext(AuthContext);
      const [orders, setOrders] = useState([]);
      const navigate = useNavigate();
      useEffect(() => {
        getSalesmanFinishedOrders();
      }, [getSalesmanFinishedOrders]);
    
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
        navigate("/finished-orders/" + id);
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


export default FinishedOrdersSalesman