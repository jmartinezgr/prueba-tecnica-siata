/* eslint-disable prettier/prettier */
import { useCallback } from "react";

export interface ValidationRules {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  pattern?: RegExp;
  patternMessage?: string;
  customValidation?: (value: string, formData?: any) => string | undefined;
}

export interface ValidationSchema {
  [key: string]: ValidationRules;
}

export const useFormValidation = () => {
  const validateField = useCallback(
    (
      field: string,
      value: string,
      rules: ValidationRules,
      formData?: any
    ): string | undefined => {
      if (rules.required && !value.trim()) {
        return `${getFieldDisplayName(field)} es requerido`;
      }
      if (!value.trim() && !rules.required) {
        return undefined;
      }
      if (rules.minLength && value.length < rules.minLength) {
        return `${getFieldDisplayName(field)} debe tener al menos ${rules.minLength} caracteres`;
      }
      if (rules.maxLength && value.length > rules.maxLength) {
        return `${getFieldDisplayName(field)} no puede exceder ${rules.maxLength} caracteres`;
      }
      if (rules.pattern && !rules.pattern.test(value)) {
        return (
          rules.patternMessage ||
          `Formato de ${getFieldDisplayName(field).toLowerCase()} inválido`
        );
      }
      if (rules.customValidation) {
        return rules.customValidation(value, formData);
      }

      return undefined;
    },
    []
  );

  const validateSchema = useCallback(
    (
      formData: Record<string, string>,
      schema: ValidationSchema
    ): Record<string, string | undefined> => {
      const errors: Record<string, string | undefined> = {};

      Object.keys(schema).forEach((field) => {
        const value = formData[field] || "";
        const rules = schema[field];
        const error = validateField(field, value, rules, formData);

        if (error) errors[field] = error;
      });

      return errors;
    },
    [validateField]
  );

  const getFieldDisplayName = (field: string): string => {
    const displayNames: Record<string, string> = {
      firstName: "El nombre",
      lastName: "El apellido",
      email: "El correo",
      password: "La contraseña",
      currentPassword: "La contraseña actual",
      newPassword: "La nueva contraseña",
      confirmPassword: "La confirmación de contraseña",
    };

    return displayNames[field] || field;
  };

  // 👉 AQUI: forzamos el tipo del esquema completo
  const validationRules: ValidationSchema = {
    firstName: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      patternMessage: "El nombre solo puede contener letras",
    },
    lastName: {
      required: true,
      minLength: 2,
      maxLength: 50,
      pattern: /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/,
      patternMessage: "El apellido solo puede contener letras",
    },
    email: {
      required: true,
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      patternMessage: "Formato de correo inválido",
    },
    password: {
      required: true,
      minLength: 8,
      maxLength: 100,
      customValidation: (value: string): string | undefined => {
        if (!/(?=.*[a-z])/.test(value))
          return "La contraseña debe contener al menos una letra minúscula";
        if (!/(?=.*[A-Z])/.test(value))
          return "La contraseña debe contener al menos una letra mayúscula";
        if (!/(?=.*\d)/.test(value))
          return "La contraseña debe contener al menos un número";

        return undefined;
      },
    },
    currentPassword: {
      required: false, // se maneja condicionalmente
    },
    newPassword: {
      required: false, // se maneja condicionalmente
      minLength: 8,
      maxLength: 100,
      customValidation: (value: string): string | undefined => {
        if (!value) return undefined;
        if (!/(?=.*[a-z])/.test(value))
          return "La contraseña debe contener al menos una letra minúscula";
        if (!/(?=.*[A-Z])/.test(value))
          return "La contraseña debe contener al menos una letra mayúscula";
        if (!/(?=.*\d)/.test(value))
          return "La contraseña debe contener al menos un número";

        return undefined;
      },
    },
    confirmPassword: {
      required: false, // se maneja condicionalmente
      customValidation: (value: string, formData?: any): string | undefined => {
        if (!value || !formData) return undefined;
        if (value !== formData.newPassword && value !== formData.password) {
          return "Las contraseñas no coinciden";
        }

        return undefined;
      },
    },
  };

  return { validateField, validateSchema, validationRules };
};
