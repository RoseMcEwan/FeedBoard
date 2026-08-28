import { Fragment } from "react";
import { format, parseISO } from "date-fns";
import HerdTitle from "../../../components/HerdTitle";
import BreakLocations from "./BreakLocations";

export default function NextDaysTable({ days, herds, paddocks, paddockOrder }) {
  return (
    <section className="future-section">
      <h2>Week ahead</h2>

      <table className="table future-table">
        <thead>
          <tr>
            <th className="future-date-column"></th>

            {herds.map((herd) => (
              <th key={herd.id} colSpan={2}>
              <HerdTitle herd={herd} />
              </th>
            ))}
          </tr>

          <tr>
            <th></th>

            {herds.map((herd) => (
              <Fragment key={`${herd.id}-periods`}>
                <th>AM</th>
                <th>PM</th>
              </Fragment>
            ))}
          </tr>
        </thead>

        <tbody>
          {days.map((day) => (
            <tr key={day.date}>
              <td className="future-date">
                {format(parseISO(day.date), "EEE d MMM")}
              </td>

              {herds.map((herd) => {
const herdPlan =
  paddockOrder[herd.id]?.[day.date] ?? {};

                return (
                   <Fragment key={`${day.date}-${herd.id}`}>
                    <td>
                      <BreakLocations
                        allocations={herdPlan.am?.allocations}
                        paddocks={paddocks}
                      />
                    </td>

                    <td>
                      <BreakLocations
                        allocations={herdPlan?.pm?.allocations}
                        paddocks={paddocks}
                      />
                    </td>
                  </Fragment>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}