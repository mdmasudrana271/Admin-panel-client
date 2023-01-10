import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useAdmin from "../../hooks/useAdmin";

const Dashboard = () => {
  const {user} = useContext(AuthContext)
  const [isAdmin] = useAdmin(user?.email)
  return (
    <div>
      <div className="drawer drawer-mobile">
        <input
          id="dashboard-drawer"
          type="checkbox"
          className="drawer-toggle"
        />
        <div className="drawer-content">
          <Outlet></Outlet>
        </div>
        <div className="drawer-side">
          <label htmlFor="dashboard-drawer" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 text-base-content">
            <li>
              <Link to="/dashboard/my-orders">My Orders</Link>
            </li>
            {/* <li>
              <Link to="/dashboard/my-products">My Products</Link>
              <Link to="/dashboard/add-products">Add Product</Link>
            </li> */}
            <>
              {isAdmin && (
                <li>
                  <Link to="/dashboard/my-products">My Products</Link>
                  <Link to="/dashboard/add-products">Add Product</Link>
                </li>
              )}
            </>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
