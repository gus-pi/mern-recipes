import { RiCloseCircleLine } from 'react-icons/ri';
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from 'react-router-dom';

type MobileNavbarTypes = {
  menuItems: string[];
  logo: string;
  onClose: () => void;
  onOpen: () => void;
  hideLeft: string;
};

const MobileNavbar = ({
  menuItems,
  logo,
  onClose,
  onOpen,
  hideLeft,
}: MobileNavbarTypes) => {
  return (
    <div className="h-16 flex justify-between items-center px-6 lg:px-12">
      <a href="/">
        <img src={logo} alt="logo" />
      </a>
      <button onClick={onOpen} className="border border-primary rounded">
        <RxHamburgerMenu className="w-7 h-7" />
      </button>
      <div
        className={`transition-all w-full h-full fixed bg-primary z-50 top-0 ${hideLeft} flex justify-center items-center `}
      >
        <button onClick={onClose} className="absolute right-8 top-32">
          <RiCloseCircleLine className="w-7 h-7" />
        </button>
        <div>
          <ul className="flex flex-col gap-5">
            {menuItems.map((menu, index) => (
              <li key={index}>
                <Link
                  to={menu}
                  className="font-medium capitalize text-secondary text-2xl"
                >
                  {menu}
                </Link>
              </li>
            ))}
          </ul>
          {/* login and sign up buttons */}
          <ul className="flex items-center gap-4 font-medium mt-10">
            <li>
              <button className="text-secondary px-4 py-2 rounded border">
                Log In
              </button>
            </li>
            <li>
              <button className="text-secondary px-4 py-2 rounded border">
                Sign Up
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default MobileNavbar;
