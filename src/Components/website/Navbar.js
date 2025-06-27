import { Link } from "react-router";
import logo from "../../assets/chefaa-en.webp";

export default function Navbar() {
  return (
    <>
      <div className="register-nav border border-end-0 border-start-0 border-top-0">
        <div className="container">
          <div className="register-nav d-flex justify-content-between align-items-center pt-1 pb-2">
            {/* Home Logo */}
            <div className="logo me-5">
              <Link to="/">
                <img src={logo} alt="logo" width={140} height={38} />
              </Link>
            </div>
            {/* Home Logo */}

            {/* Home Btn */}
            <div className="back-btn ms-5">
              <Link
                to="/"
                className="text-dark text-decoration-none fw-bold fs-6"
              >
                Home
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8 3L17 12L8 21"
                    stroke="black"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </Link>
            </div>
            {/* Home Btn */}
          </div>
        </div>
      </div>
    </>
  );
}
