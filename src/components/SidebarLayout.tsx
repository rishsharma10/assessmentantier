import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { AppDispatch, RootState } from "../store";
import { logout } from "../features/auth/authSlice";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const {pathname} = location
  const userData = useSelector((state: RootState) => state.auth.userInfo);
  const [toggle, setToggle] = useState(false)
  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
    toast.success("Logout successfully")
  };

  return (
    <div className="d-flex vh-100">
      <div className={`bg-dark text-white h-100 overflow-auto ${toggle ? 'p-0' : 'p-3'}`} style={{ minWidth: toggle ? "0px" : '250px', width: toggle ? "0px" : '250px', transition: '0.3s' }}>
        <ul className="nav flex-column gap-3 mt-4">
          <li className={`nav-item ${!pathname?.startsWith("/product") ? "active" : ""}`}>
            <Link to="/" className="nav-link text-white">
              Dashboard
            </Link>
          </li>
          <li className={`nav-item ${pathname?.startsWith("/product") ? "active" : ""}`}>
            <Link to="/product/list/1" className="nav-link text-white">
              Products
            </Link>
          </li>
        </ul>
      </div>

      <div className="flex-grow-1 h-100 overflow-auto">
        <nav className="navbar navbar-light bg-light px-3">
          <div className="d-flex align-items-center gap-4">
            <button className="btn btn-dark text-white d-flex align-items-center" onClick={() => setToggle(!toggle)}>
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" fill="currentColor" className="bi bi-list" viewBox="0 0 16 16">
                <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5m0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5" />
              </svg>
            </button>
            <h2 className="navbar-brand m-0">Hii, {userData?.firstName}</h2>
          </div>
          <button onClick={handleLogout} className="btn btn-outline-danger">Logout</button>
        </nav>

        <div className="container mt-3">{children}</div>
      </div>
    </div>
  );
};

export default React.memo(SidebarLayout);
