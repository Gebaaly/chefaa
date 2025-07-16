import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaBars } from "react-icons/fa";
import "./dashboard.css";
import { Link, Navigate } from "react-router";
import { Menu } from "../../context/MenuContext";
import { Axios } from "../../API/Axios";
import { USER } from "../../API/Api";
import { handleLogout } from "../../Pages/Website/Auth/LogoutFunction";
export default function Topbar() {
  const [name, setName] = useState("");

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setName(data.data.name))
      .catch(() => Navigate("/login"));
  }, []);
  const menu = useContext(Menu);
  const isOpen = menu.isOpened;
  const setIsOpen = menu.setIsOpened;
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light  topbar border-box ">
        <div className="container-fluid">
          <Link
            className="navbar-brand menu-icon me-auto d-flex align-items-center justify-content
            -between"
            style={{ left: isOpen ? "250px" : "0" }}
            onClick={() => setIsOpen((prev) => !prev)}
          >
            <h2 className="sidebar-title me-3 mb-0 text-center">Dashboard</h2>
            <FaBars />
          </Link>
          <div>
            {/* we will add name of user and logout button here in Dropdown */}
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                id="dropdownMenuButton"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {name}
              </button>
              <ul
                className="dropdown-menu"
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <Link to={"/dashboard/profile"} className="dropdown-item">
                    Profile
                  </Link>
                </li>
                <li>
                  <Link onClick={handleLogout} to={"/login"} className="dropdown-item">
                    Logout
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
}
