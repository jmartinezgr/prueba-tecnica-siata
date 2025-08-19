import { IconTool, IconWifi, IconWifiOff } from "@tabler/icons-react";
import { Chip } from "@heroui/react";

type StatusType = "active" | "inactive" | "maintenance";

const StatusChip = ({ status }: { status: StatusType | boolean }) => {
  const statusConfig: Record<
    StatusType,
    {
      color: "success" | "danger" | "warning";
      icon: React.ElementType;
      text: string;
    }
  > = {
    active: { color: "success", icon: IconWifi, text: "Activo" },
    inactive: {
      color: "danger",
      icon: IconWifiOff,
      text: "Inactivo",
    },
    maintenance: {
      color: "warning",
      icon: IconTool,
      text: "Mantenimiento",
    },
  };

  if (typeof status === "boolean") {
    return (
      <Chip
        color={status ? "success" : "danger"}
        size="sm"
        startContent={
          status ? <IconWifi size={16} /> : <IconWifiOff size={16} />
        }
        variant="flat"
      >
        {status ? "Activo" : "Inactivo"}
      </Chip>
    );
  }

  const config = statusConfig[status];
  const Icon = config.icon;

  return (
    <Chip
      color={config.color}
      size="sm"
      startContent={<Icon size={16} />}
      variant="flat"
    >
      {config.text}
    </Chip>
  );
};

export default StatusChip;
