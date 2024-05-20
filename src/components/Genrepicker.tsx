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

type GenrepickerProps = {
  genres: (keyof typeof EventGenre)[];
};

const Genrepicker: React.FC<GenrepickerProps> = ({ genres }) => {
  const {
    setValue,
    watch,
    formState: { errors },
  } = useFormContext();
  const selectedGenres = watch('genres') || [];

  const handleCheckboxChange = (genreValue: string) => {
    const newSelectedGenres = selectedGenres.includes(genreValue)
      ? selectedGenres.filter((value: any) => value !== genreValue)
      : [...selectedGenres, genreValue];
    setValue('genres', newSelectedGenres, { shouldValidate: true });
  };

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className="bg-gray-700">CHOOSE THE GENRE</Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 max-h-[20rem] overflow-scroll">
          <DropdownMenuLabel>You can select multiple genres</DropdownMenuLabel>
          <DropdownMenuSeparator />
          {genres.map((genre) => (
            <DropdownMenuCheckboxItem
              key={genre}
              checked={selectedGenres.includes(genre)}
              onCheckedChange={() => handleCheckboxChange(genre)}
            >
              {EventGenre[genre]}
            </DropdownMenuCheckboxItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
      <ErrorMessage
        errors={errors}
        name="genres"
        as="p"
        render={({ message }: { message: string }) => (
          <p className="text-red-500 mt-3">{message}</p>
        )}
      />
      {selectedGenres.length > 0 && (
        <p className="mt-3">Selected Genres: {selectedGenres.join(', ')}</p>
      )}
    </div>
  );
};

export default Genrepicker;
