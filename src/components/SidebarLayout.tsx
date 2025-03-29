import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { logout } from "../features/auth/authSlice";
import { useSelector } from "react-redux";

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const userData = useSelector((state: RootState) => state.auth.userInfo);
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <div className="d-flex vh-100">
      <div className="bg-dark text-white p-3 h-100 overflow-auto" style={{ width: "250px" }}>
        <ul className="nav flex-column gap-3 mt-4">
          <li className="nav-item">
            <Link to="/" className="nav-link text-white">
              Dashboard
            </Link>
          </li>
          <li className="nav-item">
            <Link to="/product/list/1" className="nav-link text-white">
              Products
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-grow-1 h-100 overflow-auto">
        <nav className="navbar navbar-light bg-light px-3">
          <h2 className="navbar-brand">Hii, {userData?.firstName}</h2>
          <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
        </nav>

        <div className="container mt-3">{children}</div>
      </div>
    </div>
  );
};

export default React.memo(SidebarLayout);
