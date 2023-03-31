export const getCartItems = () => {
  let items = JSON.parse(localStorage.getItem('cartList'));
  if (!items) {
    items = [];
    localStorage.setItem('cartList', JSON.stringify(items));
  }

  return items;
};

export const handleCart = (product, quantity) => {
  const cart = getCartItems(); // Pega do localStorage
  const errorIndex = -1;
  const index = cart.findIndex((prod) => product.id === prod.id); // Pega o index

  if (index === errorIndex) { // Verifica se encontrou o produto no array
    product.quantity = quantity; // Adiciona a quantidade a validação deve ser feita no front deixando o botão de remover desabilitado quando não houver esse item no carrinho
    product.subTotal = quantity * product.price;
    if (product.quantity < 0) product.quantity = 0;
    cart.push(product);
  } else {
    if (cart[index].quantity <= 0) { // Verifica se a quantidade é menor ou igual a 0
      cart[index].quantity = 0;
    } else {
      cart[index].quantity = Number(cart[index].quantity) + quantity; // Define a quantidade de items
      cart[index].subTotal = Number(cart[index].quantity) * cart[index].price;
    }
    cart[index].quantity = String(cart[index].quantity); // Converte pra string novamente (Não sei se precisa!)
  }

  localStorage.setItem('cartList', JSON.stringify(cart)); // Devolve pro localStorage
};

// export const sumCart = () => {

// }
