import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import { Menu } from "../../context/MenuContext";
import { windowSizeContext } from "../../context/WindowContext";
import { USER } from "../../API/Api";
import { Axios } from "../../API/Axios";
import { links } from "./NavLinks";

export default function Sidebar() {
  const [user, setUser] = useState();
  const Navigate = useNavigate();

  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => Navigate("/login"));
  },[]);

  const menu = useContext(Menu);
  const isOpen = menu.isOpened;
  const windowSize = useContext(windowSizeContext);

  return (
    <div
      className="sidebar d-flex flex-column justify-content-between pt-5 pe-5 "
      style={{
        backgroundColor: "#343a40",
        color: "white",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: windowSize < 768 ? (isOpen ? "0px" : "-250px") : "0px",
        width:
          windowSize < 768
            ? isOpen
              ? "250px"
              : "0px"
            : isOpen
            ? "250px"
            : "70px",
        transition: "all 0.3s ease-in-out",
        zIndex: 999,
        overflowY: "auto",
      }}
    >
      <ul className="nav flex-column mt-3">
        {links.map(
          (link, key) =>
            user &&
            link.role.includes(user.role) && (
              <li className="nav-item" key={key}>
                <Link
                  to={link.path}
                  className="nav-link d-flex align-items-center text-white"
                >
                  {link.icon}
                  <span
                    className="ms-2"
                    style={{
                      display:
                        windowSize < 768 ? "none" : isOpen ? "inline" : "none",
                    }}
                  >
                    {link.name}
                  </span>
                </Link>
              </li>
            )
        )}
      </ul>
    </div>
  );
}
