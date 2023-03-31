import React, { useState } from 'react';
import { handleCart } from '../services/localStorageUtils';

function ProductCard(props) {
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

  const { produto } = props;
  const { id, name, price, url_image: urlImage } = produto;
  const newPrice = price.replace('.', ',');

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
        data-testid={ `${customerProducts}${buttonRmItem}${id}` }
        onClick={ () => handleCart(produto, rmItem) }
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
        data-testid={ `${customerProducts}${buttonAddItem}${id}` }
        onClick={ () => handleCart(produto, addItem) }
      >
        +
      </button>
    </div>
  );
}

export default ProductCard;
