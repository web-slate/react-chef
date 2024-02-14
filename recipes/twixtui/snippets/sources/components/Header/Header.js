import React from 'react'
import { TwixtHeader, TwixtToolName } from 'TwixtUI/react'
import LogoutButton from '../LogoutButton';

export default function Header({ onHamburgerClick }) {
  return (
    <TwixtHeader headerClass="bg-blue-300" rightBlock={(
       <LogoutButton />
    )} onHamburgerClick={onHamburgerClick}>
      <TwixtToolName name="Ecospace" />
    </TwixtHeader>
  );
}