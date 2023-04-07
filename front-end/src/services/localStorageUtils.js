export const getCartItems = () => {
  let items = JSON.parse(localStorage.getItem('cartList'));
  if (!items) {
    items = [];
    localStorage.setItem('cartList', JSON.stringify(items));
  }

  return items;
};

export const handleCartIncrease = (product) => {
  const cart = getCartItems();

  const NOT_FOUND = -1;

  const index = cart.findIndex((prod) => product.id === prod.id);

  if (index === NOT_FOUND) {
    product.quantity = 1;
    product.subTotal = Number(product.price);

    cart.push(product);
  } else {
    cart[index].quantity = Number(cart[index].quantity) + 1;
    cart[index].subTotal = Number(cart[index].subTotal) + Number(product.price);
  }

  localStorage.setItem('cartList', JSON.stringify(cart));
};

export const handleCartDecrease = (product) => {
  const cart = getCartItems();

  const index = cart.findIndex((prod) => product.id === prod.id);

  if (cart[index].quantity === 1) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = Number(cart[index].quantity) - 1;
    cart[index].subTotal = Number(cart[index].subTotal) - Number(cart[index].price);
  }

  localStorage.setItem('cartList', JSON.stringify(cart));
};

export const handleCartArbitrary = (product, newQuantity) => {
  const cart = getCartItems();

  const NOT_FOUND = -1;

  const index = cart.findIndex((prod) => product.id === prod.id);

  if (index === NOT_FOUND) {
    if (newQuantity > 0) {
      product.quantity = newQuantity;
      product.subTotal = newQuantity * Number(product.price);

      cart.push(product);
    }
  } else if (newQuantity <= 0) {
    cart.splice(index, 1);
  } else {
    cart[index].quantity = newQuantity;
    cart[index].subTotal = newQuantity * Number(cart[index].price);
  }

  console.log(cart);
  localStorage.setItem('cartList', JSON.stringify(cart));
};

export const sum = (order) => {
  const total = order.reduce((acc, item) => {
    acc += item.subTotal;
    return acc;
  }, 0);
  console.log(total);
  return total.toFixed(2).replace('.', ',');
};

export const sumCart = () => {
  const cart = getCartItems();
  if (cart.length === 0) {
    return 0;
  }

  return sum(cart);
};
