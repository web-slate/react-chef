import React from 'react';
import { LeftSideBar } from 'TwixtUI/react'

const MENUS = [
  { id: 1, name: 'Menu 1', link: '#' },
  { id: 2, name: 'Menu 2', link: '#' },
];

export default function Sidebar({ openDrawer, onBlurEvent }) {
  return (
    <LeftSideBar openDrawer={openDrawer} onBlurEvent={onBlurEvent}>
      {MENUS.map((menu) => {
        return (
          <a
            key={menu.id}
            href={menu.link}
            className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
            target="_blank"
          >
            {menu.name}
          </a>
        );
      })}
    </LeftSideBar>
  );
}
