import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = () => {
  return (
    <div className="col-3">
      <div className="blog-card">
        <div className="card-image">
          <img src="images/blog-img.jpg" className="img-fluid" alt="blog" />
        </div>
        <div className="blog-content">
          <p className="date">D/M/Y</p>
          <h5 className="title"> Blog's title</h5>
          <p className="desc">Blog's content aaaaaaaaaaaaaaaaaaaaaaaaaaaaa</p>
          <Link to="/blog/:id" className="button">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
