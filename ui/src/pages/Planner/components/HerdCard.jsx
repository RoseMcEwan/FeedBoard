import HerdTitle from "../../../components/HerdTitle";
import BreakLocations from "./BreakLocations";

export default function HerdCard({
  herd,
  herdPlan,
  paddocks,
  onChangePaddock
}) {
  const amAllocations =
    herdPlan?.am?.allocations ?? [];

  const pmAllocations =
    herdPlan?.pm?.allocations ?? [];

    return (
    <article className={`card herd-card ${herd.colour}`}>
      <div className="herd-card-header">
        <HerdTitle herd={herd} />

        <div className="herd-actions">
          <button
            type="button"
            className="button button--small"
            onClick={onChangePaddock}
          >
            Select paddocks
          </button>
        </div>
      </div>

      <div className="herd-breaks herd-card-breaks">
        <div>
          <p className="break-label">AM</p>

          <BreakLocations
            allocations={amAllocations}
            paddocks={paddocks}
          />
        </div>

        <div>
          <p className="break-label">PM</p>

          <BreakLocations
            allocations={pmAllocations}
            paddocks={paddocks}
          />
        </div>
      </div>
    </article>
  );
}