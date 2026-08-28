import useFarmData from "../../hooks/useFarmData.js";

import HerdDataCard from "./components/HerdDataCard.jsx";
import PageHeader from "../../components/PageHeader.jsx";
import PaddocksTable from "./components/PaddocksTable.jsx";
import {
  InputWithUnit,
  InputWithoutUnit,
} from "../../components/FormFields.jsx";

export default function FarmInfoPage() {
  const { farm, setFarm, error } = useFarmData();

  function updateInformation(infoId, field, value) {
    setFarm((currentFarm) => ({
      ...currentFarm,

      information: currentFarm.information.map((info) =>
        info.id === infoId
          ? {
            ...info,
            [field]: value,
          }
          : info,
      ),
    })); 
  }

  function updateHerd(herdId, field, value) {
    setFarm((currentFarm) => ({
      ...currentFarm,

      herds: currentFarm.herds.map((herd) =>
        herd.id === herdId
          ? {
            ...herd,
            [field]: value,
          }
          : herd,
      ),
    }));
  }

  function updatePaddock(paddockId, field, value) {
    setFarm((currentFarm) => ({
      ...currentFarm,

      paddocks: currentFarm.paddocks.map((paddock) =>
        paddock.id === paddockId
          ? {
            ...paddock,
            [field]: value,
          }
          : paddock,
      ),
    }));
  }

  if (error) {
    return <div className="state-card error">{error}</div>;
  }

  if (!farm) {
    return <p>Loading farm information</p>;
  }

  return (
    <>
      <PageHeader
        title="Farm information"
        subtitle="Herds and paddocks used by the
            grazing planner"
      />
      <section className="farm-section">
        <h2>Farm Data</h2>

        {farm.information.map((info) => (
          <article key={info.id} className="card farm-card">
            <div className="field-grid farm-info-grid">
              <div className="farm-location-row">
                <InputWithoutUnit
                  label="Farm name"
                  type="text"
                  value={info.farmName}
                  onChange={(event) =>
                    updateInformation(info.id, "farmName", event.target.value)
                  }
                />

                <InputWithoutUnit
                  label="Latitude"
                  value={info.latitude}
                  onChange={(event) =>
                    updateInformation(info.id, "latitude", event.target.value)
                  }
                />

                <InputWithoutUnit
                  label="Longitude"
                  value={info.longitude}
                  onChange={(event) =>
                    updateInformation(info.id, "longitude", event.target.value)
                  }
                />
              </div>

              <InputWithUnit
                label="AM milking"
                type="time"
                value={info.amMilkingStart}
                unit="AM"
                onChange={(event) =>
                  updateInformation(
                    info.id,
                    "amMilkingStart",
                    event.target.value,
                  )
                }
              />

              <InputWithUnit
                label="PM milking"
                type="time"
                value={info.pmMilkingStart}
                unit="PM"
                onChange={(event) =>
                  updateInformation(
                    info.id,
                    "pmMilkingStart",
                    event.target.value,
                  )
                }
              />
            </div>
          </article>
        ))}
      </section>

      <section className="farm-section">
        <h2>Pasture Data</h2>

        {farm.information.map((info) => (
          <article key={info.id} className="card farm-card">
            <div className="field-grid pasture-data-grid">
              <InputWithUnit
                label="Residual"
                value={info.residualKgDmHa}
                unit="KgDM/Ha"
                onChange={(event) =>
                  updateInformation(
                    info.id,
                    "residualKgDmHa",
                    event.target.value,
                  )
                }
              />

              <InputWithUnit
                label="Target cover"
                value={info.targetCover}
                unit="KgDM/Ha"
                onChange={(event) =>
                  updateInformation(info.id, "targetCover", event.target.value)
                }
              />

              <InputWithUnit
                label="Round length"
                value={info.roundLengthDays}
                unit="days"
                onChange={(event) =>
                  updateInformation(
                    info.id,
                    "roundLengthDays",
                    event.target.value,
                  )
                }
              />
            </div>
          </article>
        ))}
      </section>

      {/* HERD DATA */}

      <section className="farm-section">
        <h2>Herd Data</h2>

        <div className="farm-herd-grid">
          {farm.herds.map((herd) => (
            <HerdDataCard
              key={herd.id}
              herd={herd}
              information={farm.information[0]}
              onChange={updateHerd}
            />
          ))}
        </div>
      </section>

      {/* PADDOCKS */}

      <section className="farm-section">
        <h2>Paddocks</h2>
        <PaddocksTable
          paddocks={farm.paddocks}
          herds={farm.herds}
          onChange={updatePaddock}
        />
      </section>
    </>
  );
}
