import { useEffect, useState } from "react";

export default function useFarmData() {
  const [farm, setFarm] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchFarm() {
      try {
        const response = await fetch("/api/farm");

        if (!response.ok) {
          throw new Error(
            "Could not load farm information."
          );
        }

        const data = await response.json();

        setFarm(data);
      } catch (requestError) {
        setError(requestError.message);
      }
    }

    fetchFarm();
  }, []);

  return {
    farm,
    setFarm,
    error
  };
}