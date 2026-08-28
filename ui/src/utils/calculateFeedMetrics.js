export function calculateTotalHa24h(
  totalArea,
  roundLengthDays
) {
  if (!roundLengthDays) return 0;

  return Number(totalArea) / Number(roundLengthDays);
}


export function calculatePastureKgDM({
  totalHa24h,
  targetCover,
  residualKgDmHa,
  animals
}) {
  if (!animals) return 0;

  return (
    Number(totalHa24h) *
    (
      Number(targetCover) -
      Number(residualKgDmHa)
    )
  ) / Number(animals);
}


export function calculateFeedDifference(
  targetKgDM,
  pastureKgDM
) {
  return (
    Number(pastureKgDM) -
    Number(targetKgDM) 
  );
}