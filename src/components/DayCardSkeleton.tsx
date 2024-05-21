import { Card, CardBody, CardFooter } from '@nextui-org/react';
import { Skeleton } from '@nextui-org/react';

interface DayCardSkeletonProps {
  view: 'day' | 'week' | 'month';
}

const DayCardSkeleton: React.FC<DayCardSkeletonProps> = ({ view }) => {
  const cardHeight = view === 'month' ? 'h-[225px]' : 'h-full';
  return (
    <Card
      shadow="sm"
      radius="lg"
      className={`relative w-full bg-neutral-50 ${
        view === 'day'
          ? 'max-w-[450px]'
          : view === 'week'
          ? `flex-1 min-w-[140px] max-w-[160px] md:min-w-[280px] md:max-h-[500px] md:max-w-[280px]`
          : `flex-1 min-w-[140px] max-w-[100px] md:min-w-[170px] md:max-w-[160px] ${cardHeight}`
      } `}
    >
      <CardFooter className="flex flex-col md:flex-row justify-between items-center p-2 bg-neutral-100"></CardFooter>
      <CardBody className="overflow-visible p-0 bg-neutral-50">
        <Skeleton className="h-10 w-full rounded-lg" />
        <Skeleton className="h-[180px] w-full rounded-lg mt-2" />
      </CardBody>
    </Card>
  );
};

export default DayCardSkeleton;
