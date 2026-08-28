import { calculateTotalHa24h, calculatePastureKgDM, calculateFeedDifference,} from "../../../utils/calculateFeedMetrics.js";
import FeedCalculation from "./FeedCalculation.jsx";
import { InputWithUnit, InputWithoutUnit, SelectField } from "../../../components/FormFields.jsx";

export default function HerdDataCard({ herd, information, onChange }) {
  const totalHa24h = calculateTotalHa24h(
    herd.totalArea,
    information.roundLengthDays,
  );

  const pastureKgDM = calculatePastureKgDM({
    totalHa24h,
    targetCover: information.targetCover,
    residualKgDmHa: information.residualKgDmHa,
    animals: herd.animals,
  });

  const difference = calculateFeedDifference(herd.targetKgDMDay, pastureKgDM);

  return (
    <article className="card farm-card herd-data-card">
      <h3>{herd.name}</h3>

<div className="field-grid">
  <InputWithoutUnit
   label="Animals"
      value={herd.animals}
      onChange={(event) =>
        onChange(herd.id, "animals", event.target.value)
      }
    /> 

<SelectField
label="Stock class"
      value={herd.stockClass}
      options={["MA", "Heifers"]}
      onChange={(event) =>
        onChange(
          herd.id,
          "stockClass",
          event.target.value
        )
      }
    />

        <InputWithUnit
          label="Total area"
          value={herd.totalArea}
          unit="ha"
          onChange={(event) =>
            onChange(herd.id, "totalArea", event.target.value)
          }
        />

        <InputWithUnit
          label="Target KgDM/cow"
          value={herd.targetKgDMDay}
          unit="kg"
          onChange={(event) =>
            onChange(herd.id, "targetKgDMDay", event.target.value)
          }
        />
      </div>
      <div className="feed-metrics">
        <FeedCalculation
          label="Target"
          value={Number(herd.targetKgDMDay).toFixed(1)}
        />
        <FeedCalculation label={`${information.roundLengthDays} day round`} value={pastureKgDM.toFixed(1)} />

        <FeedCalculation label="Difference" value={difference.toFixed(1)} />
      </div>
    </article>
  );
}
