import { useEffect, useState } from "react";

export default function useWeather(
  latitude,
  longitude
) {
  const [weather, setWeather] = useState([]);

  useEffect(() => {
    if (
      latitude == null ||
      longitude == null
    ) {
      return;
    }

    async function fetchWeather() {
      try {
        const response = await fetch(
          `/api/weather?lat=${latitude}&lon=${longitude}`
        );

        if (!response.ok) {
          throw new Error(
            "Could not load weather."
          );
        }

        const data = await response.json();

        setWeather(
          data.properties.timeseries
        );
      } catch (requestError) {
        console.error(requestError);
      }
    }

    fetchWeather();
  }, [latitude, longitude]);

  return weather;
}