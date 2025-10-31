import { useState } from "react";

export function usePagination<T>(data: T[], itemsPerPage: number) {
  const [page, setPage] = useState(1);
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const paginated = data.slice((page - 1) * itemsPerPage, page * itemsPerPage);

  const next = () => setPage((p) => Math.min(p + 1, totalPages));
  const prev = () => setPage((p) => Math.max(p - 1, 1));
  const goTo = (num: number) => setPage(num);

  return { page, totalPages, paginated, next, prev, goTo };
}
