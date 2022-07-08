import { Sensor } from "../interfaces";

export const getData = async () => {
  const data: Sensor = {
    time: Date.now(),
    temperature: Math.random() * 100,
    humidity: Math.random() * 100,
  };
  return data;
};
