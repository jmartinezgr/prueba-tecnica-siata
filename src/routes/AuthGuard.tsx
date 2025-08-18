import { useEffect } from "react";
import { Spinner } from "@heroui/react";

import { useAuth } from "@/hooks/useAuth"; // tu hook para usar AuthContext
import { privateRoutes } from "@/config/site";

interface ProtectedRouteProps {
  children: React.ReactNode;
  navigate: (path: string) => void;
  pathname: string;
}

export const AuthGuard = ({
  children,
  navigate,
  pathname,
}: ProtectedRouteProps) => {
  const { isAuth, isAppLoaded, user } = useAuth();
  const isPublicRoute = () => !privateRoutes.includes(pathname);

  const shouldShowContent = () => {
    if (!isAppLoaded) return false; // Aún cargando inicialmente
    if (isPublicRoute()) return true; // Ruta pública, siempre mostrar

    return isAuth; // Ruta protegida, solo si está logueado
  };

  useEffect(() => {
    if (!isAppLoaded) return;

    // Si no está logueado y está en una ruta protegida, redirigir inmediatamente
    if (!isAuth && !isPublicRoute()) {
      navigate("/not-found");
    }
  }, [isAuth, navigate, isAppLoaded, pathname]);

  if (!shouldShowContent()) {
    if (privateRoutes.includes(pathname) && user === null) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner classNames={{ label: "text-foreground mt-4" }} />
        </div>
      );
    }

    // Si aún está inicializando, mostrar loading
    if (!isAppLoaded) {
      return (
        <div className="flex items-center justify-center min-h-screen">
          <Spinner classNames={{ label: "text-foreground mt-4" }} />
        </div>
      );
    }
  }

  return <>{children}</>;
};
