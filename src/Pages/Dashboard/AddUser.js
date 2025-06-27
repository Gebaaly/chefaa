import {  useEffect, useRef, useState } from "react";
import { Axios } from "../../API/Axios";
import { USER } from "../../API/Api";
import Loadingpage from "../../Components/website/Loadingpage";

export default function AddUser() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // 'role' is used to store the role of the current user
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");

  // 'loading' is used to indicate if the form submission is in progress
  // This is useful for showing a loading spinner or disabling the submit button
  const [loading, setLoading] = useState(false);

   const focus = useRef();
   useEffect(() => {
     focus.current.focus();
   }, []);

  async function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    try {
      const res = await Axios.post(`${USER}/add`, {
        name: name,
        email: email,
        role: role,
        password: password,
      });
      window.location.assign("/dashboard/users");
    } catch (err) {
      setLoading(false);
      console.log(err);
    }
  }
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="border p-3 rounded "
        style={{ width: "80%", margin: "auto" }}
      >
        {loading && <Loadingpage />}
        <h2 className="text-center fs-2" style={{ color: "#404040" }}>
          Add User
        </h2>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            Name
          </label>
          <input
            type="name"
            className="form-control"
            id="name"
            name="name"
            placeholder="Enter Your Name"
            required
            ref={focus}
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="role" className="form-label">
            Role
          </label>
          <select
            className="form-select"
            id="role"
            name="role"
            required
            value={role}
            onChange={(e) => setRole(e.target.value)}
          >
            <option disabled value="">
              Select Role
            </option>
            <option value="1995">Admin</option>
            <option value="2001">User</option>
            <option value="1991">Writer</option>
            <option value="1999">Product Manager</option>
          </select>
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
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="sign-up d-flex justify-content-center flex-column">
          <button
            disabled={
              !(
                name.length > 1 &&
                email.length > 1 &&
                password.length > 8 &&
                role !== ""
              )
            }
            type="submit"
            className="btn btn-primary border-0 "
            style={{ background: "var(--dashBtn)", width: "100%" }}
          >
            Add
          </button>
        </div>
      </form>
    </>
  );
}
