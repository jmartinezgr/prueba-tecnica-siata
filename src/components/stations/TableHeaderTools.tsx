import { Button, Input, Select, SelectItem } from "@heroui/react";
import { IconPlus, IconSearch } from "@tabler/icons-react";
import React from "react";

interface TableHeaderToolsProps {
  filterValue: string;
  onClear: () => void;
  onSearchChange: (value: string) => void;
  statusFilter: string;
  setStatusFilter: (value: string) => void;
  handleAdd: () => void;
  stationsCount: number;
  setPage: (page: number) => void;
}

const TableHeaderTools: React.FC<TableHeaderToolsProps> = ({
  filterValue,
  onClear,
  onSearchChange,
  statusFilter,
  setStatusFilter,
  handleAdd,
  stationsCount,
  setPage,
}) => {
  return (
    <div className="flex flex-col gap-4">
      {/* Fila superior con búsqueda, select y botón */}
      <div className="flex flex-col sm:flex-row gap-3 sm:gap-3 sm:justify-between">
        {/* Input de búsqueda - ancho completo en móvil */}
        <Input
          isClearable
          aria-label="Buscar estación"
          className="w-full sm:flex-1 sm:max-w-lg"
          placeholder="Buscar estación..."
          size="sm"
          startContent={<IconSearch size={16} />}
          value={filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />

        {/* Contenedor para Select y Botón */}
        <div className="flex gap-2 sm:gap-3">
          {/* Select de filtro */}
          <Select
            aria-label="Filtrar por estado"
            className="w-2/3 sm:w-80"
            placeholder="Estado"
            selectedKeys={statusFilter === "all" ? [] : [statusFilter]}
            size="sm"
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;

              setStatusFilter(selected || "all");
              setPage(1);
            }}
          >
            <SelectItem key="all">Todos</SelectItem>
            <SelectItem key="active">Activo</SelectItem>
            <SelectItem key="inactive">Inactivo</SelectItem>
            <SelectItem key="maintenance">Mantenimiento</SelectItem>
          </Select>

          {/* Botón Agregar */}
          <Button
            className="whitespace-nowrap"
            color="primary"
            size="sm"
            startContent={<IconPlus size={16} />}
            onPress={handleAdd}
          >
            <span className="hidden sm:inline">Agregar Estación</span>
            <span className="sm:hidden">Agregar</span>
          </Button>
        </div>
      </div>

      {/* Fila inferior con total y filas por página */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
        <span className="text-default-400 text-xs sm:text-small">
          Total {stationsCount} estaciones
        </span>

        <label className="flex items-center text-default-400 text-xs sm:text-small">
          <span className="hidden sm:inline">Filas por página:</span>
          <span className="sm:hidden">Mostrar:</span>
          <select
            className="bg-transparent outline-none text-default-400 text-xs sm:text-small ml-2 border border-default-200 rounded px-2 py-1"
            onChange={() => setPage(1)}
          >
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </label>
      </div>
    </div>
  );
};

export default TableHeaderTools;
