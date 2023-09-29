import { timeConverterToPixels } from "../Helpers/timeConverterToPx";
import { Event } from "../Helpers/createCalendarAPI";

export const EventItem: React.FC<{
  event: Event;
  onDelete: () => void;
}> = ({ event, onDelete }) => {
  return (
    <div
      className="event"
      style={{
        marginTop: timeConverterToPixels(event.start),
        height:
          timeConverterToPixels(event.end) - timeConverterToPixels(event.start),
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
