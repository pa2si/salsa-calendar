import Link from 'next/link';

const links = [
  { href: '/create-event', label: 'create event' },
  { href: '/my-events', label: 'my events' },
  { href: '/calendar', label: 'calendar' },
];

const NavLinks = () => {
  return (
    <ul className="menu border-l-1 border-gray-500 ">
      {links.map((link) => {
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              className="capitalize hover:text-lg transition-all duration-200 ease-in-out"
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
