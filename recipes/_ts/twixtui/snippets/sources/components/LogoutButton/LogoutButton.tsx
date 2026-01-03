import React from 'react';
import { TwixtButton } from '@web-slate/twixt-ui-react';

const Logout = (): JSX.Element => {
  const handleLogout = (): void => {
    window.location.href = '/logout';
  };

  return <TwixtButton onClick={handleLogout}>Logout</TwixtButton>;
};

export default Logout;
