import { LOGOUT } from "../../../API/Api";
import Cookie from "cookie-universal";
import { Axios } from "../../../API/Axios";
const cookies = Cookie();

export async function handleLogout() {
  try {
    const res = await Axios.get(`/${LOGOUT}`);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
}
