import { MonthViewCalendarDays } from "./MonthViewCalendarDays";

export const MonthViewCalendar: React.FC<{
  onPrevClick: () => void;
  onNextClick: () => void;
  onDayClick: (date: Date) => void;
  activeDay: Date;
}> = ({ onPrevClick, onNextClick, onDayClick, activeDay }) => {
  return (
    <>
      <section className="side-calendar">
        <div className="side-calendar__header">
          <h3 className="side-calendar__title">
            {activeDay.toLocaleString("en-US", {
              month: "long",
            })}{" "}
            {activeDay.getFullYear()}
          </h3>
          <div className="side-calendar__header--btn-wrapper">
            <button
              className="button arrow backward-month__side"
              onClick={onPrevClick}
            >
              <img
                className="side-calendar__arrow"
                src="./assets/svg/arrow-left.svg"
                alt="Arrow to go back one step."
              />
            </button>
            <button
              className="button arrow forward-month__side"
              onClick={onNextClick}
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
        </div>

        <MonthViewCalendarDays onDayClick={onDayClick} activeDay={activeDay} />
      </section>
    </>
  );
};
