import { onChangeStationFormDataFunct } from "@/types/stations";

export const useStatusHandler = () => {
  const getStatusValue = (status: string | boolean): string => {
    if (typeof status === "boolean") {
      return status ? "active" : "inactive";
    }

    return status;
  };

  const handleStatusChange = (
    value: string,
    // eslint-disable-next-line prettier/prettier
    onChange: onChangeStationFormDataFunct
  ): void => {
    onChange("status", value as "active" | "inactive" | "maintenance");
  };

  return {
    getStatusValue,
    handleStatusChange,
  };
};
