import React, { useState, useEffect } from "react";
import axios from "axios";

const Couponlist = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/coupon/", {
          headers: {
            Authorization:
              // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWE2ODk4Yjg3NDk2MjdjMDc4ODE3MCIsImlhdCI6MTY4MzkwMjQxNCwiZXhwIjoxNjgzOTg4ODE0fQ.2Qr4Od4_hHxsRFnVpTWuwhogGFfae5HLZd15SYYeMhI",
              `Bearer ${token}`,
          },
        });
        setData(response.data);
      } catch (error) {
        throw new Error(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <h3 className="mb-4 title">Coupons List</h3>
      <div className="container table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Name</th>
              <th scope="col">Expiry</th>
              <th scope="col">Discount</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => (
              <tr key={value._id}>
                <td>{index + 1}</td>
                <td>{value.name}</td>
                <td>{value.expiry}</td>
                <td>{value.discount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Couponlist;
