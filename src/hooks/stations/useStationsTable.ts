import { useMemo, useState } from "react";

import { Station } from "@/types/stations";

export function useStationsTable(stations: Station[]) {
  const [filterValue, setFilterValue] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const rowsPerPage = 10;

  const filteredItems = useMemo(() => {
    let filtered = [...stations];

    if (filterValue) {
      filtered = filtered.filter(
        (s) =>
          s.name.toLowerCase().includes(filterValue.toLowerCase()) ||
          s.location.toLowerCase().includes(filterValue.toLowerCase()) ||
          // eslint-disable-next-line prettier/prettier
          s.type.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (statusFilter !== "all") {
      filtered = filtered.filter((s) => s.status === statusFilter);
    }

    return filtered;
  }, [stations, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;

    return filteredItems.slice(start, start + rowsPerPage);
  }, [page, filteredItems]);

  return {
    filterValue,
    setFilterValue,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    pages,
    filteredItems,
    items,
  };
}
