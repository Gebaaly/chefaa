import { handleLogout } from "./LogoutFunction";

export default function Logout() {

  return (
    
    <button onClick={handleLogout} className="btn btn-danger">
      Logout
    </button>
  );
}
