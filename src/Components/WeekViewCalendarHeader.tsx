export const WeekViewCalendarHeader: React.FC<{
  setActiveDayClick: (date: Date) => void;
  activeDay: Date;
  today: Date;
}> = ({ setActiveDayClick, activeDay, today }) => {
  const getWeekDayName = (_date: Date) => {
    const date = new Date(_date);
    return `${date.toLocaleString("en-US", {
      weekday: "short",
    })}`;
  };

  const days: {
    isCurrentDay: boolean;
    isActiveDay: boolean;
    weekDay: string;
    monthDay: number;
    date: Date;
  }[] = [];

  const year = activeDay.getFullYear();
  const month = activeDay.getMonth();
  const day = activeDay.getDate();
  const todayWeekDay = new Date(year, month, day).getDay(); // 0-6 Sunday-Saturday
  const currentWeekStart = new Date(activeDay);
  currentWeekStart.setDate(day - todayWeekDay);
  const getWeekDays = () => {
    const weekDays = new Array(7).fill({}).map((_, i) => {
      const renderingDay = new Date(currentWeekStart);
      renderingDay.setDate(renderingDay.getDate() + i);
      return {
        isCurrentDay: renderingDay.toDateString() === today.toDateString(),
        isActiveDay: renderingDay.toDateString() === activeDay.toDateString(),
        weekDay: getWeekDayName(renderingDay),
        monthDay: renderingDay.getDate(),
        date: renderingDay,
      };
    });
    return [...days, ...weekDays];
  };
  const weekDays = getWeekDays();
  return (
    <ul className="lg-calendar__column">
      {weekDays.map((day) => (
        <li
          key={day.date.toDateString()}
          className={`lg-calendar__column-list`}
        >
          <span className="week-day">{day.weekDay}</span>
          <button
            onClick={() => setActiveDayClick(day.date)}
            className={`month-day ${day.isCurrentDay ? "crr-day" : ""} ${
              day.isActiveDay
                ? day.isActiveDay !== day.isCurrentDay
                  ? "active-day"
                  : ""
                : ""
            }`}
          >
            {day.monthDay}
          </button>
          <span className="lg-calendar__column-list--border"></span>
        </li>
      ))}
    </ul>
  );
};
