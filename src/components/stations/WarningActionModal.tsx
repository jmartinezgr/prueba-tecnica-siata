import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Divider,
  addToast,
} from "@heroui/react";
import { IconAlertTriangle, IconExclamationCircle } from "@tabler/icons-react";

import { WarningActionModalProps } from "@/types/stations";

const WarningActionModal: React.FC<WarningActionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  subtitle,
  body,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  confirmColor = "danger",
  icon,
  isLoading = false,
  size = "sm",
}) => {
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm();
    } catch {
      addToast({
        title: "Error",
        description: "Ocurrió un error al procesar la acción.",
        color: "danger",
      });
    } finally {
      setLoading(false);
    }
  };

  const getDefaultIcon = () => {
    switch (confirmColor) {
      case "danger":
        return <IconAlertTriangle className="text-danger" size={32} />;
      case "warning":
        return <IconExclamationCircle className="text-warning" size={32} />;
      default:
        return <IconAlertTriangle className="text-danger" size={32} />;
    }
  };

  const isProcessing = loading || isLoading;

  return (
    <Modal
      classNames={{
        backdrop:
          "bg-gradient-to-t from-zinc-900 to-zinc-900/10 backdrop-opacity-20",
        wrapper: "z-[1001]",
      }}
      isOpen={isOpen}
      motionProps={{
        variants: {
          enter: {
            y: 0,
            opacity: 1,
            transition: {
              duration: 0.3,
              ease: "easeOut",
            },
          },
          exit: {
            y: -20,
            opacity: 0,
            transition: {
              duration: 0.2,
              ease: "easeIn",
            },
          },
        },
      }}
      placement="center"
      size={size}
      onClose={onClose}
    >
      <ModalContent>
        <ModalHeader className="flex flex-col items-center gap-1 pb-2">
          <div className="flex items-center gap-3">
            {icon || getDefaultIcon()}
            <div className="flex flex-col">
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              {subtitle && (
                <p className="text-sm text-foreground-500 font-normal">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
        </ModalHeader>

        <Divider />

        <ModalBody className="py-4">
          <p className="text-center text-foreground-700 leading-relaxed">
            {body}
          </p>
        </ModalBody>

        <ModalFooter className="flex justify-center gap-2 pt-2">
          <Button
            className="min-w-[100px]"
            isDisabled={isProcessing}
            variant="light"
            onPress={onClose}
          >
            {cancelText}
          </Button>
          <Button
            className="min-w-[100px] font-medium"
            color={confirmColor}
            isLoading={isProcessing}
            onPress={handleConfirm}
          >
            {confirmText}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default WarningActionModal;
