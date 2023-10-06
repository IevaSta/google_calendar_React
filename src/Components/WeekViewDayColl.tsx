import { OnClickFormData } from "../App";

import "./WeekViewDayColl.css";

export const Column: React.FC<{
  children: React.ReactNode;
  date: string;
  onTimeClick: (onClickFormData: OnClickFormData) => void;
}> = ({ children, date, onTimeClick }) => {
  return (
    <ul className="lg-calendar__cell-list">
      {children}

      {new Array(24).fill({}).map((_, i) => {
        const startHour = i < 10 ? `0${i}` : `${i}`;
        const formattedStartTime = `${startHour}:00`;

        const hourComponent = parseInt(startHour);
        const endHour = (hourComponent + 1) % 24;
        const formattedEndHour = endHour < 10 ? `0${endHour}` : `${endHour}`;
        const formattedEndTime = `${formattedEndHour}:00`;

        return (
          // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-noninteractive-element-interactions
          <li
            className="lg-calendar__cell-item"
            key={i}
            onClick={() =>
              onTimeClick({
                date: date,
                start: formattedStartTime,
                end: formattedEndTime,
              })
            }
          ></li>
        );
      })}
    </ul>
  );
};
