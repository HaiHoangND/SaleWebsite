import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
// import { useDispatch } from "react-redux";
// import { loginUser } from "../redux/apiRequest";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const dispatch = useDispatch();
  // const navigate = useNavigate();

  const submit = async (e) => {
    try {
      e.preventDefault();
      // const newUser = {
      //   email: email,
      //   password: password,
      // };
      // loginUser(newUser, dispatch, navigate);
      const response = await axios.post(
        "http://localhost:5000/api/user/login",
        {
          email: email,
          password: password,
        }
      );
      var _email = document.getElementById("email").value;
      var _password = document.getElementById("pass").value;
      if (response.data?.token) {
        document.cookie = `access_token=${response.data.token}`;
        if (_email === "admin@gmail.com" && _password === "admin") {
          window.location.href = "http://localhost:4000/admin";
        } else alert("You are not admin!");
      } else {
        alert(response.data.data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title">Login</h3>
        <p className="text-center">Login to your account to continue.</p>
        <form action="">
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control form-floating mt-3"
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            id="pass"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="form-control form-floating mt-3"
          />
          <div className="mb-3 mt-1 text-end">
            <Link to="forgot-password" className="">
              Forgot Password?
            </Link>
          </div>
          <div className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5">
            <button
              className="border-0 px-3 py-2 text-white fw-bold w-100 text-center text-decoration-none fs-5"
              type="submit"
              style={{ background: "#ffd333" }}
              onClick={(e) => submit(e)}
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
