import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import ".//CSS/components/err.css";
import "./CSS/components/loading.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.min.js";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import MenuContext from "./context/MenuContext";
import WindowContext from "./context/WindowContext";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  // <React.StrictMode>
    <WindowContext>
      <MenuContext>
        <Router>
          <App />
        </Router>
      </MenuContext>
    </WindowContext>
  // </React.StrictMode>
);
