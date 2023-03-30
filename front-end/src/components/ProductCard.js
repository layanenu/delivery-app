import React from 'react';

function ProductCard(props) {
  const customerProducts = 'customer_products__';
  const elementCard = 'element-card-price-';
  const imgCard = 'img-card-bg-image-';
  const cardTitle = 'element-card-title-';
  const buttonRmItem = 'button-card-rm-item-';
  const buttonAddItem = 'button-card-add-item-';
  const inputQuantity = 'input-card-quantity-';

  const { id } = props.produto;

  return (
    <div>
      <p data-testid={ `${customerProducts}${elementCard}${id}` }>valor</p>
      <img src="" alt="" data-testid={ `${customerProducts}${imgCard}${id}` } />
      <p data-testid={ `${customerProducts}${cardTitle}${id}` }>nome</p>
      <button
        type="button"
        data-testid={ `${customerProducts}${buttonRmItem}${id}` }
      >
        -
      </button>
      <span
        type="button"
        data-testid={ `${customerProducts}${inputQuantity}${id}` }
      >
        quantidade
      </span>
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
