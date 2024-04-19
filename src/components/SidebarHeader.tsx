import Image from 'next/image';
import Link from 'next/link';

type DrawerRefType = React.RefObject<HTMLInputElement>;

const SidebarHeader = ({ drawerRef }: { drawerRef: DrawerRefType }) => {
  const handleMenuClick = () => {
    if (drawerRef.current) {
      drawerRef.current.click(); // Trigger the click event on drawerRef if it's not null
    }
  };

  return (
    <Link
      href="/"
      className="flex items-center hover:scale-105 transition-all duration-200 ease-in-out origin-bottom -rotate-12 mb-8 "
      onClick={handleMenuClick}
    >
      <Image src="/calendar.png" alt="calendar" width={90} height={90} />

      <p className="text-xl font-bold">
        Salsa <span className="text-red-600">Calendar</span>
      </p>
    </Link>
  );
};
export default SidebarHeader;
