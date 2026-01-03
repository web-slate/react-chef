import React from 'react';
import Version from '../Version';

// No props, so just an empty object type
export default function Footer(): JSX.Element {
  return (
    <footer className="p-4 fixed bottom-0 w-full">
      <div className="container mx-auto text-center">
        <Version />
      </div>
    </footer>
  );
}
