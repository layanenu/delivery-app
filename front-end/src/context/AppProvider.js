import React, { useState, useMemo } from 'react';
import PropTypes from 'prop-types';

import AppContext from './AppContext';

function AppProvider({ children }) {
  const [totalCart, setTotalCart] = useState(0);

  const updateCartValue = (newValue) => {
    setTotalCart(newValue);
  };

  const context = useMemo(() => ({
    totalCart,
    updateCartValue,
  }), [totalCart]);

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
