import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Provider } from "react-redux";
// import store from "./store";
import { lazy } from "react";
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const EditProduct = lazy(() => import("./pages/EditProduct"));
const SidebarLayout = lazy(() => import("./components/SidebarLayout"));
const Login = lazy(() => import("./pages/Login"));
const Product = lazy(() => import("./pages/Product"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

// import Dashboard from "./pages/Dashboard";
// import Products from "./pages/Products";
// import { PrivateRoute, PublicRoute } from "./routes";

const App = () => (
  // <Provider store={store}>
    <Router>
      <Routes>
        {/* <Route element={<PublicRoute />}> */}
          <Route path="/login" element={<Login />} />
        {/* </Route> */}
        {/* <Route element={<PrivateRoute />}>
          </Route> */}
          <Route path="/" element={<SidebarLayout><Dashboard /></SidebarLayout>} />
          <Route path="/product/list/:page" element={<SidebarLayout><Product /></SidebarLayout>} />
          <Route path="/product/add" element={<SidebarLayout><AddProduct /></SidebarLayout>} />
          <Route path="/product/:id/details" element={<SidebarLayout><ProductDetails /></SidebarLayout>} />
          <Route path="/product/:id/edit" element={<SidebarLayout><EditProduct /></SidebarLayout>} />
      </Routes>
    </Router>
  // </Provider>
);

export default App;
