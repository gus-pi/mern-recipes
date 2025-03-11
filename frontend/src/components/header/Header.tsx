import { useState } from 'react';
import DesktopNavbar from './DesktopNavbar';
import logo from '/logo.svg';
import MobileNavbar from './MobileNavbar';

const Header = () => {
  const [hideLeft, setHideLeft] = useState('-left-[1000px]');
  const menuItems = ['recipes', 'about', 'contact'];

  const onOpen = () => {
    setHideLeft('left-0');
  };

  const onClose = () => {
    setHideLeft('-left-[1000px]');
  };

  return (
    <>
      <div className="max-[900px]:hidden">
        <DesktopNavbar menuItems={menuItems} logo={logo} />
      </div>
      <div className="min-[900px]:hidden">
        <MobileNavbar
          menuItems={menuItems}
          logo={logo}
          onClose={onClose}
          onOpen={onOpen}
          hideLeft={hideLeft}
        />
      </div>
    </>
  );
};

export default Header;
