import { SignIn } from '@clerk/nextjs';

export default function Page() {
  return (
    <div className="min-h-svh flex justify-center items-center">
      <SignIn />
    </div>
  );
}
