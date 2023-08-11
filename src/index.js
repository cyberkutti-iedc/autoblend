import React from 'react';
import ReactDOM from 'react-dom';
import { LockProvider } from './components/LockContext'; // Import the LockProvider
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import './css/styles.css';

// Use ReactDOM.createRoot to render the LockProvider and App component
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <LockProvider> {/* Wrap the App component with LockProvider */}
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </LockProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
