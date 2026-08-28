import {
  addDays,
  format,
  parseISO,
} from "date-fns";

export function getNextDays(selectedDate) {
  return Array.from({ length: 6 }, (_, index) => ({
    date: format(
      addDays(parseISO(selectedDate), index + 1),
      "yyyy-MM-dd"
    )
  }));
}

export function getWeekDays(selectedDate) {
  return Array.from({ length: 7 }, (_, index) => {
    const date = addDays(
      parseISO(selectedDate),
      index
    );

    return {
      date: format(date, "yyyy-MM-dd"),
      label: format(date, "EEE d")
    };
  });
}

export function moveDateByDay(selectedDate, amount) {
  return format(
    addDays(parseISO(selectedDate), amount),
    "yyyy-MM-dd"
  );
}