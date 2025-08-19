/* eslint-disable prettier/prettier */
import { useState, useCallback } from "react";
import { Key } from "@react-types/shared";

import { useFormValidation } from "@/hooks/useFormValidation";
import { UserType } from "@/types/auth";

interface RegisterFormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

export const useRegisterForm = () => {
  const { validateField, validateSchema, validationRules } =
    useFormValidation();

  const [formData, setFormData] = useState<UserType>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  // Schema de validación para registro
  const registerValidationSchema = {
    firstName: validationRules.firstName,
    lastName: validationRules.lastName,
    email: validationRules.email,
    password: validationRules.password,
  };

  const handleInputChange = useCallback(
    (field: string, value: Key) => {
      const stringValue = String(value);

      setFormData((prev) => {
        const newData = { ...prev, [field]: stringValue };

        // Validar el campo actual si ya fue tocado
        if (touched[field]) {
          const error = validateField(
            field,
            stringValue,
            registerValidationSchema[
              field as keyof typeof registerValidationSchema
            ],
            newData
          );

          setErrors((prev) => ({ ...prev, [field]: error }));
        }

        return newData;
      });
    },
    [validateField, registerValidationSchema, touched]
  );

  const handleBlur = useCallback(
    (field: string) => {
      setTouched((prev) => ({ ...prev, [field]: true }));

      const error = validateField(
        field,
        formData[field as keyof UserType] || "",
        registerValidationSchema[
          field as keyof typeof registerValidationSchema
        ],
        formData
      );

      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [formData, validateField, registerValidationSchema]
  );

  const validateAllFields = useCallback((): boolean => {
    // Marcar todos los campos como tocados
    const allFields = Object.keys(registerValidationSchema);

    setTouched(
      allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );

    // Validar todos los campos
    const newErrors = validateSchema(formData, registerValidationSchema);

    setErrors(newErrors);

    // Verificar si hay errores
    return !Object.values(newErrors).some((error) => Boolean(error));
  }, [formData, validateSchema, registerValidationSchema]);

  const resetForm = useCallback(() => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
    });
    setErrors({});
    setTouched({});
  }, []);

  // Computed values
  const hasErrors = Object.values(errors).some((error) => Boolean(error));
  const hasAllRequiredFields = Boolean(
    formData.firstName.trim() &&
      formData.lastName.trim() &&
      formData.email.trim() &&
      formData.password.trim()
  );
  const isFormValid = Boolean(hasAllRequiredFields && !hasErrors);

  return {
    formData,
    errors,
    touched,
    isFormValid,
    handleInputChange,
    handleBlur,
    validateAllFields,
    resetForm,
  };
};
