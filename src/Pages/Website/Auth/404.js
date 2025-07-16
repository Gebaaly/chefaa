import React from "react";
import "./NotFound.css"; // custom styles
export default function NotFound() {
  return (
    <div className="not-found-container d-flex flex-column justify-content-center align-items-center text-center">
      <h1 className="display-1 fw-bold text-danger">404</h1>
      <p className="lead text-muted">
        Oops! The page you're looking for doesn't exist.
      </p>
      <a href="/" className="btn btn-primary mt-3">
        Go Back Home
      </a>
    </div>
  );
}
