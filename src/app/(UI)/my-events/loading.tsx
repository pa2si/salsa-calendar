import {
  Card,
  CardFooter,
  CardHeader,
  CardContent,
} from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Skeleton } from '@nextui-org/react';
import SearchFormSkeleton from '@/components/SearchFormSkeleton';

function loading() {
  return (
    <div>
      {/* Search Form Skeleton */}
      <SearchFormSkeleton />

      {/* Event Card Skeletons */}
      <div className="grid md:grid-cols-2 gap-8">
        <Card className="">
          <CardHeader>
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-1/2 mt-2 rounded-lg" />
          </CardHeader>
          <Separator />
          <CardContent className="mt-4">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Skeleton className="h-4 w-20 rounded-lg" />
              <Skeleton className="h-4 w-20 rounded-lg" />
            </div>
            <Skeleton className="h-14 w-3/4 rounded-lg" />
            <div className="flex flex-wrap gap-2 my-3">
              <Skeleton className="h-6 w-16 rounded-lg " />
              <Skeleton className="h-6 w-16 rounded-lg" />
              <Skeleton className="h-6 w-16 rounded-lg" />
            </div>
            <Skeleton className="h-56 w-full rounded-lg" />
          </CardContent>
          <Separator />
          <CardFooter className="flex gap-4 mt-4">
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </CardFooter>
        </Card>
        <Card className="">
          <CardHeader>
            <Skeleton className="h-6 w-3/4 rounded-lg" />
            <Skeleton className="h-4 w-1/2 mt-2 rounded-lg" />
          </CardHeader>
          <Separator />
          <CardContent className="mt-4">
            <div className="grid grid-cols-2 gap-3 mb-3">
              <Skeleton className="h-4 w-20 rounded-lg" />
              <Skeleton className="h-4 w-20 rounded-lg" />
            </div>
            <Skeleton className="h-14 w-3/4" />
            <div className="flex flex-wrap gap-2 my-3">
              <Skeleton className="h-6 w-16 rounded-lg" />
              <Skeleton className="h-6 w-16 rounded-lg" />
              <Skeleton className="h-6 w-16 rounded-lg" />
            </div>
            <Skeleton className="h-56 w-full rounded-lg" />
          </CardContent>
          <Separator />
          <CardFooter className="flex gap-4 mt-4">
            <Skeleton className="h-10 w-24 rounded-lg" />
            <Skeleton className="h-10 w-24 rounded-lg" />
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}

export default loading;
