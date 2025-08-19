import React from "react";
import { Input, Select, SelectItem, NumberInput } from "@heroui/react";
import {
  IconMapPin,
  IconWifi,
  IconBattery,
  IconDeviceDesktop,
  IconTemperature,
} from "@tabler/icons-react";

const statusOptions = [
  { key: "active", label: "Activa" },
  { key: "inactive", label: "Inactiva" },
  { key: "maintenance", label: "Mantenimiento" },
];

interface StationFormFieldsProps {
  formData: any;
  errors: any;
  stationId?: string | null;
  onInputChange: (field: string, value: any) => void;
  getStatusValue: (status: any) => string;
  onStatusChange: (value: string) => void;
}

export const StationFormFields: React.FC<StationFormFieldsProps> = ({
  formData,
  errors,
  stationId,
  onInputChange,
  getStatusValue,
  onStatusChange,
}) => {
  return (
    <div className="space-y-4">
      <Input
        isRequired
        errorMessage={errors.name}
        isInvalid={!!errors.name}
        label="Nombre de la estación"
        placeholder="Ingresa el nombre de la estación"
        startContent={<IconDeviceDesktop size={18} />}
        value={formData.name}
        onValueChange={(value: string) => onInputChange("name", value)}
      />

      <Input
        isRequired
        errorMessage={errors.location}
        isInvalid={!!errors.location}
        label="Ubicación"
        placeholder="Ciudad, Departamento"
        startContent={<IconMapPin size={18} />}
        value={formData.location}
        onValueChange={(value: string) => onInputChange("location", value)}
      />

      <div className="grid grid-cols-2 gap-3">
        <NumberInput
          isRequired
          errorMessage={errors.latitude}
          isInvalid={!!errors.latitude}
          label="Latitud"
          placeholder="6.2442"
          value={stationId ? formData.latitude : undefined}
          onValueChange={(value: number) =>
            onInputChange("latitude", value || 0)
          }
        />
        <NumberInput
          isRequired
          errorMessage={errors.longitude}
          isInvalid={!!errors.longitude}
          label="Longitud"
          placeholder="-75.5812"
          value={stationId ? formData.longitude : undefined}
          onValueChange={(value: number) =>
            onInputChange("longitude", value || 0)
          }
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Select
          isRequired
          label="Estado"
          selectedKeys={[getStatusValue(formData.status)]}
          startContent={<IconWifi size={18} />}
          onSelectionChange={(keys) => {
            const status = Array.from(keys)[0] as string;

            onStatusChange(status);
          }}
        >
          {statusOptions.map((option) => (
            <SelectItem key={option.key}>{option.label}</SelectItem>
          ))}
        </Select>

        <Input
          isRequired
          errorMessage={errors.type}
          isInvalid={!!errors.type}
          label="Tipo"
          placeholder="Tipo de estación"
          startContent={<IconBattery size={18} />}
          value={formData.type}
          onValueChange={(value: string) => onInputChange("type", value)}
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <NumberInput
          isRequired
          errorMessage={errors.temp}
          isInvalid={!!errors.temp}
          label="Temperatura (°C)"
          placeholder="24.5"
          startContent={<IconTemperature size={18} />}
          value={stationId ? formData.temp : undefined}
          onValueChange={(value: number) => onInputChange("temp", value || 0)}
        />

        <Input
          isRequired
          label="Última respuesta"
          placeholder="Fecha y hora"
          type="datetime-local"
          value={formData.last_answer}
          onValueChange={(value: string) => onInputChange("last_answer", value)}
        />
      </div>
    </div>
  );
};
