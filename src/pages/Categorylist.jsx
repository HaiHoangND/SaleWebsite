import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal } from "react-bootstrap";

const Categorylist = () => {
  const [data, setData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [updateData, setUpdateData] = useState({
    id: "",
    title: "",
  });
  const fetchData = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/prodcategory/",
        {
          headers: {
            Authorization:
              // "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0NWE2ODk4Yjg3NDk2MjdjMDc4ODE3MCIsImlhdCI6MTY4MzkwMjQxNCwiZXhwIjoxNjgzOTg4ODE0fQ.2Qr4Od4_hHxsRFnVpTWuwhogGFfae5HLZd15SYYeMhI",
              `Bearer ${token}`,
          },
        }
      );
      setData(response.data);
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);
  const onDeleteProdCategory = async (id, e) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa dữ liệu này không?")) {
      try {
        await axios.delete(`http://localhost:5000/api/prodcategory/${id}`);
        fetchData();
      } catch (error) {
        throw new Error(error);
      }
    }
  };
  const handleShowModal = (id, title) => {
    setUpdateData({
      id,
      title,
    });
    setShowModal(true);
  };
  const handleUpdateProdCategory = async (e) => {
    const { id, title } = updateData;
    try {
      await axios.put(`http://localhost:5000/api/prodcategory/${id}`, { title });
      handleCloseModal();
      fetchData();
    } catch (error) {
      throw new Error(error);
    }
  };
  const handleCloseModal = () => setShowModal(false);
  return (
    <div>
      <h3 className="mb-4 title">Product Categories</h3>
      <div className="container table-responsive">
        <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th scope="col">No.</th>
              <th scope="col">Title</th>
              <th scope="col">Created At</th>
              <th scope="col">Updated At</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {data.map((value, index) => (
              <tr key={value._id}>
                <td>{index + 1}</td>
                <td>{value.title}</td>
                <td>{value.createdAt}</td>
                <td>{value.updatedAt}</td>
                <td className="gap-3">
                  <button
                    className="btn btn-success mx-2"
                    onClick={() => handleShowModal(value._id, value.title)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-success mx-2"
                    onClick={(e) => onDeleteProdCategory(value._id, e)}
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
          <Modal.Title>Edit Product Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form>
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                value={updateData.title}
                onChange={(e) =>
                  setUpdateData({ ...updateData, title: e.target.value })
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
              handleUpdateProdCategory(updateData.id, updateData.title, e)
            }
          >
            Update
          </button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Categorylist;
