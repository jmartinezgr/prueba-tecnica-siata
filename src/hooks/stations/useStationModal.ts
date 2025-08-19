/* eslint-disable prettier/prettier */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { addToast } from "@heroui/react";

import { StationFormData } from "@/types/stations";
import { fetchStationInfo } from "@/services/stations";

interface UseStationModalProps {
  stationId?: string | null;
  onSave?: (stationData: StationFormData) => Promise<unknown>; // antes Promise<void>
  onUpdate?: (stationData: {
    stationId: string;
    formData: StationFormData;
  }) => Promise<unknown>; // igual aquí
  onClose: () => void;
}

export const useStationModal = ({
  stationId,
  onSave,
  onUpdate,
  onClose,
}: UseStationModalProps) => {
  const [saving, setSaving] = useState<boolean>(false);

  const stationQuery = useQuery({
    queryKey: ["station", stationId],
    queryFn: () =>
      fetchStationInfo(stationId || "")
        .then((data) => data)
        .catch(() => {
          addToast({
            title: "Error",
            description: `Ups! No se pudo encontrar la estación."`,
            color: "danger",
          });
          onClose();

          return undefined;
        }),
    enabled: !!stationId,
  });

  const handleSave = async (
    formData: StationFormData,
    validateForm: () => boolean
  ): Promise<void> => {
    if (!validateForm()) return;

    setSaving(true);
    if (stationId && onUpdate) {
      await onUpdate({ stationId, formData });
    } else if (onSave) {
      await onSave(formData);
    }
    setSaving(false);
  };

  return {
    saving,
    stationQuery,
    handleSave,
  };
};
