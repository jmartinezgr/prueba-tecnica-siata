/* eslint-disable prettier/prettier */
import api from "@/services";
import { Station, StationFormData } from "@/types/stations";

export const fetchStations = async (): Promise<Station[]> => {
  const response = await api.get("/");

  return response.data;
};

export const fetchStationInfo = async (id: string): Promise<Station> => {
  const response = await api.get(`/${id}`);

  return response.data;
};

export const createStation = async (
  formData: StationFormData
): Promise<Station> => {
  const response = await api.post("/", formData);

  return response.data;
};

export const updateStation = async ({
  stationId,
  formData,
}: {
  stationId: string;
  formData: StationFormData;
}): Promise<Station> => {
  const response = await api.put(`/${stationId}`, formData);

  return response.data;
};

export const deleteStation = async (id: string): Promise<void> => {
  await api.delete(`/${id}`);
};
