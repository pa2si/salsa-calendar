'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

type ButtonContainerProps = {
  currentPage: number;
  totalPages: number;
};

type ButtonProps = {
  page: number;
  activeClass: boolean;
};

function ButtonContainer({ currentPage, totalPages }: ButtonContainerProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const handlePageChange = (page: number) => {
    const defaultParams = {
      search: searchParams.get('search') || '',
      page: String(page),
    };
    let params = new URLSearchParams(defaultParams);

    router.push(`${pathname}?${params.toString()}`);
  };

  const addPageButton = ({ page, activeClass }: ButtonProps) => {
    return (
      <Button
        key={page}
        size="icon"
        variant={activeClass ? 'default' : 'outline'}
        onClick={() => handlePageChange(page)}
      >
        {page}
      </Button>
    );
  };

  const renderPageButtons = () => {
    const pageButtons = [];

    if (totalPages > 3) {
      // First page
      pageButtons.push(
        addPageButton({ page: 1, activeClass: currentPage === 1 })
      );

      // Dots before current page
      if (currentPage > 3) {
        pageButtons.push(
          <Button size="icon" variant="outline" key="dots-1">
            ...
          </Button>
        );
      }

      // Page before current page
      if (currentPage > 2) {
        pageButtons.push(
          addPageButton({ page: currentPage - 1, activeClass: false })
        );
      }

      // Current page
      if (currentPage !== 1 && currentPage !== totalPages) {
        pageButtons.push(
          addPageButton({
            page: currentPage,
            activeClass: true,
          })
        );
      }

      // Page after current page
      if (currentPage < totalPages - 1) {
        pageButtons.push(
          addPageButton({ page: currentPage + 1, activeClass: false })
        );
      }

      // Dots after current page
      if (currentPage < totalPages - 2) {
        pageButtons.push(
          <Button size="icon" variant="outline" key="dots-2">
            ...
          </Button>
        );
      }

      // Last page
      pageButtons.push(
        addPageButton({
          page: totalPages,
          activeClass: currentPage === totalPages,
        })
      );
    } else {
      for (let page = 1; page <= totalPages; page++) {
        pageButtons.push(
          addPageButton({ page, activeClass: currentPage === page })
        );
      }
    }

    return pageButtons;
  };

  return (
    <div className="flex gap-x-2">
      {/* Left navigation */}
      <Button
        className="flex items-center gap-x-2"
        variant="outline"
        onClick={() => {
          let prevPage = currentPage - 1;
          if (prevPage < 1) prevPage = totalPages;
          handlePageChange(prevPage);
        }}
      >
        <ChevronLeft />
      </Button>
      {renderPageButtons()}
      {/* Right navigation */}
      <Button
        className="flex items-center gap-x-2"
        onClick={() => {
          let nextPage = currentPage + 1;
          if (nextPage > totalPages) nextPage = 1;
          handlePageChange(nextPage);
        }}
        variant="outline"
      >
        <ChevronRight />
      </Button>
    </div>
  );
}

export default ButtonContainer;
