import React, { useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";
import Cookies from "js-cookie";

const Addproduct = () => {
  const [isLoading, setIsLoading] = useState(false);
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
        const token = JSON.parse(localStorage.getItem("access_token"));
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000; // Chuyển đổi thời gian hiện tại sang đơn vị giây

        if (decodedToken.exp < currentTime) {
          // Token đã hết hạn, xử lý tương ứng (ví dụ: đăng nhập lại)
          Cookies.get("refreshToken");
          const response = await axios.get(
            "http://localhost:5000/api/user/refresh",
            {
              withCredentials: true, // Gửi các cookie cùng với yêu cầu
            }
          );
          const newToken = response.data.accessToken;

          localStorage.setItem("access_token", JSON.stringify(newToken));
          // Tiếp tục sử dụng token mới
          const res = await axios.get("http://localhost:5000/api/brand/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${newToken}`,
            },
          });
          setBrands(res.data);
        } else {
          // Token còn hiệu lực, tiếp tục sử dụng
          const response = await axios.get("http://localhost:5000/api/brand/", {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          setBrands(response.data);
        }
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
        const token = JSON.parse(localStorage.getItem("access_token"));
        const decodedToken = jwt_decode(token);
        const currentTime = Date.now() / 1000; // Chuyển đổi thời gian hiện tại sang đơn vị giây

        if (decodedToken.exp < currentTime) {
          // Token đã hết hạn, xử lý tương ứng (ví dụ: đăng nhập lại)
          Cookies.get("refreshToken");
          const response = await axios.get(
            "http://localhost:5000/api/user/refresh",
            {
              withCredentials: true, // Gửi các cookie cùng với yêu cầu
            }
          );
          const newToken = response.data.accessToken;

          localStorage.setItem("access_token", JSON.stringify(newToken));
          // Tiếp tục sử dụng token mới
          const res = await axios.get(
            "http://localhost:5000/api/prodcategory/",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${newToken}`,
              },
            }
          );
          setCategories(res.data);
        } else {
          // Token còn hiệu lực, tiếp tục sử dụng
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
        }
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
    setIsLoading(true);
    try {
      e.preventDefault();
      const token = JSON.parse(localStorage.getItem("access_token"));

            // Token còn hiệu lực, tiếp tục sử dụng
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
        await axios.post(
          "http://localhost:5000/api/product/",
          formData,
          config
        );
        setMessage("Product created successfully!");
        setData({
          title: "",
          description: "",
          price: "",
          category: "",
          brand: "",
          quantity: "",
          color: "",
        })
    } catch (error) {
      if (error.response && error.response.status === 403) {
        alert("You are not admin. Please login again.");
        window.location.href = "/";
      } else {
        console.error(error);
        setMessage("Error creating brand. Please try again.");
      }
    }
    setIsLoading(false);
  };
  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
      {message && <div className="alert alert-success">{message}</div>}
      <div>
        <form action="">
          <div className="mt-4 mb-3">
            <h4>Title</h4>
            <input
              required={true}
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
                        <h4>Description</h4>
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
          <h4>Price</h4>

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
          <h4>Category</h4>

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
          <h4>Brand</h4>

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
          <h4>Quantity</h4>

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
          <h4>Color</h4>
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
          {
            isLoading ?  <div class="spinner-border" role="status">
            <span class="visually-hidden">Loading...</span>
          </div> : null
          }

         
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
