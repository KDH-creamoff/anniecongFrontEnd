import { ChevronLeft, ChevronRight } from 'lucide-react';

const Pagination = ({ currentPage, totalPages, onPageChange, totalItems, itemsPerPage }) => {
  // totalItems와 itemsPerPage가 제공되면, 아이템이 한 페이지를 초과할 때만 표시
  if (totalItems !== undefined && itemsPerPage !== undefined) {
    if (totalItems <= itemsPerPage) {
      return null;
    }
  }

  // totalPages가 1 이하면 페이지네이션 숨김
  if (totalPages <= 1) {
    return null;
  }

  const getPageNumbers = () => {
    const pages = [];
    const maxVisible = 5;

    const currentBlock = Math.floor((currentPage - 1) / maxVisible);

    const startPage = currentBlock * maxVisible + 1;

    const endPage = Math.min(startPage + maxVisible - 1, totalPages);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return pages;
  };

  return (
    <div className='mt-6 flex items-center justify-center gap-2'>
      <button
        onClick={() => onPageChange(Math.max(currentPage - 1, 1))}
        disabled={currentPage === 1}
        className='flex h-8 w-8 items-center justify-center rounded bg-[#e1d6c3] text-[#674529] hover:bg-[#d6c7b3] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#e9dfd3]'
      >
        <ChevronLeft className='h-4 w-4' />
      </button>

      {getPageNumbers().map((pageNum) => (
        <button
          key={pageNum}
          onClick={() => onPageChange(pageNum)}
          className={`h-8 w-8 rounded border ${
            currentPage === pageNum
              ? 'border-[#674529] bg-[#674529] text-white'
              : 'border-gray-300 hover:bg-gray-50'
          }`}
        >
          {pageNum}
        </button>
      ))}

      <button
        onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))}
        disabled={currentPage === totalPages}
        className='flex h-8 w-8 items-center justify-center rounded bg-[#e1d6c3] text-[#674529] hover:bg-[#d6c7b3] disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-[#e9dfd3]'
      >
        <ChevronRight className='h-4 w-4' />
      </button>
    </div>
  );
};

export default Pagination;
