import React, { useEffect, useState } from "react";
import axios from "axios";

const Productlist = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/product/", {
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
    <>
      <input type="text" className="search-bar" />

      <div>
        <h3 className="mb-4 title">Products</h3>
        <div className="container table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th scope="col">No.</th>
                <th scope="col">Title</th>
                <th scope="col">Slug</th>
                <th scope="col">Description</th>
                <th scope="col">Price</th>
                <th scope="col">Category</th>
                <th scope="col">Brand</th>
                <th scope="col">Quantity</th>
                <th scope="col">Sold</th>
                <th scope="col">Image</th>
                <th scope="col">Color</th>
                <th scope="col">Ratings</th>
                <th scope="col">Total Rating</th>
                <th scope="col">Created At</th>
                <th scope="col">Updated At</th>
              </tr>
            </thead>
            <tbody>
              {data.map((value, index) => (
                <tr key={value._id}>
                  <td>{index + 1}</td>
                  <td>{value.title}</td>
                  <td>{value.slug}</td>
                  <td>{value.description}</td>
                  <td>{value.price}</td>
                  <td>{value.category}</td>
                  <td>{value.brand}</td>
                  <td>{value.quantity}</td>
                  <td>{value.sold}</td>
                  <td>
                    {value.images.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="Hình ảnh"
                        width="5px"
                        height="5px"
                      />
                    ))}
                  </td>
                  <td>{value.color}</td>
                  <td>
                    {value.ratings.map((rating, index) => (
                      <div key={index}>
                        <p>Star: {rating.star}</p>
                        <p>Comment: {rating.comment}</p>
                        <p>Posted by: {rating.postedby}</p>
                      </div>
                    ))}
                  </td>
                  <td>{value.totalrating}</td>
                  <td>{value.createdAt}</td>
                  <td>{value.updatedAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Productlist;
