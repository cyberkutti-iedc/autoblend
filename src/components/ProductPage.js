import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';


// Replace with your Firebase config
const firebaseConfig = {
  // Your Firebase configuration
  apiKey: "AIzaSyAn3SjP8Mr3zb2CevB7BqviscaOlSWkTI0",
  authDomain: "autoblend-aecac.firebaseapp.com",
  databaseURL: "https://autoblend-aecac-default-rtdb.firebaseio.com",
  projectId: "autoblend-aecac",
  storageBucket: "autoblend-aecac.appspot.com",
  messagingSenderId: "400824416363",
  appId: "1:400824416363:web:8d8218e91fa0f75850192e"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

const ProductPage = () => {
  const products = [
    { id: 'L1', name: 'Grapes', price:50, imageURL: "https://firebasestorage.googleapis.com/v0/b/autoblend-aecac.appspot.com/o/img%2F20230802_142657.png?alt=media&token=717f6709-1844-46ea-9259-8e6f3d77eb54" },
    { id: 'L2', name: 'Passion', price: 60,imageURL: "https://firebasestorage.googleapis.com/v0/b/autoblend-aecac.appspot.com/o/img%2F20230802_141735.png?alt=media&token=275b6611-26b4-406a-93bd-cebc9770e033"},
    { id: 'L3', name: 'Stawberry', price: 70 ,imageURL:"https://firebasestorage.googleapis.com/v0/b/autoblend-aecac.appspot.com/o/img%2F20230802_142035.png?alt=media&token=1251fcf1-1823-4673-9de4-8a4c849c810b"},
    { id: 'L4', name: 'Mint', price: 50,imageURL:"https://firebasestorage.googleapis.com/v0/b/autoblend-aecac.appspot.com/o/img%2F20230802_143102.png?alt=media&token=fc54e4ba-891d-478b-9501-70cfd35bad9c" },
    { id: 'L5', name: 'Sprite', price: 20,imageURL:"https://firebasestorage.googleapis.com/v0/b/autoblend-aecac.appspot.com/o/img%2Fsprite.png?alt=media&token=43fa6e7c-4048-4411-b807-feb1258d8330" },
    { id: 'L6', name: 'Water', price: 0,imageURL:"https://firebasestorage.googleapis.com/v0/b/autoblend-aecac.appspot.com/o/img%2Fwater.png?alt=media&token=437712c2-deb3-492a-b5ef-3f7d060ad60b" },

   
    // Add more products with their respective images
  
  ];

  const [cartItems, setCartItems] = useState({});

  const getKeyForProduct = (productId) => {
    const productIndex = products.findIndex((product) => product.id === productId);
    return productIndex !== -1 ? `L${productIndex + 1}` : productId;
  };

  const handleAddToCart = (product, quantity) => {
    const cartItem = {
      
      productId: product.id,
      name: product.name,
      price: product.price,
      quantity,
      totalPrice: (product.price * quantity).toFixed(2), // Calculate and set totalPrice
      imageURL: product.imageURL, // Include the imageURL property from the product
    };
  
    const mappedKey = getKeyForProduct(product.id);
    setCartItems((prevCartItems) => ({
      ...prevCartItems,
      [mappedKey]: cartItem,
    }));
  
    const productTimeout = setTimeout(() => {
      setCartItems((prevCartItems) => {
        const updatedItems = { ...prevCartItems };
        delete updatedItems[mappedKey];
        return updatedItems;
      });
    }, getProductResetTime(product.id));
    setProductTimeout(product.id, productTimeout);
  };
  

  const getProductResetTime = (productId) => {
    switch (productId) {
      case 'L1':
        return 15000; // 15 seconds
      case 'L2':
        return 15000; // 15 seconds
      case 'L3':
        return 15000; // 15 seconds
      case 'L4':
        return 15000; // 15 seconds
      case 'L5':
        return 15000; // 15 seconds
      case 'L6':
        return 15000; // 15 seconds
      default:
        return 15000; // Default 15 seconds
    }
  };

  const [productTimeouts, setProductTimeouts] = useState({});

  const setProductTimeout = (productId, timeout) => {
    setProductTimeouts((prevTimeouts) => ({
      ...prevTimeouts,
      [productId]: timeout,
    }));
  };

  useEffect(() => {
    const cartRef = ref(database, 'carts');
    onValue(cartRef, (snapshot) => {
      const cartData = snapshot.val();
      if (cartData !== null) {
        setCartItems(cartData);
      }
    });

    return () => {
      Object.values(productTimeouts).forEach((timeout) => {
        clearTimeout(timeout);
      });
    };
  }, [database, productTimeouts]);

  const calculateTotalPrice = () => {
    const total = Object.values(cartItems).reduce((acc, cartItem) => {
      const itemTotal = parseFloat(cartItem.totalPrice);
      return !isNaN(itemTotal) ? acc + itemTotal : acc;
    }, 0);
    return total.toFixed(2);
  };




  const [showPopup, setShowPopup] = useState(false);
  const [orderReady, setOrderReady] = useState(false);
 const handleCheckout = () => {
    // Prepare an object to store the selected drinks as 1 or not selected as 0
    const selectedDrinks = {};
    products.forEach((product) => {
      selectedDrinks[product.id] = cartItems.hasOwnProperty(product.id) ? '1' : '0';
    });
// Show the popup notification
  setShowPopup(true);

// Hide the popup after a delay (8 seconds in this example)
  setTimeout(() => {
  setShowPopup(false);
}, 10000);

  // Show the "Order Ready" popup after the cooking process (6 seconds after checkout)
  setTimeout(() => {
    setOrderReady(true);
    // Hide the "Order Ready" popup after a delay (3 seconds in this example)
    setTimeout(() => {
      setOrderReady(false);
    }, 3500);
  }, 12000);
    
    // Update the individual L1, L2, L3, L4, L5, L6 values in the Firebase Realtime Database
    products.forEach((product) => {
      const productRef = ref(database, product.id);
      set(productRef, selectedDrinks[product.id]);
    });

    // Clear the cart after checkout
    setCartItems({});

    // Set a delay to change all values back to 0
    setTimeout(() => {
      const zeroDrinks = {};
      products.forEach((product) => {
        zeroDrinks[product.id] = '0';
      });

      // Update the individual L1, L2, L3, L4, L5, L6 values in the Firebase Realtime Database
      products.forEach((product) => {
        const productRef = ref(database, product.id);
        
        set(productRef, zeroDrinks[product.id]);
      });
    }, 10000); // Delay of 10000ms (10 seconds) after the initial checkout
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevCartItems) => {
      const updatedItems = { ...prevCartItems };
      delete updatedItems[productId];
      return updatedItems;
    });
  };

  
  

// ... (previous code)
return (
  <div>
    <h1>Products🍹</h1>
    <div className="products-container">
        {products.map((product) => (
          <div className="product-item" key={product.id}>
            <img src={product.imageURL} alt={product.name} />
            <h3>{product.name}</h3>
            <p>Price: Rs {product.price.toFixed(2)}</p>
            <button onClick={() => handleAddToCart(product, 1)}>Add to Cart</button>
          </div>
        ))}
      </div>

    <hr />
    <div>
      <h1>My Cart🥤</h1>
      <div className="cart-items">
        {Object.keys(cartItems).map((cartProductId) => {
          const cartItem = cartItems[cartProductId];
          const product = products.find((p) => p.id === cartItem.productId);
          return (
            <div className="cart-item" key={cartProductId}>
              <div className="cart-item-text">
              <div className="cart-item-image">
            <img src={product.imageURL} alt={product.name} />
          </div>
                <h3>{product.name}</h3>
                <p>Price: Rs{product.price.toFixed(2)}</p>
                <p>Quantity:  {cartItem.quantity}</p>
              </div>
              <button className="buttonremove" onClick={() => handleRemoveFromCart(cartProductId)}>
                Remove from Cart
              </button>
            </div>
          );
        })}
      </div>
    </div>
   
    {Object.keys(cartItems).length > 0 && (
      <button className="checkout-btn" onClick={handleCheckout}>
        Checkout
      </button>
    )}

    {showPopup && (
      <div className="popup-overlay">
        <div className="popup-modal">
          <p>Autoblend Is Cooking Something Special For You!</p>
        </div>
      </div>
    )}
    {orderReady && (
      <div className="popup-overlay">
        <div className="popup-modal">
          <p>Your Order is Ready!</p>
        </div>
      </div>
      
    )}
  </div>
);


  
};

export default ProductPage;
