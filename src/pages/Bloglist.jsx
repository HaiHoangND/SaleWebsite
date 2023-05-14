import React, { useEffect, useState } from "react";
import axios from "axios";

const Bloglist = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://localhost:5000/api/blog/", {
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
      <h3 className="mb-4 title">Blogs List</h3>
      <div className="container table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Title</th>
              <th scope="col">Description</th>
              <th scope="col">Category</th>
              <th scope="col">numViews</th>
              <th scope="col">Likes</th>
              <th scope="col">Dislikes</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => (
              <tr key={value._id}>
                <td>{index + 1}</td>
                <td> {value.title} </td>
                <td> {value.description} </td>
                <td> {value.category} </td>
                <td> {value.numViews} </td>
                <td>
                  {value.likes.map((like, index) => (
                    <div key={index}> {like} </div>
                  ))}
                </td>
                <td>
                  {value.dislikes.map((dislike, index) => (
                    <div key={index}> {dislike} </div>
                  ))}
                </td>
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

export default Bloglist;
