import React, { useState, useEffect } from "react";
import axios from "axios";
// import { InboxOutlined } from "@ant-design/icons";
// import { message, Upload } from "antd";

// const { Dragger } = Upload;
// const props = {
//   name: "file",
//   multiple: true,
//   action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
//   onChange(info) {
//     const { status } = info.file;
//     if (status !== "uploading") {
//       console.log(info.file, info.fileList);
//     }
//     if (status === "done") {
//       message.success(`${info.file.name} file uploaded successfully.`);
//     } else if (status === "error") {
//       message.error(`${info.file.name} file upload failed.`);
//     }
//   },
//   onDrop(e) {
//     console.log("Dropped files", e.dataTransfer.files);
//   },
// };
const Addproduct = () => {
  const [message, setMessage] = useState("");
  const [data, setData] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    brand: "",
    quantity: "",
    color: "",
  });
  const [brands, setBrands] = useState([]);
  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get("http://localhost:5000/api/brand/", {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        setBrands(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchBrands();
  }, []);
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(
          "http://localhost:5000/api/prodcategory/",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
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
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const formData = {
        title: data.title,
        description: data.description,
        price: data.price,
        category: data.category,
        brand: data.brand,
        quantity: data.quantity,
        color: data.color,
      };
      await axios.post("http://localhost:5000/api/product/", formData, config);
      setMessage("Product created successfully!");
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
      <h3 className="mb-4 title">Add Product</h3>
      {message && <div className="alert alert-success">{message}</div>}
      <div>
        <form action="">
          <div className="mt-4 mb-3">
            <input
              type="text"
              name="title"
              placeholder="Enter Product Title"
              id="title"
              value={data.title}
              onChange={(e) => handle(e)}
              className="form-control form-floating mt-3"
              style={{ height: "60px", width: "100%" }}
            />
          </div>
          <div>
            <input
              type="text"
              name="description"
              placeholder="Enter Product Description"
              id="description"
              value={data.description}
              onChange={(e) => handle(e)}
              className="form-control form-floating mt-3"
              style={{ height: "60px", width: "100%" }}
            />
          </div>
          <div className="mt-4 mb-3">
            <input
              type="number"
              name="price"
              placeholder="Enter Product Price"
              id="price"
              value={data.price}
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
            <option value="">Select Category</option>
            {categories.map((category) => (
              <option key={category._id}>{category.title}</option>
            ))}
          </select>
          <select
            name="brand"
            className="form-control py-3 mb-3"
            id="brand"
            value={data.brand}
            onChange={(e) => handle(e)}
          >
            <option value="">Select Brand</option>
            {brands.map((brand) => (
              <option key={brand._id}>{brand.title}</option>
            ))}
          </select>
          <div className="mt-4 mb-3">
            <input
              type="number"
              name="quantity"
              placeholder="Enter Product Quantity"
              id="quantity"
              value={data.quantity}
              onChange={(e) => handle(e)}
              className="form-control form-floating mt-3"
              style={{ height: "60px", width: "100%" }}
            />
          </div>
          <select
            name="color"
            className="form-control py-3 mb-3"
            id="color"
            value={data.color}
            onChange={(e) => handle(e)}
          >
            <option value="">Select Color</option>
            <option value="Xanh">Xanh</option>
            <option value="Đỏ">Đỏ</option>
            <option value="Tím">Tím</option>
            <option value="Vàng">Vàng</option>
            <option value="Lam">Lam</option>
            <option value="Tràm">Tràm</option>
            <option value="Lục">Lục</option>
          </select>
          {/* <div className="mt-3">
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
          </div> */}

          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
            onClick={(e) => submit(e)}
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
