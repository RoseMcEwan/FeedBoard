function getWeatherForDay(date, weather) {
  const middayWeather = weather.find((item) =>
    item.time.startsWith(`${date}T00`),
  );

  if (middayWeather) {
    return middayWeather;
  }

  return weather.find((item) => item.time.startsWith(date));
}

function getWeatherEmoji(symbolCode) {
  const emojis = {
    clearsky_day: "☀️",
    fair_day: "🌤️",
    partlycloudy_day: "⛅",
    cloudy: "☁️",
    fog: "🌫️",

    lightrain: "🌦️",
    rain: "🌧️",
    heavyrain: "🌧️",

    lightrainshowers_day: "🌦️",
    rainshowers_day: "🌦️",
    heavyrainshowers_day: "🌧️",

    lightsnow: "🌨️",
    snow: "🌨️",
    heavysnow: "❄️",

    lightsnowshowers_day: "🌨️",
    snowshowers_day: "🌨️",
    heavysnowshowers_day: "❄️",

    sleet: "🌨️",
    lightsleet: "🌨️",
    heavysleet: "🌨️",

    thunderstorm: "⛈️",
    rainandthunder: "⛈️",
  };

  return emojis[symbolCode] ?? "☁️";
}

export default function WeekStrip({
  days,
  weather,
  selectedDate,
  onSelectDate,
}) {
  return (
    <div className="week-strip">
      {days.map((day) => {
        const dayWeather = getWeatherForDay(day.date, weather);

        const temperature = dayWeather?.data?.instant?.details?.air_temperature;

        const symbolCode = dayWeather?.data?.next_6_hours?.summary?.symbol_code;

        const weatherEmoji = symbolCode ? getWeatherEmoji(symbolCode) : "";

        const isSelected = day.date === selectedDate;

        return (
          <button
            key={day.date}
            type="button"
            className={
              isSelected
              ? "day-tile selected" 
              : "day-tile"
            }
            onClick={() => onSelectDate(day.date)}
          >
            <strong>{day.label}</strong>
            <span className="weather-icon">{weatherEmoji}</span>

            <span className="weather-temp">
              {temperature !== undefined 
              ? `${Math.round(temperature)}°` 
              : "—"}
            </span>
          </button>
        );
      })}
    </div>
  );
}
