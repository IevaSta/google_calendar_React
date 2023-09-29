export type Availability = "BUSYYY" | "FREE";

export interface Event {
  title: string;
  date: string;
  start: string;
  end: string;
  id: number;
}

type CalendarAPI = {
  createEvent: (event: Omit<Event, "id">) => Promise<Event>;
  /** delete event */
  deleteEvent: (id: number) => Promise<void>;
  listEvents: () => Promise<Event[]>;
};

export function createCalendarAPI(config: {
  delay: number[] | number;
}): CalendarAPI {
  const delay = config.delay;

  const getRandomDelay = () => {
    if (Array.isArray(delay)) {
      return Math.floor(Math.random() * (delay[1] - delay[0])) + delay[0];
    }
    return delay;
  };

  const storageKey = "calendarEvents";

  const getEvents = (): Event[] =>
    <Array<Event>>JSON.parse(localStorage.getItem(storageKey) || "[]");

  const setEvents = (events: Event[]) =>
    localStorage.setItem(storageKey, JSON.stringify(events));

  return {
    createEvent: (event: Omit<Event, "id">): Promise<Event> =>
      new Promise((resolve) => {
        setTimeout(() => {
          const events = getEvents();
          const createdEvent = {
            id: new Date().getTime(),
            ...event,
          };
          events.push(createdEvent);
          setEvents(events);
          resolve(createdEvent);
        }, getRandomDelay());
      }),
    deleteEvent: (id) =>
      new Promise((resolve, reject) => {
        // setTimeout(() => {
        const events = getEvents();
        const index = events.findIndex((e: Event) => e.id === id);
        if (index !== -1) {
          events.splice(index, 1);
          setEvents(events);
          resolve();
        } else {
          reject("Event not found");
        }
        // }, getRandomDelay());
      }),
    listEvents: (): Promise<Event[]> =>
      new Promise((resolve) => {
        setTimeout(() => {
          resolve(getEvents());
        }, getRandomDelay());
      }),
  };
}
