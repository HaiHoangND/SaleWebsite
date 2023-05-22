import React, { useState, useEffect } from "react";
import axios from "axios";
// import { InboxOutlined } from "@ant-design/icons";
// import { message, Upload } from "antd";

// const { Dragger } = Upload;
const Addblog = () => {
  const [mes, setMes] = useState("");
  const [data, setData] = useState({
    title: "",
    category: "",
    description: "",
    // images: null,
  });

  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const token = localStorage.getItem("access_token");
        const response = await axios.get(
          "http://localhost:5000/api/blogcategory/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setCategories(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchCategories();
  }, []);

  // const [selectedBlog, setSelectedBlog] = useState(null);
  // const handleBlogSelection = async (blogId) => {
  //   try {
  //     if (!blogId) {
  //       console.log("Khong có blogId");
  //     }
  //     const response = await axios.get(
  //       `http://localhost:5000/api/blog/${blogId}`
  //     );
  //     if (response.data) {
  //       setSelectedBlog(response.data); // Lưu thông tin blog được chọn vào state
  //     } else {
  //       // Xử lý khi không nhận được thông tin blog
  //       console.log("khong có data");
  //     }
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };
  const handle = (e) => {
    const newData = { ...data };
    newData[e.target.id] = e.target.value;
    setData(newData);
  };
  const submit = async (e) => {
    try {
      e.preventDefault();
      const token = localStorage.getItem("access_token");
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = {
        title: data.title,
        category: data.category,
        description: data.description,
        // images: data.images,
      };
      await axios.post("http://localhost:5000/api/blog/", formData, config);
      setMes("Blog created successfully!");
    } catch (error) {
      if (error.response.status === 403) {
        alert("You are not admin. Please login again.");
        window.location.href = "/";
      } else {
        console.error(error);
        setMes("Error creating brand. Please try again.");
      }
    }
  };
  // const props = {
  //   name: "file",
  //   multiple: false,
  //   action: selectedBlog
  //     ? `http://localhost:5000/api/blog/upload/${selectedBlog._id}`
  //     : "",
  //   method: "PUT",
  //   beforeUpload: (file) => {
  //     // Xử lý tệp tin được chọn và lưu trữ vào trạng thái `data`
  //     setData({ ...data, images: file });
  //     console.log(data.images);
  //     return false; // Ngăn chặn việc tải lên tự động
  //   },
  //   onRemove: () => {
  //     // Xóa tệp tin đã chọn nếu người dùng hủy bỏ
  //     setData({ ...data, images: null });
  //   },
  //   onChange(info) {
  //     const { status, response } = info.file;
  //     if (status !== "uploading") {
  //       console.log(info.file, info.fileList);
  //     }
  //     if (status === "done") {
  //       console.log(response.data);
  //       message.success(`${info.file.name} file uploaded successfully.`);
  //     } else if (status === "error") {
  //       message.error(`${info.file.name} file upload failed.`);
  //     }
  //   },
  //   onDrop(e) {
  //     console.log("Dropped files", e.dataTransfer.files);
  //   },
  // };
  return (
    <div>
      <h3 className="mb-4 title">Add Blog</h3>
      {mes && <div className="alert alert-success">{mes}</div>}
      <div>
        <form action="">
          {/* <div>
            <ul>
              {selectedBlog && (
                <li
                  key={selectedBlog._id}
                  onClick={() => handleBlogSelection(selectedBlog._id)}
                >
                  {selectedBlog.title}
                </li>
              )}
            </ul>
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibited from
                uploading company data or other banned files.
              </p>
            </Dragger>
          </div> */}

          <div className="mt-4 mb-3">
            <input
              type="text"
              name="title"
              placeholder="Enter Blog Title"
              id="title"
              value={data.title}
              onChange={(e) => handle(e)}
              className="form-control form-floating mt-3"
              style={{ height: "60px", width: "100%" }}
            />
          </div>
          <select
            name="category"
            className="form-control py-3 mb-3"
            id="category"
            value={data.category}
            onChange={(e) => handle(e)}
          >
            <option value="">Select Blog Category</option>
            {categories.map((category) => (
              <option key={category._id}>{category.title}</option>
            ))}
          </select>
          <div>
            <input
              type="text"
              name="description"
              placeholder="Enter Blog Description"
              id="description"
              value={data.description}
              onChange={(e) => handle(e)}
              className="form-control form-floating mt-3"
              style={{ height: "60px", width: "100%" }}
            />
          </div>
          <button
            className="btn btn-success border-0 rounded-3 my-5"
            type="submit"
            onClick={(e) => submit(e)}
          >
            Add Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
