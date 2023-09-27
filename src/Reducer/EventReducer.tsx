import { Event } from "../Helpers/createCalendarAPI";

type Action =
  | { type: "TODAY" }
  | { type: "NEXT_WEEK" }
  | { type: "BACK_WEEK" }
  | { type: "NEXT_MONTH" }
  | { type: "BACK_MONTH" }
  | { type: "CLICKED_ACTIVE_DAY"; payload: Date }
  | { type: "SAVE_EVENT_REQUEST" }
  | { type: "SAVE_EVENT_FAILURE" }
  | { type: "SAVE_EVENT_SUCCESS"; payload: Event }
  | { type: "DELETE_EVENT"; payload: number };

export interface State {
  today: Date;
  activeDay: Date;
  events: Event[];
  isLoading: boolean;
  isError: boolean;
}

export const eventReducer = (state: State, action: Action): State => {
  const newActiveDay = new Date(state.activeDay);

  switch (action.type) {
    case "TODAY":
      return { ...state, activeDay: state.today };
    case "NEXT_WEEK":
      newActiveDay.setDate(newActiveDay.getDate() + 7);
      return { ...state, activeDay: newActiveDay };
    case "BACK_WEEK":
      newActiveDay.setDate(newActiveDay.getDate() - 7);
      return { ...state, activeDay: newActiveDay };
    case "NEXT_MONTH":
      newActiveDay.setMonth(newActiveDay.getMonth() + 1);
      return { ...state, activeDay: newActiveDay };
    case "BACK_MONTH":
      newActiveDay.setMonth(newActiveDay.getMonth() - 1);
      return { ...state, activeDay: newActiveDay };
    case "CLICKED_ACTIVE_DAY":
      return { ...state, activeDay: new Date(action.payload) };
    case "SAVE_EVENT_SUCCESS":
      return {
        ...state,
        events: [...state.events, action.payload],
        isLoading: false,
      };
    case "DELETE_EVENT":
      return {
        ...state,
        events: state.events.filter((event) => {
          if (action.payload !== event.id) return event;
        }),
        isLoading: false,
      };
    default:
      return state;
  }
};
