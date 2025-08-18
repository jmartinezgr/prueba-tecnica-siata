import React, { createContext, useReducer } from "react";
import { QueryClient, useMutation, useQuery } from "@tanstack/react-query";

import { authReducer, initialAuthState } from "@/providers/auth/AuthReducer";
import { UserType } from "@/types/auth";
import { getCurrentUser, login, logout, register } from "@/services/auth";

interface IAuthContextProps {
  children: React.ReactNode;
  navigate: (path: string) => void;
  pathname: string;
}

type AuthContextType = {
  user: UserType | null;
  dispatch: React.Dispatch<any>;
  login: (user: { email: string; password: string }) => void;
  register: (user: UserType) => void;
  logout: () => void;
  updateUser: (data: Partial<UserType>) => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthenticationProvider: React.FC<IAuthContextProps> = ({
  children,
  navigate,
  pathname,
}) => {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  const queryClient = new QueryClient();

  const userInfoQuery = useQuery({
    queryKey: ["userInfo"],
    queryFn: async () => {
      try {
        const data = await getCurrentUser();

        dispatch({ type: "LOGIN", payload: data });

        // Solo redirigir si estamos en una página de auth

        if (pathname === "/login" || pathname === "/register") {
          navigate("/home");
        }

        return data ?? null;
      } catch {
        dispatch({ type: "LOGOUT" });
        navigate("/");

        return null;
      }
    },
    retry: false,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
  });

  const loginMutation = useMutation({
    mutationFn: (loginCredentials: { email: string; password: string }) =>
      login(loginCredentials.email, loginCredentials.password),
    onSuccess: () => {
      //dispatch({ type: "LOGIN" });
      userInfoQuery.refetch();
    },
  });

  const logoutMutation = useMutation({
    mutationFn: logout,
    onSuccess: () => {
      dispatch({ type: "LOGOUT" });
      //navigate(siteConfig.AUTH_PATHS.LOGIN);
      queryClient.resetQueries();
    },
  });

  const registerMutation = useMutation({
    mutationFn: (registerData: UserType) => register(registerData),
    onSuccess: () => {
      userInfoQuery.refetch();
    },
  });

  const updateUser = (data: Partial<UserType>) => {
    dispatch({ type: "UPDATE", payload: data });
  };

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        dispatch,
        login: loginMutation.mutate,
        register: registerMutation.mutate,
        logout: logoutMutation.mutate,
        updateUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
