// components/SecurityForm.tsx
import { Input, Card, CardBody, CardHeader } from "@heroui/react";
import { IconLock, IconEye, IconEyeOff, IconShield } from "@tabler/icons-react";

interface SecurityFormProps {
  formData: {
    currentPassword: string;
    newPassword: string;
    confirmPassword: string;
  };
  errors: {
    currentPassword?: string;
    newPassword?: string;
    confirmPassword?: string;
  };
  touched: Record<string, boolean>;
  showPasswords: {
    current: boolean;
    new: boolean;
    confirm: boolean;
  };
  onInputChange: (field: string, value: string) => void;
  onBlur: (field: string) => void;
  onTogglePasswordVisibility: (field: "current" | "new" | "confirm") => void;
}

export const SecurityForm = ({
  formData,
  errors,
  touched,
  showPasswords,
  onInputChange,
  onBlur,
  onTogglePasswordVisibility,
}: SecurityFormProps) => {
  return (
    <Card className="shadow-lg border border-gray-200 h-fit">
      <CardHeader className="pb-3 md:pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-red-100">
            <IconShield className="text-red-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Configuración de Seguridad
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              Cambia tu contraseña de acceso
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody className="pt-0 space-y-4 md:space-y-6">
        <Input
          classNames={{
            inputWrapper: "border-slate-300 data-[hover=true]:border-slate-500",
          }}
          color={
            errors.currentPassword && touched.currentPassword
              ? "danger"
              : "default"
          }
          endContent={
            <button
              className="focus:outline-none text-slate-400 hover:text-slate-600 transition-colors"
              type="button"
              onClick={() => onTogglePasswordVisibility("current")}
            >
              {showPasswords.current ? (
                <IconEyeOff size={18} />
              ) : (
                <IconEye size={18} />
              )}
            </button>
          }
          errorMessage={touched.currentPassword ? errors.currentPassword : ""}
          isInvalid={!!(errors.currentPassword && touched.currentPassword)}
          label="Contraseña Actual"
          placeholder="Ingresa tu contraseña actual"
          size="md"
          startContent={<IconLock className="text-gray-400" size={18} />}
          type={showPasswords.current ? "text" : "password"}
          value={formData.currentPassword}
          variant="bordered"
          onBlur={() => onBlur("currentPassword")}
          onValueChange={(value) => onInputChange("currentPassword", value)}
        />

        <Input
          classNames={{
            inputWrapper: "border-slate-300 data-[hover=true]:border-slate-500",
          }}
          color={
            errors.newPassword && touched.newPassword ? "danger" : "default"
          }
          endContent={
            <button
              className="focus:outline-none text-slate-400 hover:text-slate-600 transition-colors"
              type="button"
              onClick={() => onTogglePasswordVisibility("new")}
            >
              {showPasswords.new ? (
                <IconEyeOff size={18} />
              ) : (
                <IconEye size={18} />
              )}
            </button>
          }
          errorMessage={touched.newPassword ? errors.newPassword : ""}
          isInvalid={!!(errors.newPassword && touched.newPassword)}
          label="Nueva Contraseña"
          placeholder="Mínimo 8 caracteres, mayúscula, minúscula y número"
          size="md"
          startContent={<IconLock className="text-gray-400" size={18} />}
          type={showPasswords.new ? "text" : "password"}
          value={formData.newPassword}
          variant="bordered"
          onBlur={() => onBlur("newPassword")}
          onValueChange={(value) => onInputChange("newPassword", value)}
        />

        <Input
          classNames={{
            inputWrapper: "border-slate-300 data-[hover=true]:border-slate-500",
          }}
          color={
            errors.confirmPassword && touched.confirmPassword
              ? "danger"
              : "default"
          }
          endContent={
            <button
              className="focus:outline-none text-slate-400 hover:text-slate-600 transition-colors"
              type="button"
              onClick={() => onTogglePasswordVisibility("confirm")}
            >
              {showPasswords.confirm ? (
                <IconEyeOff size={18} />
              ) : (
                <IconEye size={18} />
              )}
            </button>
          }
          errorMessage={touched.confirmPassword ? errors.confirmPassword : ""}
          isInvalid={!!(errors.confirmPassword && touched.confirmPassword)}
          label="Confirmar Nueva Contraseña"
          placeholder="Repite la nueva contraseña"
          size="md"
          startContent={<IconLock className="text-gray-400" size={18} />}
          type={showPasswords.confirm ? "text" : "password"}
          value={formData.confirmPassword}
          variant="bordered"
          onBlur={() => onBlur("confirmPassword")}
          onValueChange={(value) => onInputChange("confirmPassword", value)}
        />
      </CardBody>
    </Card>
  );
};
