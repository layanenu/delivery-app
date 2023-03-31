import PropTypes from 'prop-types';
import React, { useState } from 'react';
import {
  handleCartDecrease,
  handleCartIncrease,
  handleCartArbitrary } from '../services/localStorageUtils';

function ProductCard({ product }) {
  const [quantity, setQuantity] = useState(0);

  const customerProducts = 'customer_products__';
  const elementCard = 'element-card-price-';
  const imgCard = 'img-card-bg-image-';
  const cardTitle = 'element-card-title-';
  const buttonRmItem = 'button-card-rm-item-';
  const buttonAddItem = 'button-card-add-item-';
  const inputQuantity = 'customer_products__input-card-quantity-';

  const { id, name, price, url_image: urlImage } = product;
  const newPrice = price.replace('.', ',');

  const handleDecrease = () => {
    if (quantity !== 0) {
      setQuantity(quantity - 1);
      handleCartDecrease(product);
    }
  };

  const handleIncrease = () => {
    setQuantity(quantity + 1);
    handleCartIncrease(product);
  };

  const handleInputChange = ({ target: { value: newQuantity } }) => {
    if (newQuantity < 0) {
      setQuantity('');
    } else {
      setQuantity(newQuantity);
    }

    handleCartArbitrary(product, Number(newQuantity));
  };

  return (
    <div>
      <img
        src={ urlImage }
        alt={ name }
        width="150"
        data-testid={ `${customerProducts}${imgCard}${id}` }
      />
      <p data-testid={ `${customerProducts}${cardTitle}${id}` }>{name}</p>
      <p data-testid={ `${customerProducts}${elementCard}${id}` }>{newPrice}</p>
      <button
        type="button"
        // name="decrease"
        data-testid={ `${customerProducts}${buttonRmItem}${id}` }
        // onClick={ () => handleCart(produto, rmItem) }
        onClick={ handleDecrease }
      >
        -
      </button>
      <input
        type="number"
        data-testid={ `${inputQuantity}${id}` }
        value={ quantity }
        onChange={ handleInputChange }
      />
      <button
        type="button"
        // name="increase"
        data-testid={ `${customerProducts}${buttonAddItem}${id}` }
        onClick={ handleIncrease }
        // onClick={ () => handleCart(produto, addItem) }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.string,
    url_image: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
