import React, { useState, useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import {
  IconMapPin,
  IconWifi,
  IconBattery,
  IconDeviceDesktop,
  IconTemperature,
} from "@tabler/icons-react";

import { Station } from "@/types/stations";

type StationFormData = Omit<Station, "id">;

interface StationModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationId?: string | null;
  onSave?: (stationData: StationFormData) => Promise<void>;
  onUpdate?: (
    stationId: string,
    stationData: Partial<Station>
  ) => Promise<void>;
}

interface FormErrors {
  [key: string]: string | null;
}

const StationModal: React.FC<StationModalProps> = ({
  isOpen,
  onClose,
  stationId = null,
  onSave,
  onUpdate,
}) => {
  const [loading, setLoading] = useState<boolean>(false);
  const [saving, setSaving] = useState<boolean>(false);
  const [formData, setFormData] = useState<StationFormData>({
    name: "",
    location: "",
    status: "active",
    latitude: 0,
    longitude: 0,
    type: "monitoring",
    last_answer: "",
    temp: 0,
  });

  const [errors, setErrors] = useState<FormErrors>({});

  // Simular carga de datos de la estación
  const loadStationData = async (id: string): Promise<void> => {
    setLoading(true);
    try {
      // Aquí harías tu llamada a la API
      // const response = await api.getStation(id);
      // const station: Station = response.data;

      // Simulación de datos
      setTimeout(() => {
        const mockStation: Station = {
          id,
          name: `Estación ${id}`,
          location: "Medellín, Antioquia",
          status: "active",
          latitude: 6.2442,
          longitude: -75.5812,
          type: "monitoring",
          last_answer: new Date().toISOString(),
          temp: 24.5,
        };

        setFormData({
          name: mockStation.name,
          location: mockStation.location,
          status: mockStation.status,
          latitude: mockStation.latitude,
          longitude: mockStation.longitude,
          type: mockStation.type,
          last_answer: mockStation.last_answer,
          temp: mockStation.temp,
        });
        setLoading(false);
      }, 1000);
    } catch (error) {
      setLoading(false);
    }
  };

  // Efecto para cargar datos cuando se abre el modal
  useEffect(() => {
    if (isOpen) {
      if (stationId) {
        loadStationData(stationId);
      } else {
        // Reset form for new station
        setFormData({
          name: "",
          location: "",
          status: "active",
          latitude: 0,
          longitude: 0,
          type: "monitoring",
          last_answer: new Date().toISOString(),
          temp: 0,
        });
      }
      setErrors({});
    }
  }, [isOpen, stationId]);

  const handleInputChange = (
    field: keyof StationFormData,
    value: string | number | boolean
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({
        ...prev,
        [field]: null,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "El nombre es requerido";
    }

    if (!formData.location.trim()) {
      newErrors.location = "La ubicación es requerida";
    }

    if (
      isNaN(formData.latitude) ||
      formData.latitude < -90 ||
      formData.latitude > 90
    ) {
      newErrors.latitude = "Latitud debe estar entre -90 y 90";
    }

    if (
      isNaN(formData.longitude) ||
      formData.longitude < -180 ||
      formData.longitude > 180
    ) {
      newErrors.longitude = "Longitud debe estar entre -180 y 180";
    }

    if (!formData.type.trim()) {
      newErrors.type = "El tipo es requerido";
    }

    if (isNaN(formData.temp)) {
      newErrors.temp = "Temperatura debe ser un número válido";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSave = async (): Promise<void> => {
    if (!validateForm()) return;

    setSaving(true);
    try {
      if (stationId && onUpdate) {
        // Actualizar estación existente
        await onUpdate(stationId, formData);
      } else if (onSave) {
        // Crear nueva estación
        await onSave(formData);
      }
      onClose();
    } catch (error) {
      console.error("Error saving station:", error);
    } finally {
      setSaving(false);
    }
  };

  const statusOptions = [
    { key: "active", label: "Activa" },
    { key: "inactive", label: "Inactiva" },
    { key: "maintenance", label: "Mantenimiento" },
  ];

  const typeOptions = [
    { key: "monitoring", label: "Monitoreo" },
    { key: "weather", label: "Meteorológica" },
    { key: "seismic", label: "Sísmica" },
    { key: "water", label: "Calidad del Agua" },
    { key: "air", label: "Calidad del Aire" },
    { key: "noise", label: "Ruido Ambiental" },
  ];

  // Convertir status a string para el Select
  const getStatusValue = (): string => {
    if (typeof formData.status === "boolean") {
      return formData.status ? "active" : "inactive";
    }

    return formData.status;
  };

  const handleStatusChange = (value: string): void => {
    handleInputChange("status", value as "active" | "inactive" | "maintenance");
  };

  return (
    <Modal
      isOpen={isOpen}
      placement="center"
      scrollBehavior="inside"
      size="2xl"
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <IconDeviceDesktop size={24} />
            {stationId ? `Editar Estación #${stationId}` : "Nueva Estación"}
          </div>
        </ModalHeader>

        <ModalBody className="gap-4">
          {loading ? (
            <div className="flex justify-center items-center py-8">
              <Spinner size="lg" />
            </div>
          ) : (
            <>
              {/* Información básica */}
              <div className="space-y-4">
                <Input
                  errorMessage={errors.name}
                  isInvalid={!!errors.name}
                  label="Nombre de la estación"
                  placeholder="Ingresa el nombre de la estación"
                  startContent={<IconDeviceDesktop size={18} />}
                  value={formData.name}
                  onValueChange={(value: string) =>
                    handleInputChange("name", value)
                  }
                />

                <Input
                  errorMessage={errors.location}
                  isInvalid={!!errors.location}
                  label="Ubicación"
                  placeholder="Ciudad, Departamento"
                  startContent={<IconMapPin size={18} />}
                  value={formData.location}
                  onValueChange={(value: string) =>
                    handleInputChange("location", value)
                  }
                />

                {/* Coordenadas */}
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    errorMessage={errors.latitude}
                    isInvalid={!!errors.latitude}
                    label="Latitud"
                    placeholder="6.2442"
                    step="any"
                    type="number"
                    value={formData.latitude.toString()}
                    onValueChange={(value: string) =>
                      handleInputChange("latitude", parseFloat(value) || 0)
                    }
                  />
                  <Input
                    errorMessage={errors.longitude}
                    isInvalid={!!errors.longitude}
                    label="Longitud"
                    placeholder="-75.5812"
                    step="any"
                    type="number"
                    value={formData.longitude.toString()}
                    onValueChange={(value: string) =>
                      handleInputChange("longitude", parseFloat(value) || 0)
                    }
                  />
                </div>

                {/* Estado y Tipo */}
                <div className="grid grid-cols-2 gap-3">
                  <Select
                    label="Estado"
                    selectedKeys={[getStatusValue()]}
                    startContent={<IconWifi size={18} />}
                    onSelectionChange={(keys) => {
                      const status = Array.from(keys)[0] as string;

                      handleStatusChange(status);
                    }}
                  >
                    {statusOptions.map((option) => (
                      <SelectItem key={option.key}>{option.label}</SelectItem>
                    ))}
                  </Select>

                  <Input
                    errorMessage={errors.type}
                    isInvalid={!!errors.type}
                    label="Tipo"
                    placeholder="Tipo de estación"
                    startContent={<IconBattery size={18} />}
                    value={formData.type}
                    onValueChange={(value: string) =>
                      handleInputChange("type", value)
                    }
                  />
                </div>

                {/* Temperatura y Última respuesta */}
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    errorMessage={errors.temp}
                    isInvalid={!!errors.temp}
                    label="Temperatura (°C)"
                    placeholder="24.5"
                    startContent={<IconTemperature size={18} />}
                    step="0.1"
                    type="number"
                    value={formData.temp.toString()}
                    onValueChange={(value: string) =>
                      handleInputChange("temp", parseFloat(value) || 0)
                    }
                  />

                  <Input
                    label="Última respuesta"
                    placeholder="Fecha y hora"
                    type="datetime-local"
                    value={formData.last_answer}
                    onValueChange={(value: string) =>
                      handleInputChange("last_answer", value)
                    }
                  />
                </div>
              </div>
            </>
          )}
        </ModalBody>

        <ModalFooter>
          <Button
            color="danger"
            isDisabled={saving}
            variant="light"
            onPress={onClose}
          >
            Cancelar
          </Button>
          <Button
            color="primary"
            isDisabled={loading}
            isLoading={saving}
            onPress={handleSave}
          >
            {stationId ? "Actualizar" : "Crear"} Estación
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StationModal;
