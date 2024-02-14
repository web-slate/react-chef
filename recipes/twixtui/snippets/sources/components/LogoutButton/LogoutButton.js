import React from 'react';
import { TwixtButton} from 'TwixtUI/react'

const Logout = () => {
  const handleLogout = () => {
    window.location.href = '/logout';
  };

  return <TwixtButton onClick={handleLogout}>Logout</TwixtButton>;
};

export default Logout;
