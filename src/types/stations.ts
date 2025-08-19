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
