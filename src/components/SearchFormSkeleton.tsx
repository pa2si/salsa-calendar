import { Skeleton } from '@nextui-org/react';
import { Card, CardHeader } from './ui/card';

function SearchFormSkeleton() {
  return (
    <Card className="mb-8 grid grid-cols-3 gap-4 py-8 rounded-lg">
      <Skeleton className="h-10 my-4 ml-8 rounded-lg" />
      <Skeleton className="h-10 my-4 rounded-lg" />
      <Skeleton className="h-10 my-4 mr-8 rounded-lg" />
    </Card>
  );
}

export default SearchFormSkeleton;
