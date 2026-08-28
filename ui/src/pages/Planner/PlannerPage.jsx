import { useState } from "react";
import { format, parseISO } from "date-fns";

import useFarmData from "../../hooks/useFarmData.js";
import useWeather from "../../hooks/useWeather.js";

import NextDaysTable from "./components/NextDaysTable.jsx";
import HerdCard from "./components/HerdCard.jsx";
import PaddockModal from "./components/PaddockModal.jsx";
import WeekStrip from "./components/WeekStrip.jsx";
import CalendarPageHeader from "./components/PlannerPageHeader.jsx";

import calculatePaddockPlan from "../../utils/calculatePaddockPlan.js";
import { getNextDays, getWeekDays,  moveDateByDay } from "../../utils/calendarDates.js";

export default function CalendarPage() {
  const today = format(new Date(), "yyyy-MM-dd");
  const {
  farm,
  error
} = useFarmData();


  const [selectedDate, setSelectedDate] = useState(today);
  const [herdFilter, setHerdFilter] = useState("all");

  const [modal, setModal] = useState(null);
  const [paddockOrder, setPaddockOrder] = useState({});
  const [nextPaddocks, setNextPaddocks] = useState({});
const nextDays = getNextDays(selectedDate);
const weekDays = getWeekDays(selectedDate);

const visibleHerds = farm?.herds.filter((herd) => 
  herdFilter === "all" || herd.id === herdFilter) 
??[];

const farmInfo =
  farm?.information[0];

const weather = useWeather(
  farmInfo?.latitude,
  farmInfo?.longitude
);

const moveDay = (amount) => {
  setSelectedDate((currentDate) =>
    moveDateByDay(currentDate, amount)
  );
};

function savePaddockOrder(order) {
  const herd = modal.herd;

  setNextPaddocks((current) => ({
    ...current,
    [herd.id]: order
  }));

  const calculatedPlan = calculatePaddockPlan({
    herd, order, 
    information: farm.information, 
    paddocks: farm.paddocks,
    selectedDate,
  })

  setPaddockOrder((current) => ({
    ...current,
    [herd.id]: calculatedPlan
  }));

  setModal(null);
}

if (error) {
  return (
    <div className="state-card error"> {error} </div>
  );
}

if(!farm) {
  return(
    <div className="state-card">
      Loading FeedBoard
    </div>
  );
}

  return (
    <>
      <CalendarPageHeader
        herds={farm.herds}
        herdFilter={herdFilter}
        onChangeHerd={setHerdFilter}
onPreviousDay={() => moveDay(-1)}
onToday={() => setSelectedDate(today)}
onNextDay={() => moveDay(1)}
      />


      <WeekStrip
        days={weekDays}
        weather={weather}
        selectedDate={selectedDate}
        onSelectDate={setSelectedDate}
      />


      <section className="today-section">
        <h2>
  {selectedDate === today
  ? "Today"
  : format (
    parseISO(selectedDate),
    "EEE, do MMMM"
  )}
        </h2>


        <div className="herd-grid">
          {visibleHerds.map((herd) => {
            const herdPlan =
              paddockOrder[herd.id]?.[
                selectedDate
              ] ?? {};

            return (
              <HerdCard
                key={herd.id}
                herd={herd}
                herdPlan={herdPlan}
                paddocks={
                  farm.paddocks
                }
                onChangePaddock={() =>
                  setModal({
                    herd
                  })
                }
              />
            );
          })}
        </div>
      </section>


      <NextDaysTable
        days={nextDays}
        herds={visibleHerds}
        paddocks={farm.paddocks}
        paddockOrder={paddockOrder}
      />


      <PaddockModal
        isOpen={Boolean(modal)}
        herd={modal?.herd}
        paddocks={farm.paddocks}
        currentOrder={
          modal?.herd
            ? nextPaddocks[
                modal.herd.id
              ] ?? []
            : []
        }
        onClose={() =>
          setModal(null)
        }
        onSave={savePaddockOrder}
      />
    </>
  );
}