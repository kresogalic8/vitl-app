import { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import toast, { Toaster } from 'react-hot-toast';
import ProductList from './components/ProductList';
import CartList from './components/CartList';
import { getProducts } from './services/products.service';
import useLocalStorage from './hooks/useLocalStorage';
import { TUL } from './constants';

function App() {
  const [products, setProducts] = useState([]);
  const [cartProducts, setCartProducts] = useLocalStorage('CART_PRODUCTS', []);

  useEffect(() => {
    (async () => {
      const productsData = await getProducts();
      const productsMap = productsData.products.map((product) => ({
        ...product,
        id: uuidv4(),
      }));
      setProducts(productsMap);
    })();
  }, []);

  const addToCart = (item) => {
    const nutrientsSum = item.nutrients.reduce((accumulator, value) => {
      return accumulator + value.amount;
    }, 0);

    if (nutrientsSum > TUL) {
      toast.error('The TUL for Vitamin A is 1500 mcg. You are over TUL!');
      return;
    }

    const productInCart = cartProducts.find(
      (product) => product.id === item.id
    );

    if (productInCart) {
      toast.error('Product is already in cart');
      return;
    }

    const newCartProducts = [...cartProducts, item];
    setCartProducts(newCartProducts);

    toast.success('Product added to cart');
  };

  const removeFromCart = (item) => {
    const newCartProducts = cartProducts.filter(
      (product) => product.id !== item.id
    );

    setCartProducts(newCartProducts);
    toast.success(`${item.name} has been removed from cart`);
  };

  return (
    <div className='container'>
      <h1>Basket</h1>
      <CartList
        selectedProducts={cartProducts}
        removeFromCart={removeFromCart}
      />

      <h1>Products</h1>
      <ProductList products={products} addToCart={addToCart} />

      <br />

      <Toaster />
    </div>
  );
}

export default App;
