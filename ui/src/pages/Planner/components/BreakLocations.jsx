export default function BreakLocations({ allocations, paddocks }) {
  if (!allocations?.length) {
    return <span>-</span>;
  }

  return allocations.map((allocation) => {
    const paddock = paddocks.find(
      (paddock) => paddock.id === allocation.paddockId
    );

    return (
      <div 
      className="break-location"
      key={`${allocation.paddockId}-${allocation.hectares}`}>
        <strong>{paddock?.name ?? "-"}</strong>
        <small>{allocation.hectares} ha</small>
      </div>
    );
  });
}