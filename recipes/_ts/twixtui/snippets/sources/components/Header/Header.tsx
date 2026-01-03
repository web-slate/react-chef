import React from 'react';
import { TwixtHeader, TwixtToolName } from '@web-slate/twixt-ui-react';
import LogoutButton from '../LogoutButton';

interface HeaderProps {
  onHamburgerClick: () => void; // Assuming it’s a function with no arguments
}

export default function Header({ onHamburgerClick }: HeaderProps): JSX.Element {
  return (
    <TwixtHeader
      headerClass="bg-blue-300"
      rightBlock={<LogoutButton />}
      onHamburgerClick={onHamburgerClick}
    >
      <TwixtToolName name="App Name" />
    </TwixtHeader>
  );
}
