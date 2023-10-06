import { OnClickFormData } from "../App";
import { Event } from "../Helpers/createCalendarAPI";
import { formatDateToYYYYMMDD } from "../Helpers/formatDateToYYYYMMDD";
import { EventItem } from "./Event";
import { WeekViewCalendarHeader } from "./WeekViewCalendarHeader";
import { Column } from "./WeekViewDayColl";

export const WeekViewCalendar: React.FC<{
  onDayClick: (date: Date) => void;
  activeDay: Date;
  today: Date;
  events: Event[];
  handleEventDelete: (id: number) => void;
  onTimeClick: (onClickFormData: OnClickFormData) => void;
}> = ({
  activeDay,
  events,
  handleEventDelete,
  onDayClick,
  today,
  onTimeClick,
}) => {
  const dayColumnData: {
    date: string;
  }[] = [];

  const year = activeDay.getFullYear();
  const month = activeDay.getMonth();
  const day = activeDay.getDate();
  const todayWeekDay = new Date(year, month, day).getDay(); // 0-6 Sunday-Saturday
  const currentWeekStart = new Date(activeDay);
  currentWeekStart.setDate(day - todayWeekDay);

  const weekViewDayColumn = new Array(7).fill({}).map((_, i) => {
    const renderingDay = new Date(currentWeekStart);
    renderingDay.setDate(renderingDay.getDate() + i);
    return {
      date: formatDateToYYYYMMDD(renderingDay),
    };
  });

  const weekViewDayColums = [...dayColumnData, ...weekViewDayColumn];

  return (
    <section className="lg-calendar-wrapper">
      <div className="lg-calendar__gmt--wrapper">
        <span className="lg-calendar__gmt">gmt+03</span>
        <span className="lg-calendar__gmt--border"></span>
      </div>

      <WeekViewCalendarHeader
        activeDay={activeDay}
        onDayClick={onDayClick}
        today={today}
      />

      <ul className="lg-calendar__hour-list-wrapper">
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">1 am</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">2 am</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">3 am</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">4 am</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">5 am</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">6 am</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">7 am</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">8 am</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">9 am</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">10 am</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">11 am</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">12 pm</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">1 pm</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">2 pm</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">3 pm</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">4 pm</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">5 pm</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">6 pm</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">7 pm</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">8 pm</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">9 pm</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">10 pm</span>
        </li>
        <li className="lg-calendar__hour">
          <span className="lg-calendar__hour--y-position">11 pm</span>
        </li>
      </ul>
      <div className="week-layout-wrapper">
        {weekViewDayColums.map((columnDate) => {
          return (
            <Column
              key={columnDate.date}
              date={columnDate.date}
              onTimeClick={onTimeClick}
            >
              {events
                .filter((event) => event.date === columnDate.date)
                .map((event, i) => {
                  return (
                    <EventItem
                      key={i}
                      event={event}
                      onDelete={() => handleEventDelete(event.id)}
                    />
                  );
                })}
            </Column>
          );
        })}
      </div>
    </section>
  );
};
