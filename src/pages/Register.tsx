/* eslint-disable no-console */
import { useState } from "react";
import { Input, Button, Checkbox, Link, Divider } from "@heroui/react";
import {
  IconUserPlus,
  IconShieldCheck,
  IconEye,
  IconEyeOff,
  IconTemperatureSnow,
} from "@tabler/icons-react";

import AuthInfoPanel from "@/components/auth/AuthInfoPanel";
import AuthFormSection from "@/components/auth/AuthFormSection";
import { AuthInfoPanelListItem } from "@/types/auth";
import { useAuth } from "@/hooks/useAuth";
import { useRegisterForm } from "@/hooks/register/useRegisterForm";

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

const RegisterPage = () => {
  const { register } = useAuth();
  const {
    formData,
    errors,
    touched,
    isFormValid,
    handleInputChange,
    handleBlur,
    validateAllFields,
    resetForm,
  } = useRegisterForm();

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptPrivacy, setAcceptPrivacy] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async () => {
    if (!validateAllFields()) {
      console.log("Form validation failed");

      return;
    }

    if (!acceptTerms || !acceptPrivacy) {
      console.log("Terms and conditions must be accepted");

      return;
    }

    setIsLoading(true);

    try {
      console.log("Registering user:", formData);
      await register(formData);
      resetForm();
      setAcceptTerms(false);
      setAcceptPrivacy(false);
    } catch (error) {
      console.log("Error during registration:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const canSubmit = isFormValid && acceptTerms && acceptPrivacy;

  return (
    <div className="min-h-screen flex bg-slate-50">
      {/* Panel Izquierdo - Información del Sistema */}
      <AuthInfoPanel
        descList={authInfoPanelItems}
        subtitle="Plataforma oficial para el monitoreo y análisis de datos climáticos"
        title="Registro de Usuario"
      />

      <AuthFormSection
        subtitle="Complete todos los campos para procesar su solicitud"
        title="Solicitud de Acceso"
      >
        <div className="grid grid-cols-2 gap-3">
          <Input
            isRequired
            classNames={{
              inputWrapper:
                "border-slate-300 data-[hover=true]:border-slate-500",
            }}
            errorMessage={touched.firstName && errors.firstName}
            isInvalid={Boolean(touched.firstName && errors.firstName)}
            label="Nombres"
            placeholder="Juan Carlos"
            size="md"
            value={formData.firstName}
            variant="bordered"
            onBlur={() => handleBlur("firstName")}
            onValueChange={(value) => handleInputChange("firstName", value)}
          />
          <Input
            isRequired
            classNames={{
              inputWrapper:
                "border-slate-300 data-[hover=true]:border-slate-500",
            }}
            errorMessage={touched.lastName && errors.lastName}
            isInvalid={Boolean(touched.lastName && errors.lastName)}
            label="Apellidos"
            placeholder="García López"
            size="md"
            value={formData.lastName}
            variant="bordered"
            onBlur={() => handleBlur("lastName")}
            onValueChange={(value) => handleInputChange("lastName", value)}
          />
        </div>

        {/* Email */}
        <Input
          isRequired
          classNames={{
            inputWrapper: "border-slate-300 data-[hover=true]:border-slate-500",
          }}
          errorMessage={touched.email && errors.email}
          isInvalid={Boolean(touched.email && errors.email)}
          label="Correo"
          placeholder="example@gmail.com"
          size="md"
          type="email"
          value={formData.email}
          variant="bordered"
          onBlur={() => handleBlur("email")}
          onValueChange={(value) => handleInputChange("email", value)}
        />

        {/* Contraseña */}
        <Input
          isRequired
          classNames={{
            inputWrapper: "border-slate-300 data-[hover=true]:border-slate-500",
          }}
          description="Mínimo 8 caracteres con mayúscula, minúscula y número"
          endContent={
            <button
              className="text-slate-400 hover:text-slate-600"
              type="button"
              onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            >
              {isPasswordVisible ? <IconEye /> : <IconEyeOff />}
            </button>
          }
          errorMessage={touched.password && errors.password}
          isInvalid={Boolean(touched.password && errors.password)}
          label="Contraseña"
          placeholder="Mínimo 8 caracteres"
          size="md"
          type={isPasswordVisible ? "text" : "password"}
          value={formData.password}
          variant="bordered"
          onBlur={() => handleBlur("password")}
          onValueChange={(value) => handleInputChange("password", value)}
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
          isDisabled={!canSubmit}
          isLoading={isLoading}
          size="lg"
          startContent={!isLoading && <IconUserPlus />}
          onPress={handleRegister}
        >
          {isLoading ? "Enviando solicitud..." : "Enviar Solicitud de Registro"}
        </Button>

        {/* Link de Login */}
        <div className="text-center">
          <span className="text-slate-600 text-sm">¿Ya tiene una cuenta? </span>
          <Link
            className="text-slate-800 hover:text-slate-600 font-medium text-sm"
            href="/login"
          >
            Iniciar Sesión
          </Link>
        </div>
      </AuthFormSection>
    </div>
  );
};

export default RegisterPage;
