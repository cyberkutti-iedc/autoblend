import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, push, set, onValue } from 'firebase/database';
import {
  Button,
  Card,
  CardContent,
  CardActions,
  CardMedia,
  Grid,
  Paper,
  Snackbar,
  Typography,
  IconButton,
  Toolbar,
  Container,
  AppBar,
  CssBaseline,
} from '@mui/material';
import {
  AddShoppingCart as AddShoppingCartIcon,
  RemoveShoppingCart as RemoveShoppingCartIcon,
} from '@mui/icons-material';


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
  const app = initializeApp(firebaseConfig);
  const database = getDatabase(app);
  const getTotalItemsInCart = () => {
    return Object.values(cartItems).reduce((total, item) => total + item.quantity, 0);
  };

  //const [showPopup, setShowPopup] = useState(false);
  //const [orderReady, setOrderReady] = useState(false);

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
  }, 4000);

  // Show the "Order Ready" popup after the cooking process (2 seconds after checkout)
  setTimeout(() => {
    setOrderReady(true);
    // Hide the "Order Ready" popup after a delay (3 seconds in this example)
    setTimeout(() => {
      setOrderReady(false);
    }, 17000);
  }, 5000);

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

  
  
  return (
   
      <>
      <CssBaseline />
     
      <Toolbar /> {/* To ensure content isn't hidden under the app bar */}
      <Container>
        <Grid container spacing={3}>
          {products.map((product) => (
            <Grid item key={product.id} xs={12} sm={6} md={4}>
              <Card>
                <CardMedia
                  component="img"
                  height="200"
                  image={product.imageURL}
                  alt={product.name}
                  style={{ objectFit: 'cover' }}
                />
                <CardContent>
                  <Typography variant="h6">{product.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Price: Rs {product.price.toFixed(2)}
                  </Typography>
                </CardContent>
                <CardActions>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddShoppingCartIcon />}
                    fullWidth
                    onClick={() => handleAddToCart(product, 1)} // Update the quantity as needed
                  >
                    Add to Cart
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} style={{ marginTop: '20px' }}>
          <Grid item xs={12}>
            <Typography variant="h3">My Cart🥤</Typography>
          </Grid>
          {Object.keys(cartItems).map((cartProductId) => {
            const cartItem = cartItems[cartProductId];
            const product = products.find((p) => p.id === cartItem.productId);
            return (
              <Grid item key={cartProductId} xs={12} md={6}>
                <Paper elevation={3} style={{ padding: '16px' }}>
                  <Grid container>
                    <Grid item xs={4}>
                      <CardMedia
                        component="img"
                        height="80"
                        image={product.imageURL}
                        alt={product.name}
                        style={{ objectFit: 'cover' }}
                      />
                    </Grid>
                    <Grid item xs={8}>
                      <Typography variant="h6">{product.name}</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Price: Rs {product.price.toFixed(2)}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Quantity: {cartItem.quantity}
                      </Typography>
                    </Grid>
                  </Grid>
                  <CardActions>
                    <IconButton onClick={() => handleRemoveFromCart(cartProductId)} color="error">
                      <RemoveShoppingCartIcon />
                    </IconButton>
                  </CardActions>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        <Grid item xs={12}>
          <Snackbar
            open={showPopup}
            autoHideDuration={4000}
            message="Autoblend is preparing something special for you! Make sure the glass is on the desk."
          />
        </Grid>
        <Grid item xs={12}>
          <Snackbar open={orderReady} autoHideDuration={4000} message="Your order is ready!" />
        </Grid>
        <Grid item xs={12}>
          {Object.keys(cartItems).length > 0 && (
            <Button onClick={handleCheckout} variant="contained" color="primary">
              Checkout ({getTotalItemsInCart()})
            </Button>
          )}
        </Grid>
      </Container>
    </>
  );
  
};

export default ProductPage;
