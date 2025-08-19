// components/PersonalInfoForm.tsx
import { Input, Card, CardBody, CardHeader } from "@heroui/react";
import { IconUser, IconMail, IconUserCheck } from "@tabler/icons-react";

interface PersonalInfoFormProps {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
  };
  errors: {
    firstName?: string;
    lastName?: string;
    email?: string;
  };
  touched: Record<string, boolean>;
  onInputChange: (field: string, value: string) => void;
  onBlur: (field: string) => void;
}

export const PersonalInfoForm = ({
  formData,
  errors,
  touched,
  onInputChange,
  onBlur,
}: PersonalInfoFormProps) => {
  return (
    <Card className="shadow-lg border border-gray-200 h-fit">
      <CardHeader className="pb-3 md:pb-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100">
            <IconUserCheck className="text-blue-600" size={20} />
          </div>
          <div>
            <h2 className="text-lg md:text-xl font-semibold text-gray-900">
              Información Personal
            </h2>
            <p className="text-xs md:text-sm text-gray-600">
              Actualiza tu información básica
            </p>
          </div>
        </div>
      </CardHeader>
      <CardBody className="pt-0 space-y-4 md:space-y-6">
        <Input
          isRequired
          classNames={{
            inputWrapper: "border-slate-300 data-[hover=true]:border-slate-500",
          }}
          color={errors.firstName && touched.firstName ? "danger" : "default"}
          errorMessage={touched.firstName ? errors.firstName : ""}
          isInvalid={!!(errors.firstName && touched.firstName)}
          label="Nombres"
          placeholder="Ingresa tus nombres"
          size="md"
          startContent={<IconUser className="text-gray-400" size={18} />}
          value={formData.firstName}
          variant="bordered"
          onBlur={() => onBlur("firstName")}
          onValueChange={(value) => onInputChange("firstName", value)}
        />

        <Input
          isRequired
          classNames={{
            inputWrapper: "border-slate-300 data-[hover=true]:border-slate-500",
          }}
          color={errors.lastName && touched.lastName ? "danger" : "default"}
          errorMessage={touched.lastName ? errors.lastName : ""}
          isInvalid={!!(errors.lastName && touched.lastName)}
          label="Apellidos"
          placeholder="Ingresa tus apellidos"
          size="md"
          startContent={<IconUser className="text-gray-400" size={18} />}
          value={formData.lastName}
          variant="bordered"
          onBlur={() => onBlur("lastName")}
          onValueChange={(value) => onInputChange("lastName", value)}
        />

        <Input
          isDisabled
          classNames={{
            inputWrapper: "border-slate-300 bg-slate-50",
          }}
          label="Correo Electrónico"
          size="md"
          startContent={<IconMail className="text-gray-400" size={18} />}
          value={formData.email}
          variant="bordered"
        />
      </CardBody>
    </Card>
  );
};
