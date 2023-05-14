import React, { useState } from "react";
import axios from "axios";
// import CustomInput from "../components/CustomInput";

const Addcat = () => {
  const [data, setData] = useState({
    title: "",
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
      const token = localStorage.getItem("token");
      const config = {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      };
      const formData = {
        title: data.title,
      };
      await axios.post(
        "http://localhost:5000/api/prodcategory/",
        formData,
        config
      )
      setMessage("Product Category created successfully!");
    } catch (error) {
      if (error.response.status === 401) {
        // token hết hạn
        setMessage("Not Authorized token expired, Please Login again.");
        // xóa token khỏi localStorage và chuyển hướng đến trang đăng nhập
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        console.error(error);
        setMessage("Error creating product category. Please try again.");
      }
    }
  };
  return (
    <div>
      <h3 className="mb-4 title">Add Category</h3>
      {message && <div className="alert alert-success">{message}</div>}
      <div>
        <form action="">
          {/* <CustomInput type="text" label="Enter Category" /> */}
          <input
            type="text"
            name="title"
            placeholder="Enter Category"
            id="title"
            value={data.title}
            onChange={(e) => handle(e)}
            className="form-control form-floating mt-3"
            style={{ height: "60px", width: "100%" }}
          />
          <button
            className="btn btn-success border-0 rounded-3 mt-5"
            type="submit"
            onClick={(e) => submit(e)}
          >
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
