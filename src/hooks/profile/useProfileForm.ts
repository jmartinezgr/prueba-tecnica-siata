/* eslint-disable prettier/prettier */
import { useState, useCallback } from "react";
import { addToast } from "@heroui/react";

import { useAuth } from "@/hooks/useAuth";
import { useFormValidation } from "@/hooks/useFormValidation";
import { FormData, FormErrors } from "@/types/profile";

export const useProfileForm = () => {
  const { user, updateUser, updateUserMutation } = useAuth();
  const { validateField, validationRules } = useFormValidation();

  const [formData, setFormData] = useState<FormData>({
    firstName: user?.firstName || "",
    lastName: user?.lastName || "",
    email: user?.email || "",
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateProfileField = useCallback(
    (field: string, value: string, formData: FormData): string | undefined => {
      const isPasswordSectionUsed =
        formData.currentPassword != "" ||
        formData.newPassword != "" ||
        formData.confirmPassword != "";

      // Reglas base de validación
      let rules = validationRules[field as keyof typeof validationRules];

      // Ajustar reglas para campos de contraseña condicionalmente
      if (field === "currentPassword") {
        rules = {
          ...rules,
          required: isPasswordSectionUsed,
          customValidation:
            isPasswordSectionUsed && formData.currentPassword
              ? (value: string) => {
                  if (!value) {
                    return "La contraseña actual es requerida para cambiar la contraseña";
                  }

                  return undefined;
                }
              : undefined,
        };
      } else if (field === "newPassword") {
        rules = {
          ...validationRules.newPassword,
          required: isPasswordSectionUsed,
        };
      } else if (field === "confirmPassword") {
        rules = {
          ...validationRules.confirmPassword,
          required: isPasswordSectionUsed,
          customValidation:
            isPasswordSectionUsed && formData.newPassword
              ? (value: string) => {
                  if (value !== formData.newPassword) {
                    return "Las contraseñas no coinciden";
                  }

                  return undefined;
                }
              : undefined,
        };
      }

      return validateField(field, value, rules, formData);
    },
    [validateField, validationRules]
  );

  const handleInputChange = useCallback(
    (field: string, value: string) => {
      setFormData((prev) => {
        const newData = { ...prev, [field]: value };

        // Validar el campo actual
        const error = validateProfileField(field, value, newData);

        setErrors((prev) => ({ ...prev, [field]: error }));

        // Revalidar confirmPassword si estamos cambiando newPassword
        if (field === "newPassword" && touched.confirmPassword) {
          const confirmError = validateProfileField(
            "confirmPassword",
            prev.confirmPassword,
            newData
          );

          setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
        }

        // Revalidar si estamos cambiando confirmPassword
        if (field === "confirmPassword") {
          const confirmError = validateProfileField(
            "confirmPassword",
            value,
            newData
          );

          setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
        }

        return newData;
      });
    },
    [validateProfileField, touched.confirmPassword]
  );

  const handleBlur = useCallback(
    (field: string) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const error = validateProfileField(
        field,
        formData[field as keyof FormData],
        formData
      );

      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [formData, validateProfileField]
  );

  const validateAllFields = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    const fieldsToValidate = ["firstName", "lastName", "email"];
    const isPasswordSectionUsed =
      formData.currentPassword ||
      formData.newPassword ||
      formData.confirmPassword;

    if (isPasswordSectionUsed) {
      fieldsToValidate.push(
        "currentPassword",
        "newPassword",
        "confirmPassword"
      );
    }

    fieldsToValidate.forEach((field) => {
      const error = validateProfileField(
        field,
        formData[field as keyof FormData],
        formData
      );

      if (error) {
        newErrors[field as keyof FormErrors] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);

    return isValid;
  }, [formData, validateProfileField]);

  const handleSubmit = useCallback(async () => {
    const allFields = ["firstName", "lastName", "email"];
    const isPasswordSectionUsed =
      formData.currentPassword ||
      formData.newPassword ||
      formData.confirmPassword;

    if (isPasswordSectionUsed) {
      allFields.push("currentPassword", "newPassword", "confirmPassword");
    }

    setTouched(
      allFields.reduce((acc, field) => ({ ...acc, [field]: true }), {})
    );

    if (!validateAllFields()) {
      return;
    }

    try {
      const updateData: any = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
      };

      if (isPasswordSectionUsed && formData.newPassword) {
        updateData.password = formData.newPassword;
        updateData.currentPassword = formData.currentPassword;
      }

      await updateUser(updateData);

      // Limpiar campos de contraseña
      setFormData((prev) => ({
        ...prev,
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      }));

      setErrors({});
      setTouched({});

      addToast({
        title: "Perfil actualizado",
        description: "Tu perfil se ha actualizado correctamente.",
        color: "success",
      });
    } catch {
      addToast({
        title: "Error al actualizar el perfil",
        description:
          "Ocurrió un error al actualizar tu perfil. Por favor, intenta nuevamente.",
        color: "danger",
      });
    }
  }, [formData, validateAllFields, updateUser]);

  const handleReset = useCallback(() => {
    setFormData({
      firstName: user?.firstName || "",
      lastName: user?.lastName || "",
      email: user?.email || "",
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setErrors({});
    setTouched({});
  }, [user]);

  // Computed values
  const isPasswordSectionUsed = Boolean(
    formData.currentPassword || formData.newPassword || formData.confirmPassword
  );
  const hasPersonalInfoChanges = Boolean(
    formData.firstName !== user?.firstName ||
      formData.lastName !== user?.lastName ||
      formData.email !== user?.email
  );
  const hasPasswordChanges = Boolean(
    isPasswordSectionUsed && formData.newPassword
  );
  const hasChanges = Boolean(hasPersonalInfoChanges || hasPasswordChanges);
  const hasErrors = Object.values(errors).some((error) => Boolean(error));
  const isFormValid = Boolean(hasChanges && !hasErrors);

  return {
    formData,
    errors,
    touched,
    isFormValid,
    isLoading: updateUserMutation.isPending,
    handleInputChange,
    handleBlur,
    handleSubmit,
    handleReset,
  };
};
