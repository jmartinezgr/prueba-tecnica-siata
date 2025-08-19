/* eslint-disable prettier/prettier */
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { Station, StationFormData } from "@/types/stations";
import { fetchStationInfo } from "@/services/stations";

interface UseStationModalProps {
  stationId?: string | null;
  onSave?: (stationData: StationFormData) => Promise<unknown>; // antes Promise<void>
  onUpdate?: (
    stationId: string,
    stationData: Partial<Station>
  ) => Promise<unknown>; // igual aquí
  onClose: () => void;
}

export const useStationModal = ({
  stationId,
  onSave,
  onUpdate,
}: UseStationModalProps) => {
  const [saving, setSaving] = useState<boolean>(false);

  const stationQuery = useQuery({
    queryKey: ["station", stationId],
    queryFn: () => fetchStationInfo(stationId || ""),
    enabled: !!stationId,
  });

  const handleSave = async (
    formData: StationFormData,
    validateForm: () => boolean
  ): Promise<void> => {
    if (!validateForm()) return;

    setSaving(true);
    if (stationId && onUpdate) {
      await onUpdate(stationId, formData);
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
