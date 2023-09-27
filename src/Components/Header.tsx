export const Header: React.FC<{
  onTodayClick: () => void;
  displayPreviousWeek: () => void;
  displayNextWeek: () => void;
  activeDay: Date;
}> = ({ onTodayClick, displayPreviousWeek, displayNextWeek, activeDay }) => {
  const handleTitle = () => {
    const date = new Date(activeDay);
    return `${date.toLocaleString("en-US", {
      month: "long",
    })} ${activeDay.getFullYear()}`;
  };

  return (
    <header className="header-wrapper">
      <div className="header__nav-wrapper">
        <button className="button round">
          <img src="../assets/svg/burger.svg" alt="Burger." />
        </button>
        <img
          className="header-logo"
          src="https://ssl.gstatic.com/calendar/images/dynamiclogo_2020q4/calendar_13_2x.png"
          alt="Google calendar logo."
        />
        <h1 className="header-title">Calendar</h1>

        <button className="button rectangle set-today" onClick={onTodayClick}>
          Today
        </button>
        <button
          className="button arrow backward-week__main"
          onClick={displayPreviousWeek}
        >
          <img
            className="header-arrow"
            src="../assets/svg/arrow-left.svg"
            alt="Arrow to go back one step."
          />
        </button>
        <button
          className="button arrow forward-week__main"
          onClick={displayNextWeek}
        >
          <img
            className="header-arrow"
            src="../assets/svg/arrow-right.svg"
            alt="Arrow to go forward one step."
          />
        </button>
        <h2 id="title_main" className="render-title__header header-subtitle">
          {`${handleTitle()}`}
        </h2>
      </div>

      <select className="select" name="time-range" id="time-range">
        <option value="week">Week</option>
      </select>
    </header>
  );
};
