import { BrowserRouter as Router, Routes, Route, Outlet, Navigate } from "react-router-dom";
import { Provider } from "react-redux";
import { RootState, store } from "../src/store";
import { lazy } from "react";
import { useSelector } from "react-redux";
const ProductDetails = lazy(() => import("./pages/ProductDetails"));
const AddProduct = lazy(() => import("./pages/AddProduct"));
const EditProduct = lazy(() => import("./pages/EditProduct"));
const SidebarLayout = lazy(() => import("./components/SidebarLayout"));
const Login = lazy(() => import("./pages/Login"));
const Product = lazy(() => import("./pages/Product"));
const Dashboard = lazy(() => import("./pages/Dashboard"));

const PrivateRoute: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.auth);
  return userInfo?.accessToken ? <Outlet /> : <Navigate to="/login" />;
};

const App = () => (
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoute />}>
          <Route path="/" element={<SidebarLayout><Dashboard /></SidebarLayout>} />
          <Route path="/product/list/:page" element={<SidebarLayout><Product /></SidebarLayout>} />
          <Route path="/product/add" element={<SidebarLayout><AddProduct /></SidebarLayout>} />
          <Route path="/product/:id/details" element={<SidebarLayout><ProductDetails /></SidebarLayout>} />
          <Route path="/product/:id/edit" element={<SidebarLayout><EditProduct /></SidebarLayout>} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);

export default App;
