import { ChevronLeft, ChevronRight } from "lucide-react";

interface BlogPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export default function BlogPagination({
  page,
  totalPages,
  onPageChange,
}: BlogPaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-8 flex justify-center gap-2">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronLeft size={16} />
      </button>

      {Array.from({ length: totalPages }, (_, index) => index + 1).map(
        (pageNumber) => (
          <button
            key={pageNumber}
            onClick={() => onPageChange(pageNumber)}
            className={`cursor-pointer rounded-md border px-3 py-1.5 text-sm font-medium ${
              pageNumber === page
                ? "border-zinc-900 bg-zinc-900 text-white"
                : "border-zinc-300 text-zinc-700"
            }`}
          >
            {pageNumber}
          </button>
        )
      )}

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="inline-flex cursor-pointer items-center gap-1 rounded-md border border-zinc-300 px-3 py-1.5 text-sm font-medium text-zinc-700 disabled:cursor-not-allowed disabled:opacity-50"
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
