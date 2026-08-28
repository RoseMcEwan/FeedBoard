import {addDays, differenceInMinutes, format, parse, parseISO } from "date-fns";
import { calculateTotalHa24h } from "./calculateFeedMetrics.js";

export default function calculatePaddockPlan({
  herd,
  order,
  information,
  paddocks,
  selectedDate
}) {
  const info = information[0];

  const amTime = parse(
    info.amMilkingStart,
    "HH:mm",
    new Date()
  );

  const pmTime = parse(
    info.pmMilkingStart,
    "HH:mm",
    new Date()
  );

  const amMinutes = differenceInMinutes(
    pmTime,
    amTime
  );

const dailyHectares = calculateTotalHa24h(
    herd.totalArea,
    info.roundLengthDays
  );

  const amHectares =
    dailyHectares * (amMinutes / (24 * 60));

  const pmHectares =
    dailyHectares * (1 - (amMinutes / (24 * 60)));

  const orderedPaddocks = order
    .map((paddockId) =>
      paddocks.find(
        (paddock) => paddock.id === paddockId
      )
    )
    .filter(Boolean);

  const remaining = {};

  orderedPaddocks.forEach((paddock) => {
    remaining[paddock.id] = Number (paddock.hectares);
  });

  let paddockIndex = 0;
  const tolerance = 0.3;

  function allocateBreak(targetHectares) {
    const allocations = [];
    let hectaresNeeded = targetHectares;

    while (
      hectaresNeeded > 0 &&
      paddockIndex < orderedPaddocks.length
    ) {
      const paddock = orderedPaddocks[paddockIndex];
      const hectaresRemaining = remaining[paddock.id];

      if (hectaresRemaining <= 0) {
        paddockIndex += 1;
        continue;
      }

      if (hectaresRemaining >= hectaresNeeded) {
        const leftover =
          hectaresRemaining - hectaresNeeded;

        if (leftover <= tolerance) {
          allocations.push({
            paddockId: paddock.id,
            hectares: hectaresRemaining
          });

          remaining[paddock.id] = 0;
          paddockIndex += 1;
        } else {
          allocations.push({
            paddockId: paddock.id,
            hectares: hectaresNeeded
          });

          remaining[paddock.id] =
            hectaresRemaining - hectaresNeeded;
        }

        hectaresNeeded = 0;
        continue;
      }

      const deficit =
        hectaresNeeded - hectaresRemaining;

      allocations.push({
        paddockId: paddock.id,
        hectares: hectaresRemaining
      });

      remaining[paddock.id] = 0;
      paddockIndex += 1;

      if (deficit <= tolerance) {
        hectaresNeeded = 0;
      } else {
        hectaresNeeded = deficit;
      }
    }

    return allocations.map((allocation) => ({
      ...allocation,
      hectares: Number(allocation.hectares.toFixed(1))
    }));
  }

  const dates = Array.from(
    { length: 7 },
    (_, index) =>
      format(
        addDays(parseISO(selectedDate), index),
        "yyyy-MM-dd"
      )
  );

  const plan = {};

  dates.forEach((date) => {
    plan[date] = {
      am: {
        allocations: allocateBreak(amHectares)
      },
      pm: {
        allocations: allocateBreak(pmHectares)
      }
    };
  });

  return plan;
}