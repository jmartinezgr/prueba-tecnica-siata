import { useState } from "react";
import {
  Card,
  CardBody,
  Input,
  Button,
  Checkbox,
  Link,
  Divider,
} from "@heroui/react";
import { Key } from "@react-types/shared";
import {
  IconCloud,
  IconUserPlus,
  IconShieldCheck,
  IconFileText,
  IconEye,
  IconEyeOff,
} from "@tabler/icons-react";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    department: "",
    position: "",
    password: "",
    confirmPassword: "",
  });
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: string, value: Key) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleRegister = async () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Panel Izquierdo - Información del Sistema */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-slate-600 via-slate-700 to-slate-800 relative overflow-hidden">
        {/* Contenido Principal */}
        <div className="relative z-10 p-12 text-white flex flex-col justify-center">
          <div className="mb-8">
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

            <h2 className="text-4xl font-bold mb-4">Registro de Usuario</h2>
            <p className="text-xl opacity-90 mb-6">
              Únase a la red oficial de monitoreo climático del Valle de Aburra
            </p>
          </div>

          {/* Información del Proceso de Registro */}
          <div className="space-y-6 mb-8">
            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded flex-shrink-0">
                <IconFileText />
              </div>
              <div>
                <h3 className="font-semibold text-lg">
                  Proceso de Verificación
                </h3>
                <p className="text-slate-200 text-sm">
                  Su solicitud será revisada por el equipo de administración. La
                  aprobación puede tomar 2-3 días hábiles.
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-white/20 p-2 rounded flex-shrink-0">
                <IconShieldCheck />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Acceso Seguro</h3>
                <p className="text-slate-200 text-sm">
                  Solo funcionarios públicos autorizados pueden acceder al
                  sistema. Se requiere verificación de identidad institucional.
                </p>
              </div>
            </div>
          </div>

          {/* Información de Contacto */}
          <div className="p-6 bg-white/10 backdrop-blur-sm rounded-lg">
            <h4 className="font-semibold mb-3">¿Necesita Ayuda?</h4>
            <div className="text-sm text-slate-200 space-y-1">
              <p>📧 registro.simet@antioquia.gov.co</p>
              <p>📞 (604) 385-5555 Ext. 1234</p>
              <p>🕒 Lunes a Viernes: 8:00 AM - 5:00 PM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Panel Derecho - Formulario de Registro */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 overflow-y-auto">
        <div className="w-full max-w-md">
          {/* Card del Formulario */}
          <Card className="shadow-lg border border-slate-200">
            <CardBody className="p-6">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-slate-800 mb-2">
                  Solicitud de Acceso
                </h2>
                <p className="text-slate-600 text-sm">
                  Complete todos los campos para procesar su solicitud
                </p>
              </div>

              <div className="space-y-4">
                {/* Nombres */}
                <div className="grid grid-cols-2 gap-3">
                  <Input
                    isRequired
                    classNames={{
                      inputWrapper:
                        "border-slate-300 data-[hover=true]:border-slate-500",
                    }}
                    label="Nombres"
                    placeholder="Juan Carlos"
                    size="md"
                    value={formData.firstName}
                    variant="bordered"
                    onValueChange={(value) =>
                      handleInputChange("firstName", value)
                    }
                  />
                  <Input
                    isRequired
                    classNames={{
                      inputWrapper:
                        "border-slate-300 data-[hover=true]:border-slate-500",
                    }}
                    label="Apellidos"
                    placeholder="García López"
                    size="md"
                    value={formData.lastName}
                    variant="bordered"
                    onValueChange={(value) =>
                      handleInputChange("lastName", value)
                    }
                  />
                </div>

                {/* Email */}
                <Input
                  isRequired
                  classNames={{
                    inputWrapper:
                      "border-slate-300 data-[hover=true]:border-slate-500",
                  }}
                  label="Correo"
                  placeholder="example@gmail.com"
                  size="md"
                  type="email"
                  value={formData.email}
                  variant="bordered"
                  onValueChange={(value) => handleInputChange("email", value)}
                />

                {/* Contraseña */}
                <Input
                  isRequired
                  classNames={{
                    inputWrapper:
                      "border-slate-300 data-[hover=true]:border-slate-500",
                  }}
                  endContent={
                    <button
                      className="text-slate-400 hover:text-slate-600"
                      type="button"
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                    >
                      {isPasswordVisible ? <IconEye /> : <IconEyeOff />}
                    </button>
                  }
                  label="Contraseña"
                  placeholder="Mínimo 8 caracteres"
                  size="md"
                  type={isPasswordVisible ? "text" : "password"}
                  value={formData.password}
                  variant="bordered"
                  onValueChange={(value) =>
                    handleInputChange("password", value)
                  }
                />

                <Divider className="my-4" />

                {/* Términos y Condiciones */}
                <div className="space-y-3">
                  <Checkbox
                    isRequired
                    isSelected={acceptTerms}
                    size="sm"
                    onValueChange={setAcceptTerms}
                  >
                    <span className="text-xs text-slate-700">
                      Acepto los{" "}
                      <Link className="text-slate-600" href="#" size="sm">
                        términos y condiciones de uso
                      </Link>
                    </span>
                  </Checkbox>

                  <Checkbox
                    isRequired
                    isSelected={acceptPrivacy}
                    size="sm"
                    onValueChange={setAcceptPrivacy}
                  >
                    <span className="text-xs text-slate-700">
                      Acepto la{" "}
                      <Link className="text-slate-600" href="#" size="sm">
                        política de tratamiento de datos personales
                      </Link>
                    </span>
                  </Checkbox>
                </div>

                {/* Botón de Registro */}
                <Button
                  className="w-full bg-slate-800 text-white hover:bg-slate-700 font-semibold transition-colors duration-200"
                  isDisabled={!acceptTerms || !acceptPrivacy}
                  isLoading={isLoading}
                  size="lg"
                  startContent={!isLoading && <IconUserPlus />}
                  onPress={handleRegister}
                >
                  {isLoading
                    ? "Enviando solicitud..."
                    : "Enviar Solicitud de Registro"}
                </Button>

                {/* Link de Login */}
                <div className="text-center">
                  <span className="text-slate-600 text-sm">
                    ¿Ya tiene una cuenta?{" "}
                  </span>
                  <Link
                    className="text-slate-800 hover:text-slate-600 font-medium text-sm"
                    href="/login"
                  >
                    Iniciar Sesión
                  </Link>
                </div>
              </div>
            </CardBody>
          </Card>

          {/* Footer Móvil */}
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
    </div>
  );
};

export default Register;
