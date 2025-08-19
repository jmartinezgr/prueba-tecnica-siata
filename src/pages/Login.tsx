import { useState } from "react";
import { Input, Button, Link, Divider } from "@heroui/react";
import {
  IconEye,
  IconEyeOff,
  IconShieldCheck,
  IconTemperatureSnow,
} from "@tabler/icons-react";

import AuthInfoPanel from "@/components/auth/AuthInfoPanel";
import { AuthInfoPanelListItem } from "@/types/auth";
import AuthFormSection from "@/components/auth/AuthFormSection";
import { useAuth } from "@/hooks/useAuth";

const authInfoPanelItems: AuthInfoPanelListItem[] = [
  {
    title: "Protección de Datos",
    description: "Sus datos están seguros con nosotros.",
    icon: <IconShieldCheck />,
  },
  {
    title: "Clima Frío",
    description: "Prepárese para el clima frío.",
    icon: <IconTemperatureSnow />,
  },
];

const LoginPage = () => {
  const { login, loginMutation } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleLogin = async () => {
    await login({ email, password });
  };

  return (
    <div className="min-h-screen flex bg-slate-50">
      <AuthFormSection
        subtitle="Ingrese sus credenciales para acceder"
        title="Acceso al Sistema"
      >
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
            isLoading={loginMutation.isPending}
            size="lg"
            startContent={!loginMutation.isPending && <IconShieldCheck />}
            onPress={handleLogin}
          >
            {loginMutation.isPending
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
      </AuthFormSection>

      {/** Panel de Información */}
      <AuthInfoPanel
        descList={authInfoPanelItems}
        subtitle="Plataforma oficial para el monitoreo y análisis de datos climáticos"
        title="Inicio de Sesion"
      />
    </div>
  );
};

export default LoginPage;
