import React, { createContext, useReducer } from "react";

import { authReducer, initialAuthState } from "@/providers/auth/AuthReducer";
import { UserType } from "@/types/auth";

interface IAuthContextProps {
  children: React.ReactNode;
}

type AuthContextType = {
  user: UserType | null;
  dispatch: React.Dispatch<any>;
  login: (user: UserType) => void;
  logout: () => void;
  updateUser: (data: Partial<UserType>) => void;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthenticationProvider: React.FC<IAuthContextProps> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const login = (user: UserType) => {
    dispatch({ type: "LOGIN", payload: user });
  };

  const logout = () => {
    dispatch({ type: "LOGOUT" });
  };

  const updateUser = (data: Partial<UserType>) => {
    dispatch({ type: "UPDATE", payload: data });
  };

  return (
    <AuthContext.Provider
      value={{ user: state.user, dispatch, login, logout, updateUser }}
    >
      {children}
    </AuthContext.Provider>
  );
};
