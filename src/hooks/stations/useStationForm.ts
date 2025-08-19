import { useState, useEffect } from "react";

import {
  onChangeStationFormDataFunct,
  Station,
  StationFormData,
} from "@/types/stations";
import { normalizeDateForInput } from "@/utils/date";

interface FormErrors {
  [key: string]: string | null;
}

const initialFormData: StationFormData = {
  name: "",
  location: "",
  status: "active",
  latitude: undefined as unknown as number,
  longitude: undefined as unknown as number,
  type: "",
  last_answer: normalizeDateForInput(new Date().toISOString()),
  temp: undefined as unknown as number,
};

export const useStationForm = (stationData?: Station) => {
  const [formData, setFormData] = useState<StationFormData>(initialFormData);
  const [errors, setErrors] = useState<FormErrors>({});

  useEffect(() => {
    if (stationData) {
      const { id, ...rest } = stationData;

      setFormData({
        ...rest,
        last_answer: normalizeDateForInput(stationData.last_answer),
      });
    } else {
      setFormData(initialFormData);
    }
    setErrors({});
  }, [stationData]);

  const handleInputChange: onChangeStationFormDataFunct = (
    field,
    // eslint-disable-next-line prettier/prettier
    value
  ): void => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

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

  const resetForm = () => {
    setFormData(initialFormData);
    setErrors({});
  };

  return {
    formData,
    errors,
    handleInputChange,
    validateForm,
    resetForm,
  };
};
