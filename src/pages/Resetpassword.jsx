import React, { useState } from "react";
import axios from "axios";
// import CustomInput from "../components/CustomInput";

const Resetpassword = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRePassword] = useState("");

  const submit = async (e) => {
    try {
      e.preventDefault();
      const token = await axios.post(
        "http://localhost:5000/api/user/forgot-password",
        {
          email: email,
        }
      );
      await axios.put(
        `http://localhost:5000/api/user/reset-password/${token.data}`,
        {
          email: email,
          password: password,
          repassword: repassword,
        }
      );
      var _password = document.getElementById("pass").value;
      var _repassword = document.getElementById("repass").value;

      if (_password === _repassword) {
        alert("Reset Password Successfully!");
      } else {
        alert("Password and confirm password must be the same!");
      }
    } catch (error) {
      throw new Error(error);
    }
  };

  return (
    <div className="py-5" style={{ background: "#ffd333", minHeight: "100vh" }}>
      <br />
      <br />
      <br />
      <div className="my-5 w-25 bg-white rounded-3 mx-auto p-4">
        <h3 className="text-center title"> Reset Password</h3>
        <p className="text-center">Please Enter your new password.</p>
        <form action="">
          {/* <CustomInput type="password" label="New Password" id="pass" />
          <CustomInput type="password" label="Confirm Password" id="confirmpass" /> */}
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
          <input
            type="password"
            name="repassword"
            placeholder="Comfirm Password"
            id="repass"
            value={repassword}
            onChange={(e) => setRePassword(e.target.value)}
            className="form-control form-floating mt-3"
          />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 mt-3"
            style={{ background: "#ffd333" }}
            type="submit"
            onClick={(e) => submit(e)}
          >
            Reset Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default Resetpassword;
