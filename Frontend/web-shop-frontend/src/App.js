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
    </Routes>
  );
}

export default App;
