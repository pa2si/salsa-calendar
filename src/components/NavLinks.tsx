import Link from 'next/link';

const links = [
  { href: '/create-event', label: 'create event' },
  { href: '/my-events', label: 'my events' },
  { href: '/', label: 'calendar' },
];

type DrawerRefType = React.RefObject<HTMLInputElement>;

const NavLinks = ({ drawerRef }: { drawerRef: DrawerRefType }) => {
  const handleMenuClick = () => {
    if (drawerRef.current) {
      drawerRef.current.click(); // Trigger the click event on drawerRef if it's not null
    }
  };

  return (
    <ul className="menu border-l-3 border-double border-gray-500 ">
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className="btn capitalize text-white bg-blue-500 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 rounded-lg px-4 py-2 mx-1 transition duration-150 ease-in-out"
              onClick={handleMenuClick}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};
export default NavLinks;
