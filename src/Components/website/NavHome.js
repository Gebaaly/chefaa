import { Link } from "react-router-dom";
import logo from "../../assets/chefaa-en.webp";
import "../../CSS/components/home.css";
import { useEffect, useState } from "react";
import { Axios } from "../../API/Axios";
import { CAT, USER } from "../../API/Api";
import { handleLogout } from "../../Pages/Website/Auth/LogoutFunction";
import Cookie from "cookie-universal";

const MAIN_CATEGORIES = [
  "Medications",
  "Hair Care",
  "Skin Care",
  "Daily Essentials",
  "Mom & Baby",
  "Makeup & Accessories",
  "Health Care Devices",
  "Vitamins & Supplements",
  "Sexual Wellness",
];
const CATEGORY_DISTRIBUTION = [8, 4, 7, 6, 5, 5, 8, 3, 3];

export default function NavHome() {
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(null);
  const [distributedCategories, setDistributedCategories] = useState([]);
  const [name, setName] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
const [cartCount, setCartCount] = useState(0);

useEffect(() => {
  const updateCartCount = () => {
    const items = JSON.parse(localStorage.getItem("cartItems")) || [];
    const totalQuantity = items.reduce(
      (sum, item) => sum + (item.quantity || 1),
      0
    );
    setCartCount(totalQuantity);
  };

  updateCartCount();

  // ✅ بدل "storage" بخاصتنا "cart-updated"
  window.addEventListener("cart-updated", updateCartCount);

  return () => window.removeEventListener("cart-updated", updateCartCount);
}, []);


  const cookie = Cookie();
  useEffect(() => {
    const token = cookie.get("chefaa");
    const cachedName = cookie.get("chefaa_name");
    if (token) {
      setIsLoggedIn(true);
      if (cachedName) setName(cachedName);

      Axios.get(`/${USER}`)
        .then((res) => {
          setName(res.data.name);
          cookie.set("chefaa_name", res.data.name); 
        })
        .catch(() => {
          cookie.remove("chefaa");
          cookie.remove("chefaa_name");
          setIsLoggedIn(false);
        });
    }
  }, []);


  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await Axios.get(CAT);
        const allCategories = response.data.data || response.data;
        // Distribute categories according to CATEGORY_DISTRIBUTION
        let start = 0;
        const distributed = CATEGORY_DISTRIBUTION.map((count) => {
          const group = allCategories.slice(start, start + count);
          start += count;
          return group;
        });
        setDistributedCategories(distributed);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const toggleCategory = (categoryIndex) => {
    setIsCategoryOpen(isCategoryOpen === categoryIndex ? null : categoryIndex);
  };
  function slugify(text) {
    return decodeURIComponent(text)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-") 
      .replace(/^-+|-+$/g, "");
  }
  

  return (
    <>
      {/* Sticky Top Navbar */}
      <nav className="navbar navbar-expand-lg bg-white shadow-sm py-3 mb-0 sticky-top border-bottom">
        <div className="container d-flex justify-content-between align-items-center">
          {/* Logo */}
          <Link to="/" className="navbar-brand me-4">
            <img src={logo} alt="Chefaa" width={140} height={38} />
          </Link>

          {/* Search Bar - always visible */}
          <div className="flex-grow-1 mx-4 w-100" style={{ maxWidth: 500 }}>
            <div className="position-relative">
              <input
                type="text"
                className="form-control rounded-pill border-2 border-light bg-light"
                placeholder="Search by Medicine Name"
                style={{
                  paddingLeft: "45px",
                  paddingRight: "20px",
                  height: "45px",
                }}
              />
              <div className="position-absolute top-50 start-0 translate-middle-y ms-3">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 21L16.514 16.506L21 21ZM19 10.5C19 15.194 15.194 19 10.5 19C5.806 19 2 15.194 2 10.5C2 5.806 5.806 2 10.5 2C15.194 2 19 5.806 19 10.5Z"
                    stroke="#6c757d"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
            </div>
          </div>

          {/* Mobile Toggler */}
          <button
            className="navbar-toggler border-0 d-lg-none ms-2"
            type="button"
            onClick={toggleNav}
            aria-expanded={isNavOpen}
            aria-label="Toggle navigation"
          >
            <div className={`hamburger ${isNavOpen ? "active" : ""}`}>
              <span></span>
              <span></span>
              <span></span>
            </div>
          </button>

          {/* Desktop Nav Items */}
          <div className="d-none d-lg-flex align-items-center gap-3 flex-nowrap ms-4">
            {isLoggedIn ? (
              <>
                {/* User Dropdown */}
                <div
                  className="dropdown d-flex align-items-center"
                  style={{ height: "100%" }}
                >
                  <button
                    className="btn btn-link text-decoration-none text-dark fw-medium d-flex align-items-center gap-2 px-2 py-1"
                    type="button"
                    id="userDropdown"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                    style={{
                      border: "none",
                      background: "transparent",
                      boxShadow: "none",
                      height: "38px",
                      lineHeight: "1",
                      fontSize: "1rem",
                      minWidth: "120px",
                    }}
                  >
                    <span
                      className="fw-semibold"
                      style={{ whiteSpace: "nowrap" }}
                    >
                      Hello
                      {name && name.length > 12
                        ? ` ${name.slice(0, 12)}...`
                        : ` ${name}`}
                    </span>
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      style={{ marginLeft: "4px" }}
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end shadow"
                    aria-labelledby="userDropdown"
                    style={{
                      minWidth: "160px",
                      borderRadius: "8px",
                      marginTop: "8px",
                      fontSize: "1rem",
                    }}
                  >
                    <li>
                      <Link to="/profile" className="dropdown-item py-2">
                        Profile
                      </Link>
                    </li>
                    <li>
                      <Link to="/settings" className="dropdown-item py-2">
                        Settings
                      </Link>
                    </li>
                    <li>
                      <Link
                        to="/login"
                        onClick={handleLogout}
                        className="dropdown-item py-2 text-danger"
                      >
                        Logout
                      </Link>
                    </li>
                  </ul>
                </div>
              </>
            ) : (
              <>
                <div className="border-end pe-3">
                  <Link
                    to="/login"
                    className="btn btn-link text-decoration-none text-dark fw-medium d-flex align-items-center gap-2"
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <span className="d-none d-md-inline">Login</span>
                  </Link>
                </div>
              </>
            )}

            {/* Language Toggle */}
            <div className="border-end pe-3">
              <button className="btn btn-link text-decoration-none text-dark fw-medium">
                العربية
              </button>
            </div>

            {/* Cart */}
            <div>
              <Link
                to="/cart"
                className="btn btn-link text-decoration-none text-dark fw-medium d-flex align-items-center gap-2 position-relative"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 22C9.55228 22 10 21.5523 10 21C10 20.4477 9.55228 20 9 20C8.44772 20 8 20.4477 8 21C8 21.5523 8.44772 22 9 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M20 22C20.5523 22 21 21.5523 21 21C21 20.4477 20.5523 20 20 20C19.4477 20 19 20.4477 19 21C19 21.5523 19.4477 22 20 22Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M1 1H5L7.68 14.39C7.77144 14.8504 8.02191 15.264 8.38755 15.5583C8.75318 15.8526 9.2107 16.009 9.68 16H19.4C19.8693 16.009 20.3268 15.8526 20.6925 15.5583C21.0581 15.264 21.3086 14.8504 21.4 14.39L23 6H6"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                {cartCount > 0 && (
                  <span className="badge-count">{cartCount}</span>
                )}

                <span className="d-none d-md-inline">Cart</span>
              </Link>
            </div>
          </div>
        </div>
        {/* Mobile Nav Items (collapsible) */}
        <div
          className={`mobile-nav bg-white shadow-sm d-lg-none w-100 px-3 pt-3 pb-2 ${
            isNavOpen ? "show" : "collapse"
          }`}
          style={{ position: "absolute", top: "100%", left: 0, zIndex: 1050 }}
        >
          <div className="d-flex flex-column gap-2">
            {name ? (
              <>
                <div className="d-flex align-items-center justify-content-between">
                  <p className="fw-semibold fs-6 mb-0">
                    Hello{" "}
                    {name && name.length > 15
                      ? `${name.slice(0, 15)}...`
                      : name}
                  </p>
                  <button
                    className="btn btn-link text-decoration-none text-dark fw-medium"
                    onClick={handleLogout}
                  >
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link
                to="/login"
                className="btn btn-link text-decoration-none text-dark fw-medium d-flex align-items-center gap-2"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span>Login</span>
              </Link>
            )}
            <button className="btn btn-link text-decoration-none text-dark fw-medium text-start">
              العربية
            </button>

            <Link
              to="/cart"
              className="btn btn-link text-decoration-none text-dark fw-medium d-flex align-items-center gap-2"
            >
              <span>Cart</span>
              <span>({cartCount})</span>
            </Link>
            {/* Mobile Categories */}
            <div className="mobile-categories mt-2">
              <h6 className="text-muted mb-2 px-1">Categories</h6>
              {MAIN_CATEGORIES.map((mainCat, idx) => (
                <div key={mainCat} className="mobile-category-item">
                  <button
                    className="mobile-category-btn w-100 text-start d-flex align-items-center justify-content-between py-2 px-2 border-0 bg-transparent"
                    onClick={() => toggleCategory(idx)}
                  >
                    {mainCat}
                    <svg
                      className={`mobile-arrow ms-2 ${
                        isCategoryOpen === idx ? "rotated" : ""
                      }`}
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                    >
                      <path
                        d="M6 9L12 15L18 9"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                  <div
                    className={`mobile-subcategories ps-4 ${
                      isCategoryOpen === idx ? "show" : ""
                    }`}
                    style={{
                      display: isCategoryOpen === idx ? "block" : "none",
                    }}
                  >
                    {distributedCategories[idx] &&
                      distributedCategories[idx].map((subcat) => (
                        <Link
                          key={subcat.id}
                          to={`/categories/${slugify(subcat.title)}`}
                          className="mobile-subcategory-item d-block py-1 text-decoration-none "
                        >
                          {subcat.title}
                        </Link>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Bottom Categories Section (scrolls normally) */}
      <div className="category-bar bg-white border-bottom d-none d-lg-block">
        <div className="container category-list d-flex justify-content-between align-items-stretch py-2">
          {MAIN_CATEGORIES.map((mainCat, idx) => (
            <div
              key={mainCat}
              className="category-item position-relative category-with-dropdown"
            >
              <span
                className="text-decoration-none text-dark fw-semibold px-2"
                style={{ cursor: "pointer" }}
              >
                {mainCat}
              </span>
              {/* Dropdown for subcategories */}
              {distributedCategories[idx] &&
                distributedCategories[idx].length > 0 && (
                  <ul className="subcategory-dropdown position-absolute bg-white shadow rounded py-2 px-2 mt-2">
                    {distributedCategories[idx].map((subcat) => (
                      <li
                        key={subcat.id}
                        className="subcategory-item list-unstyled"
                      >
                        <Link
                          to={`/categories/${slugify(subcat.title)}`}
                          className="subcategory-link text-decoration-none  d-block px-2 py-1"
                        >
                          {subcat.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
