export const WeekViewCalendarHeader: React.FC<{
  onDayClick: (date: Date) => void;
  activeDay: Date;
  today: Date;
}> = ({ onDayClick, activeDay, today }) => {
  const dayOfTheMonth = activeDay.getDate();
  const dayOfTheWeek = activeDay.getDay(); // 0-6 Sunday-Saturday
  const activeWeekStart = new Date(activeDay);
  activeWeekStart.setDate(dayOfTheMonth - dayOfTheWeek);

  const weekDayStateList = new Array(7).fill({}).map((_, i) => {
    const day = new Date(activeWeekStart);
    day.setDate(day.getDate() + i);
    return {
      isCurrentDay: day.toDateString() === today.toDateString(),
      isActiveDay: day.toDateString() === activeDay.toDateString(),
      weekDay: getWeekDayName(day),
      monthDay: day.getDate(),
      date: day,
    };
  });

  return (
    <ul className="lg-calendar__column">
      {weekDayStateList.map((day) => (
        <li
          key={day.date.toDateString()}
          className={`lg-calendar__column-list`}
        >
          <span className="week-day">{day.weekDay}</span>
          <button
            onClick={() => onDayClick(day.date)}
            className={`month-day ${day.isCurrentDay ? "crr-day" : ""} ${
              day.isActiveDay && day.isActiveDay !== day.isCurrentDay
                ? "active-day"
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

const getWeekDayName = (_date: Date) => {
  const date = new Date(_date);
  return `${date.toLocaleString("en-US", {
    weekday: "short",
  })}`;
};
