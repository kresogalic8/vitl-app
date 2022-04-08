import React from 'react';
import ProductList from '../ProductList';
import PropTypes from 'prop-types';

export default function CartList({ selectedProducts, removeFromCart }) {
  return (
    <ProductList
      products={selectedProducts}
      removeFromCart={removeFromCart}
      isCart
    />
  );
}

CartList.propTypes = {
  selectedProducts: PropTypes.arrayOf(PropTypes.object).isRequired,
  removeFromCart: PropTypes.func,
};

CartList.defaultProps = {
  removeFromCart: () => {},
};
