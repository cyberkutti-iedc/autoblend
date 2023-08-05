import React from 'react';

const CartPage = ({ cartItems, products, handleRemoveFromCart, handleCheckout }) => {
  if (!cartItems || Object.keys(cartItems).length === 0) {
    return (
      <div>
        <h1>Cart</h1>
        <p>Your cart is empty.</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Cart</h1>
      <div className="drinks-model">
        {Object.keys(cartItems).map((cartProductId) => {
          const cartItem = cartItems[cartProductId];
          const product = products.find((p) => p.id === cartItem.productId);
          return (
            <div className="cart-item" key={cartProductId}>
              <div className="cart-item-text">
                <h3>{product.name}</h3>
                <p>Price: Rs{product.price.toFixed(2)}</p>
                <p>Quantity: {cartItem.quantity}</p>
              </div>
              <button className='buttonremove' onClick={() => handleRemoveFromCart(cartProductId)}>Remove from Cart</button>
            </div>
          );
        })}
      </div>
      {/* Place the Checkout button here */}
      <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
    </div>
  );
};

export default CartPage;
