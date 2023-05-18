import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          "http://localhost:5000/api/user/get-orders",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setData(response.data);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchData();
  }, []);
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
                      <p>Product: {product.product}</p>
                      <p>Count: {product.count}</p>
                      <p>Color: {product.color}</p>
                    </div>
                  ))}
                </td>
                <td>{value.paymentIntent.status}</td>
                <td> {value.orderStatus} </td>
                <td> {value.orderby} </td>
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
