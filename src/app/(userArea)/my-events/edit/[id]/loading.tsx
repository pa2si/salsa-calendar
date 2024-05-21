import { Skeleton } from '@nextui-org/react';
import {
  Card,
  CardHeader,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

function loading() {
  return (
    <Card className="space-y-8 rounded p-6">
      <CardHeader>
        <Skeleton className="h-8 w-36 mb-6 rounded-lg" />
      </CardHeader>
      <Separator />
      <CardContent className="grid gap-4 sm:grid-cols-2 items-start">
        {/* Event Name */}
        <Skeleton className="h-10 w-full rounded-lg" />
        {/* Date and Time */}
        <div className="flex flex-row w-full sm:w-64 md:w-80 lg:w-72 xl:w-80 gap-4">
          <Skeleton className="h-10 w-full rounded-lg" />
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
        {/* Location Name */}
        <Skeleton className="h-10 w-full rounded-lg" />
        {/* Street */}
        <Skeleton className="h-10 w-full rounded-lg" />
        {/* City */}
        <Skeleton className="h-10 w-full rounded-lg" />
        {/* Postal Code */}
        <Skeleton className="h-10 w-full rounded-lg" />
        {/* Country */}
        <Skeleton className="h-10 w-full rounded-lg" />
        {/* Maps Link */}
        <Skeleton className="h-10 w-full rounded-lg" />
        {/* Genres */}
        <div className="flex flex-col mt-2 gap-2">
          <Skeleton className="h-6 w-12 mb-2 rounded-lg" />
          <Skeleton className="h-10 w-36 rounded-lg" />
        </div>
        {/* Image Upload */}
        <div className="flex flex-col mt-2 gap-2">
          <Skeleton className="h-6 w-24 mb-2 rounded-lg" />
          <Skeleton className="h-10 w-44 rounded-lg" />
        </div>
      </CardContent>
      <Separator />
      <CardFooter>
        <Skeleton className="h-12 w-full rounded-lg" />
      </CardFooter>
    </Card>
  );
}
export default loading;

// import { ImSpinner8 } from 'react-icons/im';

// export default function Loading() {
//   // Or a custom loading skeleton component
//   return (
//     <div className="h-screen flex justify-center items-center  ">
//       <div className="animate-spin">
//         <ImSpinner8 size={30} />
//       </div>
//     </div>
//   );
// }
