import "./App.css";
import { useContext, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Layout from "./components/Layout";

import AuthContext from "./context/AuthContext";
import NewArticle from "./pages/salesman/NewArticle";
import SalesmanArticles from "./pages/salesman/SalesmanArticles";
import AllSalesmen from "./pages/admin/AllSalesmen";
import ArticleDetails from "./components/article/ArticleDetails";
import CustomerArticles from "./pages/customer/CustomerArticles";
import Order from "./pages/customer/Order";
import PendingOrdersCustomer from "./pages/customer/PendingOrdersCustomer";
import OrderDetails from "./components/orders/OrderDetails";
import FinishedOrdersCustomer from "./pages/customer/FinishedOrdersCustomer";
import PendingOrdersSalesman from "./pages/salesman/PendingOrdersSalesman";
import FinishedOrdersSalesman from "./pages/salesman/FinishedOrdersSalesman";

function App() {
  const { loadUser, ...authContext } = useContext(AuthContext);

  const isLoggedin = authContext.isLoggedin;
  const role = isLoggedin && authContext.role.toLowerCase();
  const approvedSalesman =
    role === "salesman" && authContext.status?.toLowerCase() === "approved";

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
      </Route>

      <Route path="/registration" element={<Layout />}>
        {!isLoggedin && <Route index element={<Registration />} />}
        {isLoggedin && <Route index element={<Home />} />}
      </Route>

      <Route path="/login" element={<Layout />}>
        {!isLoggedin && <Route index element={<Login />} />}
        {isLoggedin && <Route index element={<Home />} />}
      </Route>

      {role === 'admin' && <Route path="/all-salesmen" element={<Layout />}>
        <Route index element={<AllSalesmen />} />
      </Route>}

      {approvedSalesman && <Route path="/articles" element={<Layout />}>
        <Route index element={<SalesmanArticles />} />
      </Route>}

      {approvedSalesman && <Route path="/new-article" element={<Layout />}>
        <Route index element={<NewArticle />} />
      </Route>}

      {approvedSalesman && <Route path="/articles/:name" element={<Layout />}>
        <Route index element={<ArticleDetails />} />
      </Route>}

      {approvedSalesman && <Route path="/pending-orders/" element={<Layout />}>
        <Route index element={<PendingOrdersSalesman />} />
      </Route>}
      {approvedSalesman && <Route path="/pending-orders/:id" element={<Layout />}>
        <Route index element={<OrderDetails />} />
      </Route>}

      {approvedSalesman && <Route path="/finished-orders" element={<Layout />}>
        <Route index element={<FinishedOrdersSalesman />} />
      </Route>}
      {approvedSalesman && <Route path="/finished-orders/:id" element={<Layout />}>
        <Route index element={<OrderDetails />} />
      </Route>}

      {role ==="customer" && <Route path="/articles" element={<Layout />}>
        <Route index element={<CustomerArticles />} />
      </Route>}

      {role ==="customer" && <Route path="/order/" element={<Layout />}>
        <Route index element={<Order />} />
      </Route>}
      {role ==="customer" && <Route path="/pending-orders/" element={<Layout />}>
        <Route index element={<PendingOrdersCustomer />} />
      </Route>}
      {role ==="customer" && <Route path="/pending-orders/:id" element={<Layout />}>
        <Route index element={<OrderDetails />} />
      </Route>}
      {role ==="customer" && <Route path="/finished-orders" element={<Layout />}>
        <Route index element={<FinishedOrdersCustomer />} />
      </Route>}
      {role ==="customer" && <Route path="/finished-orders/:id" element={<Layout />}>
        <Route index element={<OrderDetails />} />
      </Route>}
      
    </Routes>
  );
}

export default App;
