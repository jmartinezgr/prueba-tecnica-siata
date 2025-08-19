import { Snippet } from "@heroui/snippet";
import { Code } from "@heroui/code";
import { Chip } from "@heroui/chip";
import { Button } from "@heroui/button";

import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";

export default function IndexPage() {
  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 sm:gap-6 py-6 sm:py-8 md:py-10 px-4">
        {/* Header principal */}
        <div className="inline-block max-w-full sm:max-w-2xl text-center justify-center">
          <div className="mb-3 sm:mb-4">
            <Chip
              className="mb-3 sm:mb-4 text-xs sm:text-sm"
              color="primary"
              size="sm"
              variant="flat"
            >
              🧪 Prueba Técnica
            </Chip>
          </div>

          <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl">
            <span className={title({ size: "sm" })}>Estaciones&nbsp;</span>
            <span className={title({ color: "violet", size: "sm" })}>
              Meteorológicas&nbsp;
            </span>
            <br />
            <span className={title({ size: "sm" })}>
              Gestión y Monitoreo de Clima
            </span>
          </div>

          <div
            className={subtitle({
              class:
                "mt-4 sm:mt-6 max-w-full sm:max-w-xl mx-auto text-sm sm:text-base lg:text-xl px-2",
            })}
          >
            Aplicación de demostración para la manipulación de datos de
            estaciones meteorológicas con autenticación simulada y gestión de
            usuarios.
          </div>
        </div>

        {/* Características principales */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mt-6 sm:mt-8 max-w-full lg:max-w-4xl w-full px-2 sm:px-4">
          <div className="text-center p-4 sm:p-6 rounded-lg bg-gradient-to-b from-blue-50 to-blue-100 dark:from-blue-950 dark:to-blue-900">
            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🌡️</div>
            <h3 className="font-semibold text-base sm:text-lg mb-2">
              Datos Meteorológicos
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              Visualización y manipulación de estaciones
            </p>
          </div>

          <div className="text-center p-4 sm:p-6 rounded-lg bg-gradient-to-b from-green-50 to-green-100 dark:from-green-950 dark:to-green-900">
            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">🔐</div>
            <h3 className="font-semibold text-base sm:text-lg mb-2">
              Autenticación
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              Sistema de login simulado con roles de usuario y protección de
              rutas
            </p>
          </div>

          <div className="text-center p-4 sm:p-6 rounded-lg bg-gradient-to-b from-purple-50 to-purple-100 dark:from-purple-950 dark:to-purple-900 sm:col-span-2 lg:col-span-1">
            <div className="text-2xl sm:text-3xl mb-2 sm:mb-3">📊</div>
            <h3 className="font-semibold text-base sm:text-lg mb-2">
              Dashboard
            </h3>
            <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-300">
              Interface moderna
            </p>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex flex-col w-1/2 sm:flex-row gap-3 sm:gap-4 mt-6 sm:mt-8  max-w-md sm:max-w-none justify-center">
          <Button
            color="default"
            size="md"
            startContent={<GithubIcon size={18} />}
            variant="bordered"
            onPress={() =>
              window.open(
                "https://github.com/jmartinezgr/prueba-tecnica-siata",
                "_blank"
              )
            }
          >
            Código Fuente
          </Button>
        </div>

        {/* Tecnologías utilizadas */}
        <div className="mt-8 sm:mt-6 text-center w-full max-w-full sm:max-w-lg px-2">
          <h4 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-gray-700 dark:text-gray-300">
            Tecnologías Implementadas
          </h4>
          <div className="flex flex-wrap justify-center gap-1.5 sm:gap-2">
            <Chip className="text-xs" color="primary" size="sm" variant="flat">
              React Query
            </Chip>
            <Chip
              className="text-xs"
              color="secondary"
              size="sm"
              variant="flat"
            >
              React
            </Chip>
            <Chip className="text-xs" color="success" size="sm" variant="flat">
              TypeScript
            </Chip>
            <Chip className="text-xs" color="warning" size="sm" variant="flat">
              HeroUI
            </Chip>
            <Chip className="text-xs" color="danger" size="sm" variant="flat">
              Tabler Icons
            </Chip>
            <Chip className="text-xs" color="default" size="sm" variant="flat">
              Tailwind CSS
            </Chip>
          </div>
        </div>

        {/* Snippet informativo */}
        <div className="mt-6 sm:mt-8 max-w-full sm:max-w-md w-full px-2">
          <Snippet
            hideCopyButton
            hideSymbol
            className="text-xs sm:text-sm"
            variant="bordered"
          >
            <span>
              Proyecto desarrollado con <Code color="primary">React.js</Code> y{" "}
              <Code color="secondary">HeroUI</Code>
            </span>
          </Snippet>
        </div>

        {/* Footer informativo */}
        <div className="mt-6 sm:mt-8 text-center text-xs sm:text-sm text-gray-500 dark:text-gray-400 max-w-full sm:max-w-md px-4">
          <p>
            Esta aplicación es una demostración técnica que simula la gestión de
            estaciones meteorológicas con funcionalidades de CRUD y
            autenticación.
          </p>
        </div>
      </section>
    </DefaultLayout>
  );
}
