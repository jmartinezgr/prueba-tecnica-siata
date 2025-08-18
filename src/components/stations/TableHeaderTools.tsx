import { Input, Select, SelectItem, Button } from "@heroui/react";
import { IconSearch, IconPlus } from "@tabler/icons-react";
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
      <div className="flex justify-between gap-3 items-end">
        <Input
          isClearable
          className="w-full sm:max-w-[44%]"
          placeholder="Buscar por nombre, ubicación o tipo..."
          startContent={<IconSearch size={18} />}
          value={filterValue}
          onClear={onClear}
          onValueChange={onSearchChange}
        />

        <div className="flex gap-3">
          <Select
            className="max-w-xs"
            label="Estado"
            placeholder="Todos los estados"
            selectedKeys={statusFilter === "all" ? [] : [statusFilter]}
            onSelectionChange={(keys) => {
              const selected = Array.from(keys)[0] as string;

              setStatusFilter(selected || "all");
            }}
          >
            <SelectItem key="all">Todos</SelectItem>
            <SelectItem key="active">Activo</SelectItem>
            <SelectItem key="inactive">Inactivo</SelectItem>
            <SelectItem key="maintenance">Mantenimiento</SelectItem>
          </Select>

          <Button
            color="primary"
            size="lg"
            startContent={<IconPlus size={18} />}
            onPress={handleAdd}
          >
            Agregar Estación
          </Button>
        </div>
      </div>

      {/* Fila inferior con total y filas por página */}
      <div className="flex justify-between items-center">
        <span className="text-default-400 text-small">
          Total {stationsCount} estaciones
        </span>

        <label className="flex items-center text-default-400 text-small">
          Filas por página:
          <select
            className="bg-transparent outline-none text-default-400 text-small ml-2"
            onChange={() => setPage(1)} // ⚠️ aquí seguro luego quieres actualizar el límite también
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
