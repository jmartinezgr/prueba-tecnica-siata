import React, { createContext, useReducer } from "react";
import {
  QueryClient,
  useMutation,
  useQuery,
  UseMutationResult,
} from "@tanstack/react-query";
import { addToast } from "@heroui/react";

import { authReducer, initialAuthState } from "@/providers/auth/AuthReducer";
import { UserType } from "@/types/auth";
import {
  getCurrentUser,
  login,
  logout,
  register,
  updateUser,
} from "@/services/auth";

interface IAuthContextProps {
  children: React.ReactNode;
  navigate: (path: string) => void;
  pathname: string;
}

type AuthContextType = {
  user: UserType | null;
  isAuth: boolean;
  isAppLoaded: boolean;
  dispatch: React.Dispatch<any>;
  login: (user: { email: string; password: string }) => void;
  register: (user: UserType) => void;
  logout: () => void;
  updateUser: (data: UserType) => void;
  loginMutation: UseMutationResult<
    UserType,
    Error,
    { email: string; password: string },
    unknown
  >;
  registerMutation: UseMutationResult<UserType, Error, UserType, unknown>;
  logoutMutation: UseMutationResult<void, Error, void, unknown>;
  updateUserMutation: UseMutationResult<UserType, Error, UserType, unknown>;
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

        if (pathname === "/login" || pathname === "/register") {
          navigate("/home");
        }

        return data ?? null;
      } catch {
        if (state.user !== null) dispatch({ type: "LOGOUT" });

        return null;
      } finally {
        dispatch({ type: "SET_APPLOADED" });
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
      userInfoQuery.refetch();
    },
    onError: (error: Error) => {
      addToast({
        title: "Error",
        description: error.message,
        color: "danger",
      });
    },
  });

  const logoutMutation = useMutation<void, Error, void>({
    mutationFn: async () => {
      await logout();
    },
    onSuccess: () => {
      dispatch({ type: "LOGOUT" });
      navigate("/");
      queryClient.resetQueries();
    },
  });

  const registerMutation = useMutation({
    mutationFn: (registerData: UserType) => register(registerData),
    onSuccess: () => {
      userInfoQuery.refetch();
    },
    onError: (error: Error) => {
      addToast({
        title: "Error",
        description: error.message,
        color: "danger",
      });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: (userData: UserType) => updateUser(userData),
    onSuccess: () => {
      userInfoQuery.refetch();
    },
  });

  return (
    <AuthContext.Provider
      value={{
        user: state.user,
        isAuth: state.isLogged,
        isAppLoaded: state.isAppLoaded,
        dispatch,
        login: loginMutation.mutate,
        register: registerMutation.mutate,
        logout: logoutMutation.mutate,
        updateUser: updateUserMutation.mutate,
        loginMutation,
        registerMutation,
        logoutMutation,
        updateUserMutation,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
