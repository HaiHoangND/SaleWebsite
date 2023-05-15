import React, { useState, useEffect } from "react";
import axios from "axios";
import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";

const { Dragger } = Upload;
const props = {
  name: "file",
  multiple: true,
  action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};
const Addblog = () => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
  });
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/blogcategory/"
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);
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
        category: data.category,
        description: data.description,
      };
      await axios.post("http://localhost:5000/api/blog/", formData, config);
      setMessage("Blog created successfully!");
    } catch (error) {
      if (error.response.status === 401) {
        // token hết hạn
        setMessage("Not Authorized token expired, Please Login again.");
        // xóa token khỏi localStorage và chuyển hướng đến trang đăng nhập
        localStorage.removeItem("token");
        window.location.href = "/";
      } else {
        console.error(error);
        setMessage("Error creating blog. Please try again.");
      }
    }
  };
  return (
    <div>
      <h3 className="mb-4 title">Add Blog</h3>
      {message && <div className="alert alert-success">{message}</div>}
      <div>
        <form action="">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
          <div className="mt-4 mb-3">
            <input
              type="text"
              name="title"
              placeholder="Enter Blog Title"
              id="title"
              value={data.title}
              onChange={(e) => handle(e)}
              className="form-control form-floating mt-3"
              style={{ height: "60px", width: "100%" }}
            />
          </div>
          <select
            name="category"
            className="form-control py-3 mb-3"
            id="category"
            value={data.category}
            onChange={(e) => handle(e)}
          >
            <option value="">Select Blog Category</option>
            {categories.map((category) => (
              <option key={category._id}>{category.title}</option>
            ))}
          </select>
          <div>
            <input
              type="text"
              name="description"
              placeholder="Enter Blog Description"
              id="description"
              value={data.description}
              onChange={(e) => handle(e)}
              className="form-control form-floating mt-3"
              style={{ height: "60px", width: "100%" }}
            />
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
            onClick={(e) => submit(e)}
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
