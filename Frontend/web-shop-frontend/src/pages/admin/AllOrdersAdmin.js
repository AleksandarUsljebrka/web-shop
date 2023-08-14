import {useEffect, useState, useContext} from 'react'
import useService from '../../services/useService';
import AuthContext from '../../context/AuthContext';
import Orders from '../../components/orders/Orders';
import { useNavigate } from 'react-router-dom';

const AllOrdersAdmin = () => {
    const {
        isLoading,
        statusCode,
        error,
        data,
        getAllOrdersRequest,
        clearRequest,
      } = useService();
      const { role } = useContext(AuthContext);
      const [orders, setOrders] = useState([]);
      const navigate = useNavigate();
      
      useEffect(() => {
        getAllOrdersRequest();
      }, [getAllOrdersRequest]);
    
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
        navigate("/all-orders/" + id);
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
    

export default AllOrdersAdmin