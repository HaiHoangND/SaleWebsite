import React, { useState } from "react";
import axios from "axios";

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
      const token = JSON.parse(localStorage.getItem("access_token"));
      if (
        token &&
        token.expirationDate &&
        new Date() > new Date(token.expirationDate)
      ) {
        // Token đã hết hạn, xử lý tương ứng (ví dụ: đăng nhập lại)
        alert("Token is expired, please login again.");
      } else {
        // Token còn hiệu lực, tiếp tục sử dụng
        const config = {
          headers: {
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
      }
    } catch (error) {
      if (error.response.status === 403) {
        alert("You are not admin. Please login again.");
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
