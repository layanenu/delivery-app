import React from 'react';

function ProductCard(props) {
  const customerProducts = 'customer_products__';
  const elementCard = 'element-card-price-';
  const imgCard = 'img-card-bg-image-';
  const cardTitle = 'element-card-title-';
  const buttonRmItem = 'button-card-rm-item-';
  const buttonAddItem = 'button-card-add-item-';
  const inputQuantity = 'customer_products__input-card-quantity-';

  const { id, name, price, url_image } = props.produto;
  const newPrice = price.replace('.', ',');

  return (
    <div>
      <p data-testid={ `${customerProducts}${elementCard}${id}` }>{newPrice}</p>
      <img
        src={ url_image }
        alt={ name }
        data-testid={ `${customerProducts}${imgCard}${id}` }
      />
      <p data-testid={ `${customerProducts}${cardTitle}${id}` }>{name}</p>
      <button
        type="button"
        data-testid={ `${customerProducts}${buttonRmItem}${id}` }
      >
        -
      </button>
      <input
        type="number"
        data-testid={ `${inputQuantity}${id}` }
      />
      <button
        type="button"
        data-testid={ `${customerProducts}${buttonAddItem}${id}` }
      >
        -
      </button>
    </div>
  );
}

export default ProductCard;
