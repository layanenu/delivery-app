/* eslint-disable react/jsx-max-depth */
import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../context/AppContext';
import {
  handleCartDecrease,
  handleCartIncrease,
  handleCartArbitrary,
  sumCart,
  getCartItems } from '../services/localStorageUtils';

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);

  const { updateCartValue } = useContext(AppContext);

  useEffect(() => {
    const cart = getCartItems();
    const isOnCart = cart.find((item) => item.id === product.id);
    if (isOnCart) {
      setQuantity(isOnCart.quantity);
    } else {
      setQuantity(0);
    }
  }, []);

  const customerProducts = 'customer_products__';
  const elementCard = 'element-card-price-';
  const imgCard = 'img-card-bg-image-';
  const cardTitle = 'element-card-title-';
  const buttonRmItem = 'button-card-rm-item-';
  const buttonAddItem = 'button-card-add-item-';
  const inputQuantity = 'customer_products__input-card-quantity-';

  const { id, name, price, urlImage } = product;
  const newPrice = price.replace('.', ',');

  const handleDecrease = () => {
    if (quantity !== 0) {
      setQuantity(quantity - 1);
      handleCartDecrease(product);
    }
    const newTotal = sumCart();
    updateCartValue(newTotal);
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    handleCartIncrease(product);
    const newTotal = sumCart();
    updateCartValue(newTotal);
  };

  const handleInputChange = ({ target: { value: newQuantity } }) => {
    if (newQuantity < 0) {
      setQuantity('');
    } else {
      setQuantity(newQuantity);
    }

    handleCartArbitrary(product, Number(newQuantity));
    const newTotal = sumCart();
    updateCartValue(newTotal);
  };

  return (
    // <section>
    // <div className="container py-5">
    // <div className="justify-content-center">
    //   <div className="col-md-8 col-lg-6 col-xl-4">
    <div className="card text-black">
      <img
        className="card-img-top imgSize"
        src={ urlImage }
        alt={ name }
        data-testid={ `${customerProducts}${imgCard}${id}` }
      />
      <div className="card-body ">
        <div className="text-center mt-1">
          <h4
            data-testid={ `${customerProducts}${cardTitle}${id}` }
          >
            {name}
          </h4>
          <h5
            data-testid={ `${customerProducts}${elementCard}${id}` }
          >
            {newPrice}
          </h5>
        </div>
        <div className="flexInputBtns">
          <button
            className="btn btn-primary flex-fill me-1"
            data-testid={ `${customerProducts}${buttonRmItem}${id}` }
            type="button"
            onClick={ handleDecrease }
          >
            -
          </button>
          <label htmlFor="qtyForm" className="form-label">
            <input
              id="qtyForm"
              className="form-control inputSizeQty"
              type="number"
              data-testid={ `${inputQuantity}${id}` }
              value={ quantity }
              onChange={ handleInputChange }
            />
          </label>
          <button
            className="btn btn-primary flex-fill me-1"
            data-testid={ `${customerProducts}${buttonAddItem}${id}` }
            type="button"
            onClick={ handleIncrease }
          >
            +
          </button>
        </div>
      </div>
    </div>
    //   </div>
    // </div>
    // </div>
    // </section>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    urlImage: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
