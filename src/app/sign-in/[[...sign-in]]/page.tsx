import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-svh flex justify-center items-center">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary:
              'bg-blue-500 hover:bg-blue-700 text-sm normal-case',
          },
        }}
      />
    </div>
  );
}
