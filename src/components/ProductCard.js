import React from 'react';
import ReactStars from 'react-stars';
import { Link, useLocation } from 'react-router-dom';

const ProductCard = (props) => {
  const { grid } = props;
  let location = useLocation();
  return (
    <div
      className={` ${
        location.pathname === '/our-store' ? `gr-${grid}` : 'col-3'
      } `}
    >
      <Link className="product-card position-relative">
        <div className="wishlist-icon position-absolute">
          <Link>
            <img src="images/wish.svg" alt="wishlist" />
          </Link>
        </div>
        <div className="product-image">
          <img src="images/ip01.jpg" alt="product" className="img-fluid" />
          <img src="images/ip02.jpg" alt="product" className="img-fluid" />
        </div>
        <div className="product-details">
          <h6 className="brand">Brand</h6>
          <h5 className="product-title">Product Title</h5>
          <ReactStars
            count={5}
            size={24}
            value={5}
            edit={false}
            activeColor="#ffd700"
          />
          <p className="price">10000$</p>
        </div>
        <div className="action-bar position-absolute">
          <div className="d-flex flex-column gap-15">
            <Link>
              <img src="images/prodcompare.svg" alt="prodcompare" />
            </Link>
            <Link>
              <img src="images/view.svg" alt="view" />
            </Link>
            <Link>
              <img src="images/add-cart.svg" alt="addcart" />
            </Link>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
