import React, { useContext, useEffect, useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import { act } from "react-dom/test-utils";
import OrderContext from "../context/OrderContext";


export const PaypalCheckoutButton = ({orderPrice, isDisabled}) => {
 // const { totalPrice } = orderPrice;
  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);
  const { setOrderPaid, ...orderContext } = useContext(OrderContext);
  //const [disable, setDisable] = useState(isDisabled);
   const orderAndDelivery = orderPrice+3; 
  const handleApprove = (orderId) => {
    setPaidFor(true);
   // setOrderPaid(true);
  };

  useEffect(() => {
    if (paidFor) {
      alert("Thank you PAYPAL!");
      setOrderPaid(true);
    }
    if (error) {
      //display or direct to error page
      alert(error);
    }
  }, [paidFor, error]);

  return (
    <PayPalButtons
      className="paypal-buttons"
      disabled={isDisabled}
      style={{
        color: "silver",
        layout: "horizontal",
        height: 38,
        tagline: false,
      }}
      onClick={(data, actions) => {
        //validate on button click, client or server side
       //setOrderPaid(true);
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: orderAndDelivery,
              },
            },
          ],
        });
      }}
      onApprove={async (data, actions) => {
        const order = await actions.order.capture();
        console.log("order", order);

        handleApprove(data.orderID);
      }}
      onCancel={() => {}}
      onError={(err) => {
        setError(err);
        console.error("Paypal checkout onError", err);
      }}
    />
  );
};
