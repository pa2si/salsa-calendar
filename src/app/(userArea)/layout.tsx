import Sidebar from '@/components/Sidebar';

export default function userAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <section className="lg:ml-96">{children}</section>;
}
