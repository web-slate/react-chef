import React from 'react'
import Version from '../Version';

export default function Footer() {
  return (
    <footer class="p-4 fixed bottom-0 w-full">
      <div class="container mx-auto text-center">
        <Version />
      </div>
    </footer>
  );
}