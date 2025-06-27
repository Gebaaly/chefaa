import { Outlet } from "react-router";
import Sidebar from "../../Components/Dashboard/Sidebar";
import Topbar from "../../Components/Dashboard/Topbar";
import { useContext } from "react";
import { Menu } from "../../context/MenuContext";
import { windowSizeContext } from "../../context/WindowContext";

export default function Dashboard() {
     const menu = useContext(Menu);
     const isOpen = menu.isOpened;
     const windowSize = useContext(windowSizeContext);
  return (
    <>
      <div className="container-fluid rounded  p-0">
        <Topbar />
        <div
          className="main-content"
          style={{
            marginLeft: windowSize < 768 ? "0px" : isOpen ? "250px" : "70px",
            transition: "all 0.3s ease-in-out",
            padding: "20px",
          }}
        >
          <Sidebar />
          <Outlet />
        </div>
      </div>
    </>
  );
}
