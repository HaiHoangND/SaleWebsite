import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import BreadCrumb from '../components/BreadCrumb';
import { HiOutlineArrowLeft } from 'react-icons/hi';
import Meta from '../components/Meta';
import blog from '../images/blog-1.jpg';
import Container from '../components/Container';
import { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

const SingleBlog = () => {
  const location = useLocation();
  const id = location.pathname.split('/')[2];
  const [blogData, setBlogData] = useState([]);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/blog/${id}`
        );
        setBlogData(response.data);
      } catch (error) {
        console.error('Error fetching blog data:', error);
      }
    };

    fetchBlogData();
  }, [id]);
  const { title, description } = blogData;
  return (
    <>
      <Meta title={title} />
      <BreadCrumb title={title} />
      <Container class1="blog-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12">
            <div className="single-blog-card">
              <Link to="/blogs" className="d-flex align-items-center gap-10">
                <HiOutlineArrowLeft className="fs-4" /> Go back to Blogs
              </Link>
              <h3 className="title">{title}</h3>
              <img src={blog} className="img-fluid w-100 my-4" alt="blog" />
              <p>{description}</p>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default SingleBlog;
