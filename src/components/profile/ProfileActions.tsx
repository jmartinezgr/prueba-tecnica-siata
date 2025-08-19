// components/ProfileActions.tsx
import { Button, Card, CardBody } from "@heroui/react";

interface ProfileActionsProps {
  isFormValid: boolean;
  isLoading: boolean;
  onSubmit: () => void;
  onReset: () => void;
}

export const ProfileActions = ({
  isFormValid,
  isLoading,
  onSubmit,
  onReset,
}: ProfileActionsProps) => {
  return (
    <Card className="shadow-lg border border-gray-200">
      <CardBody className="p-4 md:p-6">
        <div className="flex flex-col sm:flex-row justify-end gap-3 md:gap-4">
          <Button
            className="w-full sm:w-auto px-6 md:px-8 py-2 border-2 border-slate-300 hover:border-slate-400 transition-colors"
            size="md"
            variant="bordered"
            onPress={onReset}
          >
            Limpiar Cambios
          </Button>
          <Button
            className="w-full sm:w-auto px-6 md:px-8 py-2 bg-gradient-to-r from-slate-700 to-slate-800 hover:from-slate-800 hover:to-slate-900 text-white font-semibold transition-all duration-200 shadow-lg hover:shadow-xl"
            isDisabled={!isFormValid}
            isLoading={isLoading}
            size="md"
            onPress={onSubmit}
          >
            {isLoading ? "Actualizando..." : "Actualizar Perfil"}
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};
