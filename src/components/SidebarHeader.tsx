import Image from 'next/image';
import Link from 'next/link';

const SidebarHeader = () => {
  return (
    <Link
      href="/"
      className="flex items-center hover:scale-105 transition-all duration-200 ease-in-out"
    >
      <Image src="/calendar.png" alt="calendar" width={90} height={90} />

      <p className="text-xl font-bold">
        Salsa <span className="text-red-600">Calendar</span>
      </p>
    </Link>
  );
};
export default SidebarHeader;
