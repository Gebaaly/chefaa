import { Link } from "react-router-dom";
export default function Forbidden() {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center vh-100">
      <h1 className="text-danger">403 Forbidden</h1>
      <p>You do not have permission to access this page.</p>
      <Link to="/" className="btn btn-primary">
        Go to Home
      </Link>
    </div>
  );
}