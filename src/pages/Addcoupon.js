import React, { useState } from "react";
import axios from "axios";
// import CustomInput from "../components/CustomInput";

const Addcoupon = () => {
  const [data, setData] = useState({
    name: "",
    expiry: "",
    discount: "",
  });
  const [message, setMessage] = useState("");
  const handle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };
  const submit = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const formData = {
        name: data.name,
        expiry: data.expiry,
        discount: data.discount,
      };
      await axios.post("http://localhost:5000/api/coupon/", formData, config);
      setMessage("Coupon created successfully!");
    } catch (error) {
      if (error.response.status === 401) {
        // token hết hạn
        setMessage("Not Authorized token expired, Please Login again.");
        // xóa token khỏi localStorage và chuyển hướng đến trang đăng nhập
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        console.error(error);
        setMessage("Error creating coupon. Please try again.");
      }
    }
  };
  return (
    <div>
      <h3 className="mb-4 title">Add Coupon</h3>
      {message && <div className="alert alert-success">{message}</div>}
      <div>
        <form action="">
          {/* <CustomInput type="text" label="Enter Coupon" /> */}
          <label htmlFor="name" style={{ fontSize: "18px" }}>
            Nhập tên của coupon:
          </label>
          <input
            type="text"
            name="name"
            placeholder="Enter Coupon's Name"
            id="name"
            value={data.title}
            onChange={(e) => handle(e)}
            className="form-control form-floating mb-3 mt-2"
            style={{ height: "60px", width: "100%" }}
          />
          <label htmlFor="expiry" style={{ fontSize: "18px" }}>
            Nhập hạn của coupon:
          </label>
          <input
            type="date"
            name="expiry"
            placeholder="Enter Coupon's Expiry"
            id="expiry"
            value={data.title}
            onChange={(e) => handle(e)}
            className="form-control form-floating mb-3 mt-2"
            style={{ height: "60px", width: "100%" }}
          />
          <label htmlFor="discount" style={{ fontSize: "18px" }}>
            Nhập discount của coupon:
          </label>
          <input
            type="number"
            name="discount"
            placeholder="Enter Coupon's Discount"
            id="discount"
            value={data.title}
            onChange={(e) => handle(e)}
            className="form-control form-floating mb-3 mt-2"
            style={{ height: "60px", width: "100%" }}
          />
          <button
            className="btn btn-success border-0 rounded-3 mt-3"
            type="submit"
            onClick={(e) => submit(e)}
          >
            Add Coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcoupon;
