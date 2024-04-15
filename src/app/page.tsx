import Calendar from '@/components/Calendar';
import Sidebar from '@/components/Sidebar';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between py-16 px-0 md:p-16">
      <Calendar />
      <Sidebar />
    </main>
  );
}
