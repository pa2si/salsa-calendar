'use client';
import { Input } from './ui/input';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { EventGenre } from '@/types/types';
import { Button } from './ui/button';

function SearchForm() {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get('search') as string;
    const genres = formData.getAll('genres') as string[]; // Changed to getAll for potential multiple selections
    console.log(search, genres);
  };

  return (
    <form
      className="mb-16 p-8 grid sm:grid-cols-2 md:grid-cols-3 gap-4 rounded-lg"
      onSubmit={handleSubmit}
    >
      <Input type="text" placeholder="Search Events" name="search" />
      <Select name="genres">
        {' '}
        {/* Added `multiple` if needed */}
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {['all', ...Object.values(EventGenre)].map((genre) => (
            <SelectItem key={genre} value={genre}>
              {genre}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Button type="submit" className="bg-blue-500 hover:bg-blue-700">
        Search
      </Button>
    </form>
  );
}
export default SearchForm;
