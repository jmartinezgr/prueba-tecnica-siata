import api from "@/services";
import { Station } from "@/types/stations";

export const fetchStations = async (): Promise<Station[]> => {
  const response = await api.get("/");

  return response.data;
};

export const fetchStationInfo = async (id: string): Promise<Station> => {
  const response = await api.get(`/${id}`);

  return response.data;
};
