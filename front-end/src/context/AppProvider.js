import PropTypes from 'prop-types';
import React, { useMemo, useState } from 'react';

import AppContext from './AppContext';

function AppProvider({ children }) {
  const [totalCart, setTotalCart] = useState(0);
  const [cart, setCart] = useState([]);

  const updateCart = (newCart) => {
    setCart(newCart);
  };

  const updateCartValue = (newValue) => {
    setTotalCart(newValue);
  };

  const context = useMemo(() => ({
    totalCart,
    updateCartValue,
    cart,
    updateCart,
  }), [totalCart, cart]);

  return (
    <AppContext.Provider value={ context }>
      {children}
    </AppContext.Provider>
  );
}

AppProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
export default AppProvider;
