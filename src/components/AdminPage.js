import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { getDatabase, ref, set ,push} from 'firebase/database';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';

const firebaseConfig = {
  // Your Firebase configuration
  // ...
  apiKey: "AIzaSyAn3SjP8Mr3zb2CevB7BqviscaOlSWkTI0",
  authDomain: "autoblend-aecac.firebaseapp.com",
  databaseURL: "https://autoblend-aecac-default-rtdb.firebaseio.com",
  projectId: "autoblend-aecac",
  storageBucket: "autoblend-aecac.appspot.com",
  messagingSenderId: "400824416363",
  appId: "1:400824416363:web:8d8218e91fa0f75850192e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);

const AdminPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isCleaning, setIsCleaning] = useState(false);
  const [cleaningMotor, setCleaningMotor] = useState(null);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setIsLoggedIn(true);
    } catch (error) {
      console.error('Login failed', error.message);
    }
  };

  const handleLogout = async () => {
    await signOut(auth);
    setIsLoggedIn(false);
  };

  const handleMotorButtonPress = async (motorNumber) => {
    try {
      const motorRef = ref(database, `motors/motor${motorNumber}`);
      await set(motorRef, "1");
    } catch (error) {
      console.error(`Error setting motor${motorNumber} value:`, error.message);
    }
  };

  const handleMotorButtonRelease = async (motorNumber) => {
    try {
      const motorRef = ref(database, `motors/motor${motorNumber}`);
      await set(motorRef, "0");
    } catch (error) {
      console.error(`Error setting motor${motorNumber} value:`, error.message);
    }
  };

  const handleMasterCleanButtonClick = async () => {
    const confirmation = window.confirm('Do you want to start the cleaning process?');
    if (confirmation) {
      setIsCleaning(true);
  
      // Wait for 5 seconds
      await new Promise(resolve => setTimeout(resolve, 5000));
  
      // Start each motor for 20 seconds
      for (let motorNumber = 1; motorNumber <= 6; motorNumber++) {
        try {
          const motorRef = ref(database, `motors/motor${motorNumber}`);
          await set(motorRef, "1"); // Start the motor
          setCleaningMotor(motorNumber); // Update the currently cleaning motor
          // Wait for 20 seconds
          await new Promise(resolve => setTimeout(resolve, 20000));
          await set(motorRef, "0"); // Stop the motor
        } catch (error) {
          console.error(`Error setting motor${motorNumber} value:`, error.message);
        }
      }
  
      // Clear the currently cleaning motor after the cleaning process is done
      setCleaningMotor(null);
  
      // Wait for 5 seconds after the second round of cleaning
      await new Promise(resolve => setTimeout(resolve, 5000));
  
      setIsCleaning(false);
  
      const removeWaterBottlesConfirmation = window.confirm(
        'Cleaning process is successfully completed! Do you want to remove the water bottles for pump maintenance?'
      );
  
      if (removeWaterBottlesConfirmation) {
        // Start each motor for 8 seconds
        for (let motorNumber = 1; motorNumber <= 6; motorNumber++) {
          try {
            const motorRef = ref(database, `motors/motor${motorNumber}`);
            await set(motorRef, "1"); // Start the motor
            // Wait for 8 seconds
            await new Promise(resolve => setTimeout(resolve, 8000));
            await set(motorRef, "0"); // Stop the motor
          } catch (error) {
            console.error(`Error setting motor${motorNumber} value:`, error.message);
          }
        }
  
        // Wait for 5 seconds after the third round of motor activation
        await new Promise(resolve => setTimeout(resolve, 5000));
  
        alert('Motor activation after cleaning is completed!');
      }
    }
  };



  return (
    <Container maxWidth="md" style={{ marginTop: '50px' }}>
      <Paper elevation={3} style={{ padding: '20px' }}>
        {isLoggedIn ? (
          <div>
            <Typography variant="h3">Admin Panel</Typography>
            <Typography variant="body1" style={{ marginTop: '10px' }}>
              Welcome, {auth.currentUser.email}!
            </Typography>
            <Button variant="contained" color="error" onClick={handleLogout} style={{ marginTop: '20px' }}>
              Logout
            </Button>

            <Typography variant="h4" style={{ marginTop: '20px' }}>
              Testing the Motors
            </Typography>
            <div style={{ marginTop: '20px' }}>
              {[1, 2, 3, 4, 5, 6].map((motorNumber) => (
                <Button
                  key={motorNumber}
                  variant="contained"
                  color="primary"
                  onMouseDown={() => handleMotorButtonPress(motorNumber)}
                  onTouchStart={() => handleMotorButtonPress(motorNumber)}
                  onMouseUp={() => handleMotorButtonRelease(motorNumber)}
                  onTouchEnd={() => handleMotorButtonRelease(motorNumber)}
                  style={{ marginRight: '10px', marginBottom: '10px' }}
                >
                  Motor {motorNumber}
                </Button>
              ))}
            </div>
            <Typography variant="h4" style={{ marginTop: '20px' }}>
              Clean the Pipes
            </Typography>
            {cleaningMotor && (
              <Typography variant="body1" style={{ marginTop: '10px' }}>
                Cleaning Motor: {cleaningMotor}
              </Typography>
            )}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleMasterCleanButtonClick}
              disabled={isCleaning}
              style={{ marginTop: '20px' }}
            >
              Master Clean
            </Button>

            

          </div>
        ) : (
          <div>
            <Typography variant="h4">Admin Login</Typography>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Button variant="contained" color="primary" onClick={handleLogin} style={{ marginTop: '20px' }}>
              Login
            </Button>
          </div>
        )}
      </Paper>
    </Container>
  );
};

export default AdminPage;
