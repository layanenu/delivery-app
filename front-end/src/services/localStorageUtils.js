export const getCartItems = () => {
  let items = JSON.parse(localStorage.getItem('cartList'));
  if (!items) items = [];

  return items;
};
