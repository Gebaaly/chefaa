import ChangeTitle from "../../../Components/ChangeTitle";
import "../../../App.css";
import "../../../Pages/Website/Auth/auth.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseURL, REGISTER } from "../../../API/Api";
import Loadingpage from "../../../Components/website/Loadingpage";
import Cookie from "cookie-universal";
import Footer from "../../../Components/website/Footer";
import Navbar from "../../../Components/website/Navbar";
import { useNavigate } from "react-router-dom";
export default function Register() {
  ChangeTitle("sign up");
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    passwordR: "",
  });
  const [err, setErr] = useState("");
  const [loading, setLoading] = useState(false);
  const cookie = Cookie();

  
    const focus = useRef();
    useEffect(() => {
      focus.current.focus();
    }, []);
  function handleChange(e) {
    e.preventDefault();
    setForm({ ...form, [e.target.name]: e.target.value });
  }
  console.log(form);
  // Handle Submit
  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${baseURL}/${REGISTER}`, form);
      const token = res.data.token;
      cookie.set("chefaa", token);
      setLoading(false);

      navigate("/");
    } catch (err) {
      setLoading(false);

      if (err.response.status === 422) {
        setErr("Email Has Already Been Taken");
      } else {
        setErr("Internal Server Error");
      }
    }
  }
  return (
    <>
      {loading && <Loadingpage />}
      <div className="register" style={{ height: "100vh" }}>
        <Navbar />
        <div
          className="register-form d-flex justify-content-center align-items-center"
          style={{ height: "100vh" }}
        >
          <form
            onSubmit={handleSubmit}
            className="border p-3 rounded"
            style={{ width: "50%" }}
          >
            <h2 className="text-center fs-2" style={{ color: "#404040" }}>
              Welcome To Chefaa
            </h2>
            {/* Name Field */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                placeholder="Enter Your Name"
                value={form.name}
                ref={focus}
                onChange={handleChange}
                required
              />
            </div>
            {/* Email Field */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email address
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                name="email"
                placeholder="Enter Your Email"
                value={form.email}
                onChange={handleChange}
                required
                pattern="[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}"
                title="Please enter a valid email address (e.g., user@example.com)"
              />
            </div>
            {/* Password Field */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label">
                Password
              </label>
              <input
                type="password"
                className="form-control"
                id="password"
                name="password"
                placeholder="Enter Your Password"
                value={form.password}
                onChange={handleChange}
                required
                minLength="8"
                pattern="^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*[0-9]).{8,}$"
                title="Password must be at least 8 characters long, contain at least one uppercase letter, one special character, and one number."
              />
            </div>
            {/* Repeat Password Field */}
            <div className="mb-3">
              <label htmlFor="passwordR" className="form-label">
                Repeat Password
              </label>
              <input
                type="password"
                className="form-control"
                id="passwordR"
                name="passwordR"
                placeholder="Repeat Your Password"
                value={form.passwordR}
                onChange={handleChange}
                required
              />
            </div>
            {/* Submit Button */}
            <div className="sign-up d-flex justify-content-center flex-column">
              <button
                type="submit"
                className="btn btn-primary border-0"
                style={{ background: "var(--light-green)", width: "100%" }}
              >
                Sign up
              </button>
            </div>
            {err !== "" && <span className="error">{err}</span>}
          </form>
        </div>
        {/* Footer Section */}
        <Footer />
      </div>
    </>
  );
}
