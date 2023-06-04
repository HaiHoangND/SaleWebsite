import React, { useEffect, useState } from "react";
import axios from "axios";
import { MdDeleteForever } from "react-icons/md";

const Customers = () => {
  const [data, setData] = useState([]);
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
          "http://localhost:5000/api/user/all-users",
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
  useEffect(() => {
    fetchData();
  }, []);
  const onDeleteUser = async (id, e) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa người dùng này không?")) {
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
          await axios.delete(`http://localhost:5000/api/user/${id}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          fetchData();
        }
      } catch (error) {
        throw new Error(error);
      }
    }
  };
  return (
    <div>
      <h3 className="mb-4 title">Customers</h3>
      <div className="container table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Email</th>
              <th scope="col">Mobile</th>
              <th scope="col">Address</th>
              <th scope="col">Role</th>
              <th scope="col">isBlocked</th>
              <th scope="col">WishList</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => (
              <tr key={value._id}>
                <td>{index + 1}</td>
                <td>{value.firstname}</td>
                <td>{value.lastname}</td>
                <td>{value.email}</td>
                <td>{value.mobile}</td>
                <td>{value.address}</td>
                <td>{value.role}</td>
                <td>{value.isBlocked}</td>
                <td>
                  {value.wishlist.map((wishlist, index) => (
                    <div key={index}>
                      <p>{wishlist}</p>
                    </div>
                  ))}
                </td>
                <td>{value.createdAt}</td>
                <td>{value.updatedAt}</td>
                <td>
                  <button
                    className="btn btn-success mx-2"
                    onClick={(e) => onDeleteUser(value._id, e)}
                  >
                    <MdDeleteForever className="mb-1 mr-2 fs-5" />
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Customers;
