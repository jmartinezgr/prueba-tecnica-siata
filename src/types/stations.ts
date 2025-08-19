export interface Station {
  id: string;
  name: string;
  location: string;
  status: "active" | "inactive" | "maintenance" | boolean;
  latitude: number;
  longitude: number;
  type: string;
  last_answer: string;
  temp: number;
}

export type StationFormData = Omit<Station, "id">;

export type onChangeStationFormDataFunct = (
  field: keyof StationFormData,
  // eslint-disable-next-line prettier/prettier
  value: string | number | boolean
) => void;

export interface WarningActionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void | Promise<void>;
  title: string;
  subtitle?: string;
  body: string;
  confirmText?: string;
  cancelText?: string;
  confirmColor?:
    | "danger"
    | "warning"
    | "primary"
    | "secondary"
    | "success"
    | "default";
  icon?: React.ReactNode;
  isLoading?: boolean;
  size?:
    | "xs"
    | "sm"
    | "md"
    | "lg"
    | "xl"
    | "2xl"
    | "3xl"
    | "4xl"
    | "5xl"
    | "full";
}
