import ChangeTitle from "../../../Components/ChangeTitle";
import "../../../App.css";
import "../../../Pages/Website/Auth/auth.css";
import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { baseURL, LOGIN } from "../../../API/Api";
import Loadingpage from "../../../Components/website/Loadingpage";
import Cookie from "cookie-universal";
import Navbar from "../../../Components/website/Navbar";
import Footer from "../../../Components/website/Footer";


export default function Login() {
  ChangeTitle("login");
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  //  const [user, setUser] = useState();
  //  const Navigate = useNavigate();
  //  useEffect(() => {
  //    Axios.get(`/${USER}`)
  //      .then((data) => setUser(data.data))
  //      .catch(() => Navigate("/login"));
  //  }, []);
  //  console.log(user);

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

  async function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post(`${baseURL}/${LOGIN}`, form);
      const token = res.data.token;

      cookie.set("chefaa", token); 
      cookie.set("chefaa_name", res.data.user.name); 

      if (res.status === 200 && res.data.user.role === "1995") {
        window.location.replace("/dashboard/users");
      } else if (res.status === 200 && res.data.user.role === "1991") {
        window.location.replace("/dashboard/writer");
      } else if (
        res.status === 200 &&
        (res.data.user.role === "2001" || !res.data.user.role)
      ) {
        window.location.replace("/");
      } else if (res.status === 200) {
        window.location.replace("/403");
      }
    } catch (err) {
      setLoading(false);
      if (err.response && err.response.status === 401) {
        setErr("Invalid Email or Password");
      } else {
        setErr("An unexpected error occurred. Please try again later.");
      }
    }
  }

  return (
    <>
      {loading && <Loadingpage />}
      <div className="register" style={{ height: "100vh" }}>
        <div className="register-nav border border-end-0 border-start-0 border-top-0">
          <div className="container">
            <Navbar />
          </div>
        </div>
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
              Welcome To chefaa
            </h2>
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
                required
                ref={focus}
                value={form.email}
                onChange={handleChange}
              />
            </div>
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
                required
                minLength={8}
                value={form.password}
                onChange={handleChange}
              />
            </div>
            <div className="sign-up d-flex justify-content-center flex-column">
              <button
                type="submit"
                className="btn btn-primary border-0"
                style={{ background: "var(--light-green)", width: "100%" }}
              >
                Login
              </button>
            </div>
            {err !== "" && <span className="error">{err}</span>}
          </form>
        </div>
        <Footer />
      </div>
    </>
  );
}
