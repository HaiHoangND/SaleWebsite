import React, { useEffect, useState } from "react";
import axios from "axios";

const Customers = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/user/all-users",
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
      <h3 className="mb-4 title">Customers</h3>
      <div className="container">
        <table className="table table-bordered">
          <thead className="table-dark">
            <tr>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Address</th>
              <th scope="col">Role</th>
              <th scope="col">isBlocked</th>
              <th scope="col">Cart</th>
              <th scope="col">WishList</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value) => (
              <tr>
                <td>{value.firstname}</td>
                <td>{value.lastname}</td>
                <td>{value.email}</td>
                <td>{value.mobile}</td>
                <td>{value.address}</td>
                <td>{value.role}</td>
                <td>{value.isBlocked}</td>
                <td>
                  {value.cart.map((cart, index) => (
                    <div key={index}>
                      <p>{cart}</p>
                    </div>
                  ))}
                </td>
                <td>
                  {value.wishlist.map((wishlist, index) => (
                    <div key={index}>
                      <p>{wishlist}</p>
                    </div>
                  ))}
                </td>
                <td>{value.createdAt}</td>
                <td>{value.updatedAt}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
