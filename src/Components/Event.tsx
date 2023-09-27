import { timeConverterToPixels } from "../Helpers/timeConverterToPx";
import { Event as EventItem } from "../Helpers/createCalendarAPI";

export const Event: React.FC<{ event: EventItem }> = ({ event }) => {
  if (!event) {
    throw new Error("Event prop is null or undefined");
  }

  const marginTop = timeConverterToPixels(event.start);
  const height =
    timeConverterToPixels(event.end) - timeConverterToPixels(event.start);

  // const handleEventDelete = () => {
  //   console.log("event deleted", id);
  // };

  return (
    <div
      className="event"
      style={{
        marginTop: marginTop,
        height: height,
      }}
    >
      <span className="event-title">
        {event.title}
        <button
          className="event-delete-btn"
          data-id={event.id}
          // onClick={handleEventDelete}
        >
          x
        </button>
      </span>
      <span className="event-time">{event.start}</span>
      <span className="event-time">{event.end}</span>
    </div>
  );
};
