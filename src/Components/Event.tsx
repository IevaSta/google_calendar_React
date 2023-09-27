import { timeConverterToPixels } from "../Helpers/timeConverterToPx";
import { Event } from "../Helpers/createCalendarAPI";

export const EventItem: React.FC<{
  event: Event;
  onDelete: () => void;
}> = ({ event, onDelete }) => {
  if (!event) {
    throw new Error("Event prop is null or undefined");
  }

  const marginTop = timeConverterToPixels(event.start);
  const height =
    timeConverterToPixels(event.end) - timeConverterToPixels(event.start);

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
          onClick={onDelete}
        >
          x
        </button>
      </span>
      <span className="event-time">{event.start}</span>
      <span className="event-time">{event.end}</span>
    </div>
  );
};
