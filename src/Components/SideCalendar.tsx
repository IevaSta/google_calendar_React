import { useCalendarState } from "../Reducer/CalendarReducer";
import SideCalendarDays from "./SideCalendarDays";

function SideCalendar() {
  const { state, dispatchState } = useCalendarState();

  const handleNextMonth = () => {
    dispatchState({ type: "NEXT_MONTH" });
  };

  const handleBackMonth = () => {
    dispatchState({ type: "BACK_MONTH" });
  };

  const handleTitle = () => {
    const date = new Date(state.activeDay);
    return `${date.toLocaleString("en-US", {
      month: "long",
    })} ${state.activeDay.getFullYear()}`;
  };

  const handleOpenModal = () => {
    dispatchState({ type: "IS_OPEN_MODAL", payload: true });
  };

  return (
    <aside className="side-wrapper">
      <button
        className="open-event-modal button oval"
        onClick={handleOpenModal}
      >
        <img src="./assets/svg/add.svg" alt="Google add icon." />
        Create
      </button>

      <section className="side-calendar">
        <div className="side-calendar__header">
          <h3 className="side-calendar__title">{`${handleTitle()}`}</h3>
          <div className="side-calendar__header--btn-wrapper">
            <button
              className="button arrow backward-month__side"
              onClick={handleBackMonth}
            >
              <img
                className="side-calendar__arrow"
                src="./assets/svg/arrow-left.svg"
                alt="Arrow to go back one step."
              />
            </button>
            <button
              className="button arrow forward-month__side"
              onClick={handleNextMonth}
            >
              <img
                className="side-calendar__arrow"
                src="./assets/svg/arrow-right.svg"
                alt="Arrow to go forward one step."
              />
            </button>
          </div>
        </div>

        <div className="side-calendar__body">
          <ul className="side-calendar__column">
            <li>S</li>
            <li>M</li>
            <li>T</li>
            <li>W</li>
            <li>T</li>
            <li>F</li>
            <li>S</li>
          </ul>

          <SideCalendarDays />
        </div>
      </section>
    </aside>
  );
}

export default SideCalendar;
