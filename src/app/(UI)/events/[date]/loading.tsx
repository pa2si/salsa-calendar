import { ImSpinner8 } from 'react-icons/im';

export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="h-screen flex justify-center items-center  ">
      <div className="animate-spin">
        <ImSpinner8 size={30} />
      </div>
    </div>
  );
}
