import { useCalendarState } from "../Reducer/CalendarReducer";

function SideCalendarDays() {
  const { state, dispatchState } = useCalendarState();

  const handleSetActiveDay = (date: Date) => {
    dispatchState({ type: "CLICKED_ACTIVE_DAY", payload: date });
  };

  const year = state.activeDay.getFullYear();
  const month = state.activeDay.getMonth();

  const firsWeekDayOfCrrMonth = new Date(year, month, 1).getDay(); //0-6 sunday-saturday

  //   https://stackoverflow.com/questions/222309/calculate-last-day-of-month
  const getCalendarDays = () => {
    const lastDayOfPrevMonth = new Date(year, month, 0).getDate();

    const daysInPrevMonth = new Array(lastDayOfPrevMonth) //month ---> 0-11
      .fill({})
      .map((_, i) => {
        return {
          number: i + 1,
          type: "prev_month",
          date: new Date(year, month - 1, i + 1),
        };
      })
      .slice(lastDayOfPrevMonth - firsWeekDayOfCrrMonth);

    const daysInCrrMonth = new Array(new Date(year, month + 1, 0).getDate()) //month ---> 0-11
      .fill({})
      .map((_, i) => {
        return {
          number: i + 1,
          type: "crr_month",
          date: new Date(year, month, i + 1),
        };
      });

    const daysInNextMonth = new Array(new Date(year, month + 2, 0).getDate()) //month ---> 0-11
      .fill({})
      .map((_, i) => {
        return {
          number: i + 1,
          type: "next_month",
          date: new Date(year, month + 1, i + 1),
        };
      })
      .slice(0, 42 - daysInPrevMonth.length - daysInCrrMonth.length);

    return [...daysInPrevMonth, ...daysInCrrMonth, ...daysInNextMonth];
  };

  const calendarDays = getCalendarDays();

  return (
    <ul className="side-calendar__list">
      {calendarDays.map((day) => (
        <li key={day.date.toDateString()}>
          <button
            onClick={() => handleSetActiveDay(day.date)}
            className={`side-calendar__day ${
              day.date.toDateString() === new Date().toDateString()
                ? "crr-day"
                : ""
            } ${
              day.number === state.activeDay.getDate() &&
              day.type === "crr_month"
                ? "active-day"
                : ""
            } ${day.type === "crr_month" ? "crr_month" : "not-curr-month"}`}
          >
            {day.number}
          </button>
        </li>
      ))}
    </ul>
  );
}

export default SideCalendarDays;
