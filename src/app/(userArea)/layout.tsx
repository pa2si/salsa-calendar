export default function userAreaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="lg:ml-96 pt-20 pb-20 lg:pt-0 lg:pb-0 min-h-svh flex">
      <div className="flex-grow flex justify-center items-center">
        <div className="w-full max-w-4xl bg-gray-100 p-8 rounded-lg">
          {children}
        </div>
      </div>
    </section>
  );
}
