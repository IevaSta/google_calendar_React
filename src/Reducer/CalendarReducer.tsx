import React, { createContext, useContext, useReducer, ReactNode } from "react";

type Action =
  | { type: "SET_STATE"; payload: State }
  | { type: "TODAY" }
  | { type: "NEXT_WEEK" }
  | { type: "BACK_WEEK" }
  | { type: "NEXT_MONTH" }
  | { type: "BACK_MONTH" }
  | { type: "CLICKED_ACTIVE_DAY"; payload: Date }
  | { type: "IS_OPEN_MODAL"; payload: boolean };

interface State {
  today: Date;
  activeDay: Date;
  events: Event[];
  isLoading: boolean;
  isError: boolean;
  isModalOpen: boolean;
}

const initialState: State = {
  today: new Date(),
  activeDay: new Date(),
  events: [],
  isLoading: false,
  isError: false,
  isModalOpen: false,
};

const reducer = (state: State, action: Action): State => {
  const newActiveDay = new Date(state.activeDay);

  switch (action.type) {
    case "SET_STATE":
      return action.payload;
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
    case "IS_OPEN_MODAL":
      return { ...state, isModalOpen: action.payload };
    default:
      return state;
  }
};

const CalendarContext = createContext<
  { state: State; dispatchState: React.Dispatch<Action> } | undefined
>(undefined);

export const CalendarProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [state, dispatchState] = useReducer(reducer, initialState);

  return (
    <CalendarContext.Provider value={{ state, dispatchState }}>
      {children}
    </CalendarContext.Provider>
  );
};

export const useCalendarState = () => {
  const context = useContext(CalendarContext);
  if (!context) {
    throw new Error("Error");
  }
  return context;
};
