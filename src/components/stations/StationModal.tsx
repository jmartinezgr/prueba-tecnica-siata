import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
  addToast,
} from "@heroui/react";
import { IconDeviceDesktop } from "@tabler/icons-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { StationFormFields } from "./StationFormFields";

import { useStationForm } from "@/hooks/stations/useStationForm";
import { useStationModal } from "@/hooks/stations/useStationModal";
import { useStatusHandler } from "@/hooks/stations/useStatusHandler";
import { createStation, updateStation } from "@/services/stations";

interface StationModalProps {
  isOpen: boolean;
  onClose: () => void;
  stationId?: string | null;
}

const StationModal: React.FC<StationModalProps> = ({
  isOpen,
  onClose,
  stationId = null,
}) => {
  const queryClient = useQueryClient();
  const createMutation = useMutation({
    mutationFn: createStation,
    onSuccess: () => {
      addToast({
        title: "Éxito",
        description: `Estación creada correctamente.`,
        color: "success",
      });
      onClose();
    },
    onError: (error) => {
      addToast({
        title: "Error",
        description: `No se pudo crear la estación. ${error.message}`,
        color: "danger",
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: updateStation,
    onSuccess: () => {
      addToast({
        title: "Éxito",
        description: `Estación creada correctamente.`,
        color: "success",
      });
      queryClient.invalidateQueries({ queryKey: ["stations"] });
      onClose();
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 404) {
        addToast({
          title: "Error",
          description: `No se pudo encontrar la estación."`,
          color: "danger",
        });
      } else {
        addToast({
          title: "Error",
          description: `Ocurrio un error editando la estación. Prueba más tarde"`,
          color: "danger",
        });
      }
    },
  });

  const { saving, stationQuery, handleSave } = useStationModal({
    stationId,
    onClose,
    onSave: createMutation.mutateAsync,
    onUpdate: updateMutation.mutateAsync,
  });

  const { formData, errors, handleInputChange, validateForm, resetForm } =
    useStationForm(stationQuery.data);

  const { getStatusValue, handleStatusChange } = useStatusHandler();

  useEffect(() => {
    if (isOpen) {
      if (stationId) {
        stationQuery.refetch();
      } else {
        resetForm();
      }
    }
  }, [isOpen, stationId]);

  const onSaveClick = () => handleSave(formData, validateForm);

  const onStatusChange = (value: string) => {
    handleStatusChange(value, handleInputChange);
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
          {stationQuery.isLoading ? (
            <div className="flex justify-center items-center py-8">
              <Spinner size="lg" />
            </div>
          ) : (
            <StationFormFields
              errors={errors}
              formData={formData}
              getStatusValue={getStatusValue}
              stationId={stationId}
              onInputChange={handleInputChange}
              onStatusChange={onStatusChange}
            />
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
            isDisabled={stationQuery.isLoading}
            isLoading={saving}
            onPress={onSaveClick}
          >
            {stationId ? "Actualizar" : "Crear"} Estación
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default StationModal;
