import React, { useEffect, useState } from "react";
import axios from "axios";

const Orders = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/get-orders",
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWE2ODk4Yjg3NDk2MjdjMDc4ODE3MCIsImlhdCI6MTY4MzkwMjQxNCwiZXhwIjoxNjgzOTg4ODE0fQ.2Qr4Od4_hHxsRFnVpTWuwhogGFfae5HLZd15SYYeMhI",
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
      <div className="container">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">Products</th>
              <th scope="col">Payment Intent</th>
              <th scope="col">OrderStatus</th>
              <th scope="col">OrderBy</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value) => (
              <tr>
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
