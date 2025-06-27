import Cookie from "cookie-universal";
import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router";
import { USER } from "../../../API/Api";
import Loadingpage from "../../../Components/website/Loadingpage";
import { Axios } from "../../../API/Axios";
import Forbidden from "./403";
export default function RecuireAuth({ allowedRole }) {
  const [user, setUser] = useState();
  const Navigate = useNavigate();
  useEffect(() => {
    Axios.get(`/${USER}`)
      .then((data) => setUser(data.data))
      .catch(() => Navigate("/login"));
  }, []);

  const cookie = Cookie();
  const token = cookie.get("chefaa");

  return token ? (
    !user ? (
      <Loadingpage /> 
    ) : allowedRole.includes (user.role)? (
      <Outlet />
    ) : (
      <Forbidden />
    )
  ) : (
    <Navigate to="/login" replace={true} />
  );
}
