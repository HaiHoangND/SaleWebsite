import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = (props) => {
  return (
    <div className="col-3">
      <div className="blog-card">
        <div className="card-image">
          <img src="images/blog-img.jpg" className="img-fluid" alt="blog" />
        </div>
        <div className="blog-content">
          <h5 className="title"> {props.blog.title}</h5>
          <p className="desc">{props.blog.description}</p>
          <Link to="/blog/:id" className="button">
            Read More
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard;
