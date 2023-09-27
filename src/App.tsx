import { createRoot } from "react-dom/client";
import { useEffect, useReducer, useState } from "react";
import { eventReducer } from "./Reducer/EventReducer";
import { MonthViewCalendar } from "./Components/MonthViewCalendar";
import { Header } from "./Components/Header";
import { WeekViewCalendar } from "./Components/WeekViewCalendar";
import { createPortal } from "react-dom";
import { Modal } from "./Components/Modal";
import { Form, FormData } from "./Components/Form";
import { calendarAPI } from "./Helpers/calendarAPI";
import type { Event } from "./Helpers/createCalendarAPI";

export function App({ initialEvents }: { initialEvents: Event[] }) {
  const [calendarState, dispatchCalendarActions] = useReducer(eventReducer, {
    today: new Date(),
    activeDay: new Date(),
    events: initialEvents,
    isLoading: false,
    isError: false,
  });

  const [showModal, setShowModal] = useState(false);

  const onSave = (formValues: FormData) => {
    calendarAPI
      .createEvent(formValues)
      .then((event) => {
        console.log({ event });
        dispatchCalendarActions({
          type: "SAVE_EVENT_SUCCESS",
          payload: event,
        });
        setShowModal(false);
      })
      .catch(() => {
        // return dispatchState({ type: "SAVE_EVENT_FAILURE" });
        return "calendarAPI.createEvent error";
      });
  };

  return (
    <>
      <Header
        onTodayClick={() => dispatchCalendarActions({ type: "TODAY" })}
        displayPreviousWeek={() =>
          dispatchCalendarActions({ type: "BACK_WEEK" })
        }
        displayNextWeek={() => dispatchCalendarActions({ type: "NEXT_WEEK" })}
        activeDay={calendarState.activeDay}
      />

      <main className="main-wrapper">
        <aside className="side-wrapper">
          <button
            className="open-event-modal button oval"
            onClick={() => {
              setShowModal(true);
            }}
          >
            <img src="./assets/svg/add.svg" alt="Google add icon." />
            Create
          </button>
          {showModal &&
            createPortal(
              <Modal onClose={() => setShowModal(false)}>
                <Form onSave={onSave} />
              </Modal>,
              document.body
            )}

          <MonthViewCalendar
            displayPreviousMonth={() =>
              dispatchCalendarActions({ type: "BACK_MONTH" })
            }
            displayNextMonth={() =>
              dispatchCalendarActions({ type: "NEXT_MONTH" })
            }
            setActiveDayClick={(date: Date) =>
              dispatchCalendarActions({
                type: "CLICKED_ACTIVE_DAY",
                payload: date,
              })
            }
            activeDay={calendarState.activeDay}
          />
        </aside>

        <WeekViewCalendar
          setActiveDayClick={(date: Date) =>
            dispatchCalendarActions({
              type: "CLICKED_ACTIVE_DAY",
              payload: date,
            })
          }
          activeDay={calendarState.activeDay}
          today={calendarState.today}
          events={calendarState.events}
        />
      </main>
    </>
  );
}

const Root = () => {
  const [events, setEvents] = useState<undefined | Event[]>(undefined);
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    calendarAPI
      .listEvents()
      .then((events) => {
        setEvents(events);
      })
      .catch(() => {
        throw new Error("Error fetching events");
      });
  }, []);

  return events ? <App initialEvents={events} /> : null;
  // return events ? <App initialEvents={events} /> : <Spinner />;
};

const container = document.getElementById("root");
if (!container) {
  throw new Error("no container to render to");
}

const root = createRoot(container);
root.render(<Root />);
