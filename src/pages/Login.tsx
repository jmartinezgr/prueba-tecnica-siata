import { useState } from "react";
import { Card, CardBody, Input, Button, Link, Divider } from "@heroui/react";
import {
  IconCloud,
  IconEye,
  IconEyeOff,
  IconShieldCheck,
  IconTemperatureSnow,
} from "@tabler/icons-react";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Panel Izquierdo - Formulario de Login */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          {/* Card del Formulario */}
          <Card className="shadow-lg border border-slate-200">
            <CardBody className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                  Acceso al Sistema
                </h2>
                <p className="text-slate-600 text-sm">
                  Ingrese sus credenciales para acceder
                </p>
              </div>

              <div className="space-y-6">
                {/* Campo Email */}
                <Input
                  isRequired
                  classNames={{
                    input: "text-base",
                    inputWrapper:
                      "border-slate-300 data-[hover=true]:border-slate-500 group-data-[focus=true]:border-slate-600",
                  }}
                  label="Correo"
                  placeholder="example@gmail.com"
                  size="md"
                  type="email"
                  value={email}
                  variant="bordered"
                  onValueChange={setEmail}
                />

                {/* Checkbox y Links */}
                <div className="space-y-3">
                  {/* Campo Contraseña */}
                  <Input
                    isRequired
                    classNames={{
                      input: "text-base",
                      inputWrapper:
                        "border-slate-300 data-[hover=true]:border-slate-500 group-data-[focus=true]:border-slate-600",
                    }}
                    endContent={
                      <button
                        aria-label={
                          isPasswordVisible
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"
                        }
                        className="focus:outline-none text-slate-400 hover:text-slate-600"
                        type="button"
                        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      >
                        {isPasswordVisible ? <IconEye /> : <IconEyeOff />}
                      </button>
                    }
                    label="Contraseña"
                    placeholder="Ingrese su contraseña"
                    size="md"
                    type={isPasswordVisible ? "text" : "password"}
                    value={password}
                    variant="bordered"
                    onValueChange={setPassword}
                  />
                  <Link
                    className="text-slate-600 hover:text-slate-800 block"
                    href="/forgot-password"
                    size="sm"
                  >
                    ¿Olvidó su contraseña?
                  </Link>
                </div>

                {/* Botón de Login */}
                <div className="text-center">
                  <Button
                    className="w-full bg-slate-800 text-white hover:bg-slate-700 font-semibold transition-colors duration-200 mb-3"
                    isLoading={isLoading}
                    size="lg"
                    startContent={!isLoading && <IconShieldCheck />}
                    onPress={handleLogin}
                  >
                    {isLoading
                      ? "Verificando credenciales..."
                      : "Acceder al Sistema"}
                  </Button>
                  <span className="text-slate-600 text-sm">
                    ¿No tienes una cuenta?{" "}
                  </span>
                  <Link
                    className="text-slate-800 hover:text-slate-600 font-medium text-sm"
                    href="/register"
                  >
                    Crea Una
                  </Link>
                </div>

                <Divider className="my-3" />

                {/* Información de Seguridad */}
                <div className="bg-slate-100 p-4 rounded-lg">
                  <div className="flex items-start space-x-2">
                    <IconShieldCheck />
                    <div className="text-xs text-slate-600">
                      <p className="font-medium mb-1">Acceso Seguro</p>
                      <p>
                        Este sistema está protegido y monitoreado. El acceso no
                        autorizado está prohibido.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Footer  */}
          <div className="mt-6 text-center space-y-2">
            <p className="text-xs text-slate-500">
              © 2025 Valle de Aburra - Secretaría del Medio Ambiente
            </p>
            <div className="flex justify-center space-x-4 text-xs">
              <Link className="text-slate-500 hover:text-slate-700" href="#">
                Política de Datos
              </Link>
              <span className="text-slate-300">•</span>
              <Link className="text-slate-500 hover:text-slate-700" href="#">
                Soporte Técnico
              </Link>
              <span className="text-slate-300">•</span>
              <Link className="text-slate-500 hover:text-slate-700" href="#">
                Manual de Usuario
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Panel Derecho - Información del Sistema */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 relative overflow-hidden">
        {/* Contenido Principal */}
        <div className="relative z-10 p-12 text-white flex flex-col justify-center">
          <div className="flex items-center mb-6">
            <div className="bg-white/20 p-3 rounded-lg mr-4">
              <IconCloud />
            </div>
            <div>
              <h1 className="text-3xl font-bold">SIMET</h1>
              <p className="text-slate-200">
                Sistema de Información Meteorológica
              </p>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-4xl font-bold mb-4">Inicio de Sesion</h2>
            <p className="text-xl opacity-90 mb-6">
              Plataforma oficial para el monitoreo y análisis de datos
              climáticos
            </p>
          </div>

          {/* Características del Sistema */}
          <div className="space-y-6">
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded">
                <IconTemperatureSnow />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Monitoreo en Tiempo Real
                </h3>
                <p className="text-slate-200">
                  Datos meteorológicos actualizados cada 5 minutos desde 150+
                  estaciones
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded">
                <IconShieldCheck />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Información Oficial</h3>
                <p className="text-slate-200">
                  Datos certificados para toma de decisiones gubernamentales
                </p>
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="mt-12 p-6 bg-white/10 backdrop-blur-sm rounded-lg">
            <h4 className="font-semibold mb-3">Soporte Técnico</h4>
            <div className="text-sm text-slate-200 space-y-1">
              <p>📧 soporte.simet@antioquia.gov.co</p>
              <p>📞 (604) 385-5555 Ext. 1234</p>
              <p>🕒 Lunes a Viernes: 8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
