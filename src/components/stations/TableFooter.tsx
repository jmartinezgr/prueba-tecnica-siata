import { Pagination, Button } from "@heroui/react";
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
    <div className="py-2 px-1 sm:px-2 flex flex-col sm:flex-row gap-3 sm:gap-0 sm:justify-between sm:items-center">
      {/* Texto de resultados - centrado en móvil, izquierda en desktop */}
      <span className="text-center sm:text-left sm:w-[30%] text-xs sm:text-small text-default-400">
        {totalItems === 0
          ? "No hay estaciones"
          : `${totalItems} ${totalItems === 1 ? "estación encontrada" : "estaciones encontradas"}`}
      </span>

      {/* Paginación - centrada */}
      <div className="flex justify-center">
        <Pagination
          isCompact
          className="gap-1"
          color="primary"
          page={page}
          showControls={pages > 1}
          showShadow={false}
          size="sm"
          total={pages}
          onChange={(page) => setPage(page)}
        />
      </div>

      {/* Botones adicionales - ocultos en móvil */}
      <div className="hidden lg:flex w-[30%] justify-end gap-2">
        <Button
          className="text-xs"
          isDisabled={pages <= 1 || page === 1}
          size="sm"
          variant="flat"
          onPress={() => setPage(1)}
        >
          Inicio
        </Button>
        <Button
          className="text-xs"
          isDisabled={pages <= 1 || page === pages}
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
