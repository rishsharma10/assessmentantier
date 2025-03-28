import React from "react";
import { Link } from "react-router-dom";

const SidebarLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="d-flex vh-100">
      {/* Sidebar */}
      <div className="bg-dark text-white p-3" style={{ width: "250px" }}>
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

      {/* Main Content Area */}
      <div className="flex-grow-1">
        {/* Header */}
        <nav className="navbar navbar-light bg-light px-3">
          <span className="navbar-brand">Dashboard</span>
          <Link to={`/login`}><button className="btn btn-outline-danger">Logout</button></Link>
        </nav>

        {/* Page Content */}
        <div className="container mt-3">{children}</div>
      </div>
    </div>
  );
};

export default SidebarLayout;
