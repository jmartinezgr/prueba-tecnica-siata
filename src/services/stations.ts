import api from "@/services";
import { Station } from "@/types/stations";

export const fetchStations = async (): Promise<Station[]> => {
  const response = await api.get("/");

  return response.data;
};
