import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
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
          const response = await axios.get(
            "http://localhost:5000/api/user/get-all-orders",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setData(response.data);
        }
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchData();
  }, []);

  const [dataOneProduct, setDataOneProduct] = useState({});
  const fetchDataOneProduct = async (id) => {
    try {
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
        const response = await axios.get(
          `http://localhost:5000/api/product/${id}`
        );
        const productTitle = response.data.title;
        setDataOneProduct((prevData) => ({
          ...prevData,
          [id]: productTitle,
        }));
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    // Gọi fetchDataOneProduct cho từng sản phẩm trong data
    data.forEach((order) => {
      order.products.forEach((product) => {
        fetchDataOneProduct(product.product);
      });
    });
  }, [data]);

  const [dataBuyer, setDataBuyer] = useState({});
  const fetchDataBuyer = async (id) => {
    try {
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
        const response = await axios.get(
          `http://localhost:5000/api/user/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        const nameBuyer = response.data.getaUser.lastname;
        setDataBuyer((prevData) => ({
          ...prevData,
          [id]: nameBuyer,
        }));
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    data.forEach((order) => {
      fetchDataBuyer(order.orderby);
    });
  }, [data]);

  return (
    <div>
      <h3 className="mb-4 title">Orders</h3>
      <div className="container table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Products</th>
              <th scope="col">Payment Intent</th>
              <th scope="col">OrderStatus</th>
              <th scope="col">OrderBy</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => (
              <tr key={value._id}>
                <td>{index + 1}</td>
                <td>
                  {value.products.map((product, index) => (
                    <div key={index}>
                      <p>Product: {dataOneProduct[product.product]}</p>
                      <p>Count: {product.count}</p>
                      <p>Color: {product.color}</p>
                    </div>
                  ))}
                </td>
                <td>{value.paymentIntent.status}</td>
                <td> {value.orderStatus} </td>
                <td> {dataBuyer[value.orderby]} </td>
                <td> {value.createdAt} </td>
                <td> {value.updatedAt} </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Orders;
