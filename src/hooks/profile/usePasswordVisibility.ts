import { useState, useCallback } from "react";

type PasswordField = "current" | "new" | "confirm";

export const usePasswordVisibility = () => {
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  });

  const togglePasswordVisibility = useCallback((field: PasswordField) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  }, []);

  return {
    showPasswords,
    togglePasswordVisibility,
  };
};
