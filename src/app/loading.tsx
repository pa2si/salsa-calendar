import DayCardSkeleton from '@/components/DayCardSkeleton';
import SearchFormSkeleton from '@/components/SearchFormSkeleton';
import { ImSpinner8 } from 'react-icons/im';

// export default function Loading() {
//   // Or a custom loading skeleton component
//   return (
//     <div className="flex flex-col items-center p-4">
//       {/* Search Form Skeleton */}
//       <SearchFormSkeleton />

//       {/* Calendar Skeleton */}
//       <div className="flex flex-wrap justify-center items-start gap-4">
//         {Array.from({ length: 30 }).map((_, index) => (
//           <DayCardSkeleton key={index} view="month" />
//         ))}
//       </div>
//     </div>
//   );
// }
export default function Loading() {
  // Or a custom loading skeleton component
  return (
    <div className="w-screen h-screen flex justify-center items-center  ">
      <div className="animate-spin">
        <ImSpinner8 size={30} />
      </div>
    </div>
  );
}
