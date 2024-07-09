import React, { useState } from 'react';

function Authenticate({ token }) {
  const [authenticated, setAuthenticated] = useState(false);
  const [authError, setAuthError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [userData, setUserData] = useState(null);

  const handleAuthenticate = async () => {
    try {
      console.log('Authenticating with token:', token);

      const response = await fetch('https://fsa-jwt-practice.herokuapp.com/authenticate', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        }
      });

      if (!response.ok) {
        throw new Error('Authentication failed');
      }

      const result = await response.json();
      console.log('Authentication Result:', result);

      if (result.success) {
        setSuccessMessage(result.message);
        setUserData(result.data); // Set user data received from API
        setAuthenticated(true);
        setAuthError(null);
      } else {
        throw new Error(result.message);
      }
    } catch (err) {
      setAuthError(err.message);
      setSuccessMessage(null);
    }
  };

  return (
    <div>
      <h2>Authenticate Component</h2>
      <button onClick={handleAuthenticate}>Authenticate Token</button>
      {authError && <p>Error: {authError}</p>}
      {successMessage && <p>Success: {successMessage}</p>}
      {authenticated && (
        <div>
          {userData && <p>Username: {userData.username}</p>}
        </div>
      )}
    </div>
  );
};

export default Authenticate;
