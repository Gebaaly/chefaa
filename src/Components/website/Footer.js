import logo from "../../assets/chefaa-en.webp";

import faceBookLogo from "../../assets/footer-facebook.webp";
import twitterLogo from "../../assets/footer-twitter.webp";
import instagramLogo from "../../assets/footer-insta.webp";
import { Link } from "react-router";
export default function Footer() {
  return (
    <>
      <div className="footer-container border border-start-0 border-end-0 d-flex justify-content-center">
        <div className="container row mt-5">
          <div className="col-md-3 p-0 footer-logo">
            <img src={logo} alt="logo" width={148} height={39} />
            <p className="pt-3" style={{ color: "#404040" }}>
              © 2024 Chefaa. All Rights Reserved
            </p>
            <p style={{ color: "#404040" }}>Tax number: 718-859-672</p>
          </div>
          <div className="col-md-3 p-0 about-links">
            <ul>
              <li className="mb-3">
                <Link className="fw-bold">About Us</Link>
              </li>
              <li className="mb-3">
                <Link className="fw-bold">Blog</Link>
              </li>
              <li className="mb-3">
                <Link className="fw-bold">Are You A Pharmacy Owner?</Link>
              </li>
            </ul>
          </div>
          <div className="col-md-3 p-0 privacy-links">
            <ul>
              <li className="mb-3">
                <Link className="fw-bold">Privacy Policy</Link>
              </li>
              <li className="mb-3">
                <Link className="fw-bold">Contact Us</Link>
              </li>
              <li className="mb-3">
                <Link className="fw-bold">Terms & Conditions</Link>
              </li>
            </ul>
          </div>
          <div className="social-media col-md-3 d-flex justify-content-center align-items-center flex-column">
            <h3>Follow Us</h3>
            <div className="social-links d-flex justify-content-between">
              <Link>
                <img
                  className="m-3"
                  src={instagramLogo}
                  alt="instagram-logo"
                  width={60}
                />
              </Link>
              <Link>
                <img
                  className="m-3"
                  src={twitterLogo}
                  alt="twitter-logo"
                  width={60}
                />
              </Link>
              <Link>
                <img
                  className="m-3"
                  src={faceBookLogo}
                  alt="facebook-logo"
                  width={60}
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
