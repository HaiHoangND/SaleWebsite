import React, { useState } from "react";
import axios from "axios";

const Addbrand = () => {
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
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const formData = {
        title: data.title,
      };
      const response = await axios.post(
        "http://localhost:5000/api/brand/",
        formData,
        config
      );
      console.log(response);
      setMessage("Brand created successfully!");
      var _title = document.getElementById("title").value;
      console.log(_title);
    } catch (error) {
      if (error.response.status === 403) {
        alert("You are not admin. Please login again.");
        window.location.href = "/";
      } else {
        console.error(error);
        setMessage("Error creating brand. Please try again.");
      }
    }
  };
  return (
    <div>
      <h3 className="mb-4 title">Add Brand</h3>
      {message && <div className="alert alert-success">{message}</div>}
      <div>
        <form action="">
          {/* <CustomInput type="text" label="Enter Brand" /> */}
          <input
            type="text"
            name="title"
            placeholder="Enter Brand"
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
            Add Brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
