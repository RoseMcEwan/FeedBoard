import PageHeader from "../../../components/PageHeader";

export default function CalendarPageHeader({
  herds,
  herdFilter,
  onChangeHerd,
  onPreviousDay,
  onToday,
  onNextDay
}) {
  return (
<PageHeader
title="Planner"
subtitle="Plan your grazing breaks"
>

      <div className="planner-controls">
        <button
          type="button"
          className="button button--square"
          onClick={onPreviousDay}
        >
          ‹
        </button>

        <button
          type="button"
          className="button button--wide"
          onClick={onToday}
        >
          Today
        </button>

        <button
          type="button button--square"
          className="button button--square"
          onClick={onNextDay}
        >
          ›
        </button>

        <select
          className="form-control planner-select"
          value={herdFilter}
          onChange={(event) =>
            onChangeHerd(event.target.value)
          }
        >
          <option value="all">
            All Herds
          </option>

          {herds.map((herd) => (
            <option
              key={herd.id}
              value={herd.id}
            >
              {herd.name}
            </option>
          ))}
        </select>
      </div>
    </PageHeader>
  );
}