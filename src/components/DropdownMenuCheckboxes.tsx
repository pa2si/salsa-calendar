import { useFormContext } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { EventGenre } from '@/types/types';

type DropdownMenuCheckboxesProps = {
  genres: (keyof typeof EventGenre)[];
};

const DropdownMenuCheckboxes: React.FC<DropdownMenuCheckboxesProps> = ({
  genres,
}) => {
  const {
    register,
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const checkedGenres = watch('checkedGenres') || [];

  const handleCheckboxChange = (genreValue: string) => {
    const newCheckedGenres = checkedGenres.includes(genreValue)
      ? checkedGenres.filter((value: any) => value !== genreValue)
      : [...checkedGenres, genreValue];
    setValue('checkedGenres', newCheckedGenres, { shouldValidate: true });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button>Genre</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 max-h-[20rem] overflow-scroll">
          <DropdownMenuLabel>You can select multiple genres</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {genres.map((genre) => (
            <DropdownMenuCheckboxItem
              key={genre}
              checked={checkedGenres.includes(genre)}
              onCheckedChange={() => handleCheckboxChange(genre)}
            >
              {EventGenre[genre]}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <ErrorMessage
        errors={errors}
        name="checkedGenres"
        as="p"
        render={({ message }: { message: string }) => (
          <p className="text-red-500 mt-2">{message}</p>
        )}
      />
    </div>
  );
};

export default DropdownMenuCheckboxes;
