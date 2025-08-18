import { Pagination, Button } from "@heroui/react"; // o desde donde lo estés importando
import React from "react";

interface TableFooterProps {
  page: number;
  pages: number;
  setPage: (page: number) => void;
  totalItems: number;
}

const TableFooter: React.FC<TableFooterProps> = ({
  page,
  pages,
  setPage,
  totalItems,
}) => {
  return (
    <div className="py-2 px-2 flex justify-between items-center">
      <span className="w-[30%] text-small text-default-400">
        {totalItems === 0
          ? "No hay estaciones"
          : `${totalItems} estaciones encontradas`}
      </span>

      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        page={page}
        total={pages}
        onChange={(page) => setPage(page)}
      />

      <div className="hidden sm:flex w-[30%] justify-end gap-2">
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={() => setPage(1)}
        >
          Inicio
        </Button>
        <Button
          isDisabled={pages === 1}
          size="sm"
          variant="flat"
          onPress={() => setPage(pages)}
        >
          Final
        </Button>
      </div>
    </div>
  );
};

export default TableFooter;
