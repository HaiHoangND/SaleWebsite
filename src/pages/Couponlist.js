import React, { useState, useEffect } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

const Couponlist = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    name: "",
    expiry: "",
    discount: "",
  });
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("access_token");
      const response = await axios.get("http://localhost:5000/api/coupon/", {
        headers: {
          Authorization:
            `Bearer ${token}`,
        },
      });
      setData(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onDeleteCoupon = async (id, e) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dữ liệu này không?")) {
      try {
      const token = localStorage.getItem("access_token");
        await axios.delete(`http://localhost:5000/api/coupon/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        fetchData();
      } catch (error) {
        throw new Error(error);
      }
    }
  };
  const handleShowModal = (id, name, expiry, discount) => {
    setUpdateData({
      id,
      name,
      expiry,
      discount,
    });
    setShowModal(true);
  };
  const handleUpdateCoupon = async (e) => {
    const { id, name, expiry, discount } = updateData;
    try {
      const token = localStorage.getItem("access_token");
      await axios.put(
        `http://localhost:5000/api/coupon/${id}`,
        {
          name,
          expiry,
          discount,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      handleCloseModal();
      fetchData();
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleCloseModal = () => setShowModal(false);
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
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => (
              <tr key={value._id}>
                <td>{index + 1}</td>
                <td>{value.name}</td>
                <td>{value.expiry}</td>
                <td>{value.discount}</td>
                <td>
                  <button
                    className="btn btn-success mx-2"
                    onClick={() =>
                      handleShowModal(
                        value._id,
                        value.name,
                        value.expiry,
                        value.discount
                      )
                    }
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-success mx-2"
                    onClick={(e) => onDeleteCoupon(value._id, e)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Coupon</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control mb-4"
                id="name"
                value={updateData.name}
                onChange={(e) =>
                  setUpdateData({ ...updateData, name: e.target.value })
                }
              />
              <label htmlFor="expiry" className="form-label">
                Expiry:
              </label>
              <input
                type="date"
                className="form-control mb-4"
                id="expiry"
                value={updateData.expiry}
                onChange={(e) =>
                  setUpdateData({ ...updateData, expiry: e.target.value })
                }
              />
              <label htmlFor="discount" className="form-label">
                Discount:
              </label>
              <input
                type="number"
                className="form-control mb-4"
                id="discount"
                value={updateData.discount}
                onChange={(e) =>
                  setUpdateData({ ...updateData, discount: e.target.value })
                }
              />
            </div>
          </form>
        </Modal.Body>
        <Modal.Footer>
          <button className="btn btn-secondary" onClick={handleCloseModal}>
            Cancel
          </button>
          <button
            className="btn btn-primary"
            onClick={(e) =>
              handleUpdateCoupon(
                updateData.id,
                updateData.name,
                updateData.expiry,
                updateData.discount,
                e
              )
            }
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Couponlist;
