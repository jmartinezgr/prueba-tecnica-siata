import { IconTool, IconWifi, IconWifiOff } from "@tabler/icons-react";
import { Chip } from "@heroui/react";

import { Station } from "@/types/stations";

const StatusChip = ({ status }: { status: Station["status"] }) => {
  const statusConfig = {
    active: { color: "success" as const, icon: IconWifi, text: "Activo" },
    inactive: {
      color: "danger" as const,
      icon: IconWifiOff,
      text: "Inactivo",
    },
    maintenance: {
      color: "warning" as const,
      icon: IconTool,
      text: "Mantenimiento",
    },
  };

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
