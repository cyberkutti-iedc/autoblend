// LockContext.js

import React, { createContext, useContext, useState } from 'react';

const LockContext = createContext();

export const LockProvider = ({ children }) => {
  const [isLocked, setIsLocked] = useState(false);
  const [lockedBy, setLockedBy] = useState(null);

  const lockSite = (user) => {
    setIsLocked(true);
    setLockedBy(user);
  };

  const unlockSite = () => {
    setIsLocked(false);
    setLockedBy(null);
  };

  return (
    <LockContext.Provider value={{ isLocked, lockedBy, lockSite, unlockSite }}>
      {children}
    </LockContext.Provider>
  );
};

export const useLock = () => {
  return useContext(LockContext);
};
