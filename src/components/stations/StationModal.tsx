/* eslint-disable prettier/prettier */
import React, { useEffect } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Spinner,
} from "@heroui/react";
import { IconDeviceDesktop } from "@tabler/icons-react";

import { StationFormFields } from "./StationFormFields";

import { useStationForm } from "@/hooks/useStationForm";
import { useStationModal, useStatusHandler } from "@/hooks/useStationModal";
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

const StationModal: React.FC<StationModalProps> = ({
  isOpen,
  onClose,
  stationId = null,
  onSave,
  onUpdate,
}) => {
  const { saving, stationQuery, handleSave } = useStationModal({
    stationId,
    onSave,
    onUpdate,
    onClose,
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
    handleStatusChange(
      value,
      handleInputChange as (field: string, value: any) => void
    );
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
              onInputChange={
                handleInputChange as (field: string, value: any) => void
              }
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
