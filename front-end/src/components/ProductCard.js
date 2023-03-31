import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { handleCart } from '../services/localStorageUtils';

function ProductCard({ produto }) {
  const [quantidade, setQuantidade] = useState(0);

  const customerProducts = 'customer_products__';
  const elementCard = 'element-card-price-';
  const imgCard = 'img-card-bg-image-';
  const cardTitle = 'element-card-title-';
  const buttonRmItem = 'button-card-rm-item-';
  const buttonAddItem = 'button-card-add-item-';
  const inputQuantity = 'customer_products__input-card-quantity-';

  const rmItem = -1;
  const addItem = 1;

  // const { produto } = props;
  const { id, name, price, url_image: urlImage } = produto;
  const newPrice = price.replace('.', ',');

  // funçao que muda o estado quantidade
  const handleBtns = (e) => {
    e.preventDefault();
    console.log(e.target);
    if (e.target.name === 'add') {
      handleCart(produto, addItem);
      setQuantidade(quantidade + 1);
    } else if (quantidade === 0) {
      setQuantidade(0);
    } else {
      handleCart(produto, rmItem);
      setQuantidade(quantidade - 1);
    }
  };

  return (
    <div>
      <p data-testid={ `${customerProducts}${elementCard}${id}` }>{newPrice}</p>
      <img
        src={ urlImage }
        alt={ name }
        data-testid={ `${customerProducts}${imgCard}${id}` }
      />
      <p data-testid={ `${customerProducts}${cardTitle}${id}` }>{name}</p>
      <button
        type="button"
        name="rmv"
        data-testid={ `${customerProducts}${buttonRmItem}${id}` }
        // onClick={ () => handleCart(produto, rmItem) }
        onClick={ handleBtns }
      >
        -
      </button>
      <input
        type="number"
        data-testid={ `${inputQuantity}${id}` }
        value={ quantidade }
      />
      <button
        type="button"
        name="add"
        data-testid={ `${customerProducts}${buttonAddItem}${id}` }
        onClick={ handleBtns }
        // onClick={ () => handleCart(produto, addItem) }
      >
        +
      </button>
    </div>
  );
}

ProductCard.propTypes = {
  produto: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    price: PropTypes.shape({
      replace: PropTypes.func,
    }).isRequired,
    url_image: PropTypes.string,
  }).isRequired,
};

export default ProductCard;
