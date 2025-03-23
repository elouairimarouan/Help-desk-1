import React from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";

function Pagination({ pages, currentPage, setCurrentPage }) {
  const generatedPages = Array.from({ length: pages }, (_, i) => i + 1);

  return (
    <nav className="mt-4 flex justify-center space-x-2">
      <Button
        variant="outline"
        size="icon"
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>
      {generatedPages.map((page) => (
        <Button
          key={page}
          variant={currentPage === page ? "default" : "outline"}
          onClick={() => setCurrentPage(page)}
          className={cn("px-3", currentPage === page && "bg-primary text-white")}
        >
          {page}
        </Button>
      ))}
      <Button
        variant="outline"
        size="icon"
        onClick={() => setCurrentPage((next) => Math.min(next + 1, pages))}
        disabled={currentPage === pages}
      >
        <ChevronRight className="w-4 h-4" />
      </Button>
    </nav>
  );
}

export default Pagination;