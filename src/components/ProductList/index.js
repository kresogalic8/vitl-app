import React from 'react';
import PropTypes from 'prop-types';
import styles from './styles.module.scss';

export default function ProductList({
  products,
  removeFromCart,
  addToCart,
  isCart,
}) {
  return (
    <div className={styles.products}>
      <div className={styles.productsList}>
        {!!products.length ? (
          products.map((product) => (
            <div className={styles.productListItem} key={product.name}>
              <img src='/product.png' alt='' />
              <div className={styles.productListItemContent}>
                <h3>{product.name}</h3>

                {!isCart && (
                  <button
                    className='btn btn--primary'
                    type='button'
                    onClick={() => addToCart(product)}
                  >
                    Add to cart
                  </button>
                )}

                {isCart && (
                  <button
                    className='btn btn--secondary'
                    type='button'
                    onClick={() => removeFromCart(product)}
                  >
                    Remove from cart
                  </button>
                )}
              </div>
            </div>
          ))
        ) : (
          <div>
            <h3>No products</h3>
          </div>
        )}
      </div>
    </div>
  );
}

ProductList.propTypes = {
  products: PropTypes.arrayOf(PropTypes.object).isRequired,
  addToCart: PropTypes.func,
  removeFromCart: PropTypes.func,
  isCart: PropTypes.bool,
};

ProductList.defaultProps = {
  addToCart: () => {},
  removeFromCart: () => {},
  isCart: false,
};
