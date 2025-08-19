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
