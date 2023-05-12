import React, { useState } from "react";
import axios from "axios";
// import CustomInput from "../components/CustomInput";

const Forgotpassword = () => {
  const [email, setEmail] = useState("");

  function isValidEmail(email) {
    var regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  }

  const submit = async (e) => {
    try {
      e.preventDefault();
      await axios.post("http://localhost:5000/api/user/forgot-password", {
        email: email,
      });

      var _email = document.getElementById("email").value;

      if (isValidEmail(_email)) {
        alert(
          "Password reset request has been sent successfully. Please check your email."
        );
      } else {
        alert("Email address incorrectly!");
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
        <h3 className="text-center title">Forgot Password</h3>
        <p className="text-center">
          Please Enter your register email to get reset password mail.
        </p>
        <form action="">
          {/* <CustomInput type="password" label="Email Address" id="email" /> */}
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="form-control form-floating mt-3"
          />
          <button
            className="border-0 px-3 py-2 text-white fw-bold w-100 mt-3"
            style={{ background: "#ffd333" }}
            type="submit"
            onClick={(e) => submit(e)}
          >
            Send Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default Forgotpassword;
