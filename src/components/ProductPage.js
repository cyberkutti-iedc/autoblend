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
    { id: 'L1', name: 'Lychee', price:50, imageURL: "https://firebasestorage.googleapis.com/v0/b/autoblend-aecac.appspot.com/o/img%2FLychee.png?alt=media&token=1305affa-f774-4bc9-87e6-ecb3b8e07cd9" },
    { id: 'L2', name: 'Oranage', price: 60,imageURL: "https://firebasestorage.googleapis.com/v0/b/autoblend-aecac.appspot.com/o/img%2Foranage.png?alt=media&token=30298c71-f9fe-44e2-a6a9-f6126937cce6"},
    { id: 'L3', name: 'Stawberry', price: 70 ,imageURL:"https://firebasestorage.googleapis.com/v0/b/autoblend-aecac.appspot.com/o/img%2FStrawberry.png?alt=media&token=63bf8b53-5583-4b38-8eec-5be2b98c04d7"},
    { id: 'L4', name: 'WaterMelon', price: 50,imageURL:"https://firebasestorage.googleapis.com/v0/b/autoblend-aecac.appspot.com/o/img%2Fwatermelon.png?alt=media&token=14263e2b-1427-4446-965f-bae64a775ec5" },
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

  /*
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
*/

  
// ... (previous code)

// ... (previous code)

const handleCheckout = async () => {
  // Prepare an object to store the selected drinks as 1 or not selected as 0
  const selectedDrinks = {};
  products.forEach((product) => {
    selectedDrinks[product.id] = cartItems.hasOwnProperty(product.id) ? '1' : '0';
  });

  // Show the popup notification
  setShowPopup(true);

  // Hide the popup after a delay (5 seconds in this example)
  setTimeout(() => {
    setShowPopup(false);
  }, 10000);

  // Show the "Order Ready" popup after the cooking process (2 seconds after checkout)
  setTimeout(() => {
    setOrderReady(true);
    // Hide the "Order Ready" popup after a delay (3 seconds in this example)
    setTimeout(() => {
      setOrderReady(false);
    }, 17000);
  }, 2000);

  const drinkOrder = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'];

  const firstSelectedIndex = drinkOrder.findIndex((drinkId) => selectedDrinks[drinkId] === '1');
  if (firstSelectedIndex === -1) {
    console.log('No drinks selected for processing.');
    return;
  }

  const processDrink = async (drinkIndex) => {
    if (drinkIndex >= drinkOrder.length) {
      // Finished processing all drinks, reset the selectedDrinks to 0 after a delay
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

        console.log('All drinks processed, resetting to 0.');
      }, 10000); // 10 seconds delay before resetting the selectedDrinks

      return;
    }

    const currentDrinkId = drinkOrder[drinkIndex];
    const currentDrinkValue = selectedDrinks[currentDrinkId];

    if (currentDrinkValue === '1') {
      // Perform the task for the current drink (e.g., sending 1 to Firebase)
      const productRef = ref(database, currentDrinkId);
      await set(productRef, '1', (error) => {
        if (error) {
          console.error(`Error sending ${currentDrinkId} to Firebase: ${error.message}`);
        } else {
          console.log(`Sent ${currentDrinkId} to Firebase`);
        }
      });
    } else {
      console.log(`Skipping ${currentDrinkId}`);
    }

    // Wait for a delay (e.g., 2 seconds) before setting the current drink to 0 and moving to the next drink
    setTimeout(async () => {
      const productRef = ref(database, currentDrinkId);
      await set(productRef, '0', (error) => {
        if (error) {
          console.error(`Error resetting ${currentDrinkId} to 0 in Firebase: ${error.message}`);
        } else {
          console.log(`Reset ${currentDrinkId} to 0 in Firebase`);
        }
      });

      // Process the next drink after a 20-second delay if more than one item, or 10 seconds if only one item
      setTimeout(() => {
        processDrink(drinkIndex + 1);
      }, drinkIndex === firstSelectedIndex ? 10000 : 11000); // 10 seconds for the first item, 20 seconds for the rest
    }, 5000); // 5 seconds delay before moving to the next drink
  };

  // Start processing the drinks, starting from the first selected drink
  processDrink(firstSelectedIndex);

  // Clear the cart after checkout
  setCartItems({});
};

// ... (rest of the code)




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
