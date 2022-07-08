import { Sensor } from "../interfaces";

export const getData = async () => {
  if (process.env.NODE_ENV === "development") {
    const data: Sensor = {
      time: Date.now(),
      temperature: Math.random() * 100,
      humidity: Math.random() * 100,
    };
    return data;
  } else {
    const data: Sensor = {
      time: Date.now(),
      temperature: 0,
      humidity: 0,
    };
    return data;
  }
};
