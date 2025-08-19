/* eslint-disable prettier/prettier */
import { useState, useCallback } from "react";
import { addToast } from "@heroui/react";

import { useAuth } from "@/hooks/useAuth";

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

interface FormErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  currentPassword?: string;
  newPassword?: string;
  confirmPassword?: string;
}

export const useProfileForm = () => {
  const { user, updateUser, updateUserMutation } = useAuth();

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

  const validateField = useCallback(
    (field: string, value: string, formData: FormData): string | undefined => {
      const isPasswordSectionUsed =
        formData.currentPassword ||
        formData.newPassword ||
        formData.confirmPassword;

      switch (field) {
        case "firstName":
          if (!value.trim()) return "El nombre es requerido";
          if (value.length < 2)
            return "El nombre debe tener al menos 2 caracteres";
          if (value.length > 50)
            return "El nombre no puede exceder 50 caracteres";
          if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
            return "El nombre solo puede contener letras";
          break;

        case "lastName":
          if (!value.trim()) return "El apellido es requerido";
          if (value.length < 2)
            return "El apellido debe tener al menos 2 caracteres";
          if (value.length > 50)
            return "El apellido no puede exceder 50 caracteres";
          if (!/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/.test(value))
            return "El apellido solo puede contener letras";
          break;

        case "email":
          if (!value.trim()) return "El correo es requerido";
          if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value))
            return "Formato de correo inválido";
          break;

        case "currentPassword":
          if (isPasswordSectionUsed && !value)
            return "La contraseña actual es requerida para cambiar la contraseña";
          break;

        case "newPassword":
          if (isPasswordSectionUsed) {
            if (!value) return "La nueva contraseña es requerida";
            if (value.length < 8)
              return "La contraseña debe tener al menos 8 caracteres";
            if (value.length > 100)
              return "La contraseña no puede exceder 100 caracteres";
            if (!/(?=.*[a-z])/.test(value))
              return "La contraseña debe contener al menos una letra minúscula";
            if (!/(?=.*[A-Z])/.test(value))
              return "La contraseña debe contener al menos una letra mayúscula";
            if (!/(?=.*\d)/.test(value))
              return "La contraseña debe contener al menos un número";
          }
          break;

        case "confirmPassword":
          if (isPasswordSectionUsed) {
            if (!value) return "Confirme la nueva contraseña";
            if (value !== formData.newPassword)
              return "Las contraseñas no coinciden";
          }
          break;
      }

      return undefined;
    },
    []
  );

  const handleInputChange = useCallback(
    (field: string, value: string) => {
      setFormData((prev) => {
        const newData = { ...prev, [field]: value };

        // Validar el campo actual
        const error = validateField(field, value, newData);

        setErrors((prev) => ({ ...prev, [field]: error }));

        // Revalidar confirmPassword si estamos cambiando newPassword
        if (field === "newPassword" && touched.confirmPassword) {
          const confirmError = validateField(
            "confirmPassword",
            prev.confirmPassword,
            newData
          );

          setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
        }

        // Revalidar si estamos cambiando confirmPassword
        if (field === "confirmPassword") {
          const confirmError =
            value !== newData.newPassword
              ? "Las contraseñas no coinciden"
              : undefined;

          setErrors((prev) => ({ ...prev, confirmPassword: confirmError }));
        }

        return newData;
      });
    },
    [validateField, touched.confirmPassword]
  );

  const handleBlur = useCallback(
    (field: string) => {
      setTouched((prev) => ({ ...prev, [field]: true }));
      const error = validateField(
        field,
        formData[field as keyof FormData],
        formData
      );

      setErrors((prev) => ({ ...prev, [field]: error }));
    },
    [formData, validateField]
  );

  const validateAllFields = useCallback((): boolean => {
    const newErrors: FormErrors = {};
    let isValid = true;

    const fieldsToValidate = ["firstName", "lastName"];
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
      const error = validateField(
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
  }, [formData, validateField]);

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
  const isPasswordSectionUsed =
    formData.currentPassword ||
    formData.newPassword ||
    formData.confirmPassword;
  const hasPersonalInfoChanges =
    formData.firstName !== user?.firstName ||
    formData.lastName !== user?.lastName ||
    formData.email !== user?.email;
  const hasPasswordChanges = isPasswordSectionUsed && formData.newPassword;
  const hasChanges = hasPersonalInfoChanges || hasPasswordChanges;
  const hasErrors = Object.values(errors).some((error) => !!error);
  const isFormValid = hasChanges && !hasErrors;

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
