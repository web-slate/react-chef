import React from 'react';
import { LeftSideBar } from '@web-slate/twixt-ui-react';

interface Menu {
  id: number;
  name: string;
  link: string;
}

const MENUS: Menu[] = [
  { id: 1, name: 'Menu 1', link: '#' },
  { id: 2, name: 'Menu 2', link: '#' },
];

interface SidebarProps {
  openDrawer: boolean;
  onBlurEvent?: () => void; // optional callback
}

export default function Sidebar({ openDrawer, onBlurEvent }: SidebarProps): JSX.Element {
  return (
    <LeftSideBar openDrawer={openDrawer} onBlurEvent={onBlurEvent}>
      {MENUS.map((menu) => (
        <a
          key={menu.id}
          href={menu.link}
          className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-700"
          target="_blank"
        >
          {menu.name}
        </a>
      ))}
    </LeftSideBar>
  );
}
