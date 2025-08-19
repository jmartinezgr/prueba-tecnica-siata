import { useState, useMemo } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Chip,
  Tooltip,
  Card,
  CardBody,
  Skeleton,
} from "@heroui/react";
import {
  IconEdit,
  IconTrash,
  IconMapPin,
  IconThermometer,
  IconWifi,
  IconWifiOff,
  IconTool,
} from "@tabler/icons-react";
import { useQuery } from "@tanstack/react-query";

import DefaultLayout from "@/layouts/default";
import { Station } from "@/types/stations";
import StatusChip from "@/components/stations/StatusChip";
import TableFooter from "@/components/stations/TableFooter";
import TableHeaderTools from "@/components/stations/TableHeaderTools";
import { useStationsTable } from "@/hooks/useStationsTable";
import { fetchStations } from "@/services/stations";

// Tipos para TypeScript

const StationsPage = () => {
  const [stations, setStations] = useState<Station[]>([]);
  const {
    filterValue,
    setFilterValue,
    statusFilter,
    setStatusFilter,
    page,
    setPage,
    pages,
    items,
    filteredItems,
  } = useStationsTable(stations);

  const stationsQuery = useQuery({
    queryKey: ["stations"],
    queryFn: () =>
      fetchStations().then((data) => {
        setStations(data);

        return data;
      }),
    refetchOnWindowFocus: true,
  });

  // Función para manejar búsqueda
  const onSearchChange = (value?: string) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  };

  const onClear = () => {
    setFilterValue("");
    setPage(1);
  };

  // Funciones para acciones CRUD (placeholder)
  const handleAdd = () => {
    // TODO: Abrir modal de agregar estación
    console.log("Add station");
  };

  const handleEdit = (station: Station) => {
    // TODO: Abrir modal de editar estación
    console.log("Edit station:", station);
  };

  const handleDelete = async (stationId: string) => {
    // TODO: Implementar confirmación y llamada a API
    console.log("Delete station:", stationId);
    // setStations(stations.filter(s => s.id !== stationId));
  };

  // Formatear fecha
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString("es-ES", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Top content con búsqueda y filtros
  const topContent = useMemo(() => {
    return (
      <TableHeaderTools
        filterValue={filterValue}
        handleAdd={handleAdd}
        setPage={setPage}
        setStatusFilter={setStatusFilter}
        stationsCount={stations.length}
        statusFilter={statusFilter}
        onClear={onClear}
        onSearchChange={onSearchChange}
      />
    );
  }, [filterValue, statusFilter, stations.length, onSearchChange]);
  // Bottom content con paginación
  const bottomContent = useMemo(() => {
    return (
      <TableFooter
        page={page}
        pages={pages}
        setPage={setPage}
        totalItems={filteredItems.length}
      />
    );
  }, [page, pages, filteredItems.length]);

  return (
    <DefaultLayout>
      <div className="flex flex-col gap-6 p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold text-primary">
            Estaciones Meteorológicas
          </h1>
          <p className="text-default-500">
            Gestiona y monitorea todas las estaciones meteorológicas en tiempo
            real
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <Card>
            <CardBody className="flex flex-row items-center gap-4 p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-success-50 dark:bg-success-900/20">
                <IconWifi className="text-success" size={24} />
              </div>
              <div>
                <p className="text-small text-default-500">Activas</p>
                <p className="text-2xl font-semibold text-success">
                  {stations.filter((s) => s.status === "active").length}
                </p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="flex flex-row items-center gap-4 p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-danger-50 dark:bg-danger-900/20">
                <IconWifiOff className="text-danger" size={24} />
              </div>
              <div>
                <p className="text-small text-default-500">Inactivas</p>
                <p className="text-2xl font-semibold text-danger">
                  {stations.filter((s) => s.status === "inactive").length}
                </p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="flex flex-row items-center gap-4 p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-warning-50 dark:bg-warning-900/20">
                <IconTool className="text-warning" size={24} />
              </div>
              <div>
                <p className="text-small text-default-500">Mantenimiento</p>
                <p className="text-2xl font-semibold text-warning">
                  {stations.filter((s) => s.status === "maintenance").length}
                </p>
              </div>
            </CardBody>
          </Card>

          <Card>
            <CardBody className="flex flex-row items-center gap-4 p-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-primary-50 dark:bg-primary-900/20">
                <IconThermometer className="text-primary" size={24} />
              </div>
              <div>
                <p className="text-small text-default-500">Temp. Promedio</p>
                <p className="text-2xl font-semibold text-primary">
                  {Math.round(
                    stations.reduce((acc, s) => acc + s.temp, 0) /
                      stations.length
                  )}
                  °C
                </p>
              </div>
            </CardBody>
          </Card>
        </div>

        {/* Table */}

        <Table
          isHeaderSticky
          aria-label="Tabla de estaciones meteorológicas"
          bottomContent={bottomContent}
          bottomContentPlacement="outside"
          classNames={{
            wrapper: " min-w-5xl", // ✅ Altura fija
            table: "min-h-[200px]", // ✅ Altura mínima
            thead: "sticky top-0", // ✅ Header fijo,
          }}
          sortDescriptor={{
            column: "name",
            direction: "ascending",
          }}
          topContent={topContent}
          topContentPlacement="outside"
        >
          <TableHeader>
            <TableColumn key="id" className="text-center">
              ID
            </TableColumn>
            <TableColumn key="name">NOMBRE</TableColumn>
            <TableColumn key="location">UBICACIÓN</TableColumn>
            <TableColumn key="status" className="text-center">
              ESTADO
            </TableColumn>
            <TableColumn key="coordinates" className="text-center">
              COORDENADAS
            </TableColumn>
            <TableColumn key="type">TIPO</TableColumn>
            <TableColumn key="last_answer">ÚLTIMA LECTURA</TableColumn>
            <TableColumn key="temp" className="text-center">
              TEMPERATURA
            </TableColumn>
            <TableColumn key="actions" className="text-center">
              ACCIONES
            </TableColumn>
          </TableHeader>
          <TableBody
            items={items}
            loadingContent={<Skeleton className="w-full h-8" />}
          >
            {(item) => (
              <TableRow key={item.id}>
                <TableCell className="text-center font-mono text-small">
                  #{item.id}
                </TableCell>
                <TableCell>
                  <div className="flex flex-col">
                    <p className="text-bold text-small capitalize">
                      {item.name}
                    </p>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <IconMapPin className="text-default-400" size={16} />
                    <span>{item.location}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <StatusChip status={item.status} />
                </TableCell>
                <TableCell className="text-center">
                  <div className="text-small">
                    <div>{item.latitude.toFixed(4)}</div>
                    <div className="text-default-400">
                      {item.longitude.toFixed(4)}
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <Chip color="default" size="sm" variant="flat">
                    {item.type}
                  </Chip>
                </TableCell>
                <TableCell>
                  <span className="text-small">
                    {formatDate(item.last_answer)}
                  </span>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center justify-center gap-1">
                    <IconThermometer className="text-primary" size={16} />
                    <span className="font-semibold">{item.temp}°C</span>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <div className="flex items-center gap-2 justify-center">
                    <Tooltip content="Editar estación">
                      <Button
                        isIconOnly
                        color="primary"
                        size="sm"
                        variant="flat"
                        onPress={() => handleEdit(item)}
                      >
                        <IconEdit size={16} />
                      </Button>
                    </Tooltip>
                    <Tooltip color="danger" content="Eliminar estación">
                      <Button
                        isIconOnly
                        color="danger"
                        size="sm"
                        variant="flat"
                        onPress={() => handleDelete(item.id)}
                      >
                        <IconTrash size={16} />
                      </Button>
                    </Tooltip>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </DefaultLayout>
  );
};

export default StationsPage;
