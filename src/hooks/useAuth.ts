import { useContext } from "react";

import { AuthContext } from "@/providers/auth/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("Error: no uses useAuth afuera del AuthProvider");
  }

  return context;
};

export { useAuth };
