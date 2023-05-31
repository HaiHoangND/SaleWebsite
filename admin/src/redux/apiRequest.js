import axios from "axios";
import {
  logOutFailed,
  logOutStart,
  logOutSuccess,
  loginFailed,
  loginStart,
  loginSuccess,
} from "./authSlice";

export const loginUser = async (user, dispatch, navigate) => {
  dispatch(loginStart());
  try {
    const res = await axios.post(
      "http://localhost:5000/api/user/admin-login",
      user
    );
    dispatch(loginSuccess(res.data));
    if (user.email === "admin@gmail.com" && user.password === "admin") {
      navigate("/admin");
    } else {
      alert("Invalid Credentials!");
    }
  } catch (error) {
    dispatch(loginFailed());
  }
};

export const logOut = async (dispatch, navigate, token) => {
  dispatch(logOutStart());
  try {
    const token = localStorage.getItem("access_token");
    const res = await axios.post("http://localhost:5000/api/user/logout", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    dispatch(logOutSuccess(res.data));
    navigate("/");
  } catch (error) {
    dispatch(logOutFailed());
  }
};
