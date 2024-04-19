import Calendar from '@/components/Calendar';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col max-w-screen-2xl mx-auto items-center justify-between py-16 px-0 md:p-16">
      <Calendar />
    </main>
  );
}
