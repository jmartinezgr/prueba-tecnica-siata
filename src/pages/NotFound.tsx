import { Button, Card, CardBody } from "@heroui/react";
import {
  IconHome,
  IconAlertTriangle,
  IconArrowLeft,
} from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";

import DefaultLayout from "@/layouts/default";

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate("/");
  };

  const handleGoBack = () => {
    if (window.history.length > 2) {
      navigate(-2);
    } else {
      navigate("/");
    }
  };

  return (
    <DefaultLayout>
      <div className=" flex items-center justify-center pt-5 ">
        <Card className="max-w-md w-full">
          <CardBody className="text-center py-12 px-8">
            {/* Icono principal */}
            <div className="mb-6">
              <IconAlertTriangle
                className="mx-auto text-warning-500 animate-pulse"
                size={80}
                stroke={1.5}
              />
            </div>

            {/* Código de error */}
            <h1 className="text-6xl font-bold text-gray-800 mb-2">404</h1>

            {/* Mensaje principal */}
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Página no encontrada
            </h2>

            {/* Descripción */}
            <p className="text-gray-600 mb-8 leading-relaxed">
              La ruta que buscas no existe o no tienes autorización para acceder
              a ella. Verifica la URL o regresa al inicio.
            </p>

            {/* Botones de acción */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                className="font-medium"
                color="primary"
                size="lg"
                startContent={<IconHome size={20} />}
                onPress={handleGoHome}
              >
                Volver al inicio
              </Button>

              <Button
                className="font-medium"
                size="lg"
                startContent={<IconArrowLeft size={20} />}
                variant="bordered"
                onPress={handleGoBack}
              >
                Página anterior
              </Button>
            </div>

            {/* Información adicional */}
            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Si crees que esto es un error, contacta al administrador
              </p>
            </div>
          </CardBody>
        </Card>
      </div>
    </DefaultLayout>
  );
};

export default NotFoundPage;
