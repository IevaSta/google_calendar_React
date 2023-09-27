import { ChangeEvent, FormEvent, useState } from "react";
import { formatDateToYYYYMMDD } from "../Helpers/formatDateToYYYYMMDD";
import { formatTimeToHHMM } from "../Helpers/formatTimeToHHMM";
import { formTimeValidation } from "../Helpers/formTimeValidation";
import { formTitleRequired } from "../Helpers/formInputValidation";

export interface FormData {
  title: string;
  date: string;
  start: string;
  end: string;
}

interface FormErrors {
  title?: string;
  start?: string;
  end?: string;
}

export const Form: React.FC<{
  onSave: (formValues: FormData) => void;
}> = ({ onSave }) => {
  const [formData, setFormData] = useState<FormData>(() => {
    const eventEndDate = new Date(new Date());
    eventEndDate.setHours(new Date().getHours() + 1);

    return {
      title: "",
      date: formatDateToYYYYMMDD(new Date()),
      start: formatTimeToHHMM(new Date()),
      end: formatTimeToHHMM(eventEndDate),
    };
  });

  const [formErrors, setFormErrors] = useState<FormErrors>({});

  const checkTime = ({ date, start, end }: FormData) => {
    const timeErrorList = formTimeValidation(date, start, end);

    setFormErrors((formErrors) => ({ ...formErrors, ...timeErrorList }));

    return timeErrorList;
  };

  const checkTitle = (title: string) => {
    const titleError = formTitleRequired(title);

    setFormErrors((formErrors) => ({ ...formErrors, title: titleError }));
    return titleError;
  };

  const handleTitleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
    checkTitle(value);
  };

  const handleTimeChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));

    checkTime({ ...formData, [name]: value });
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const titleError = checkTitle(formData.title);
    const timeErrorList = checkTime(formData);

    if (!titleError && !timeErrorList.end && !timeErrorList.start) {
      const formValues = {
        ...formData,
        title: formData.title.trim(),
      };

      onSave(formValues);
    }
  };

  return (
    <form className="event__form" onSubmit={handleSubmit}>
      <input
        className={`event__form-header ${formErrors.title ? "error" : ""}`}
        type="text"
        placeholder="Add title"
        name="title"
        value={formData.title}
        onChange={handleTitleInputChange}
      />

      <nav className="event-nav">
        <ul className="event-nav-list">
          <li>
            <button
              type="button"
              className="tab-btn open-event-form event-btn event-nav-btn event-form__item"
              data-target="event"
            >
              Event
            </button>
          </li>
          <li>
            <button
              type="button"
              className="event-btn event-nav-btn event-form__item"
            >
              Focus time
            </button>
          </li>
          <li>
            <button
              type="button"
              className="tab-btn open-office-form event-btn event-nav-btn event-form__item"
              data-target="office"
            >
              Out of office
            </button>
          </li>
          <li>
            <button
              type="button"
              className="event-btn event-nav-btn event-form__item"
            >
              Work location
            </button>
          </li>
          <li>
            <button
              type="button"
              className="event-btn event-nav-btn event-form__item"
            >
              Task
            </button>
          </li>
          <li>
            <button
              type="button"
              className="event-btn event-nav-btn event-form__item"
            >
              Appointment schedule
            </button>
          </li>
        </ul>
      </nav>

      <section className="tab-content" data-tab="event">
        <span>
          <label className="event-time-set__wrapper">
            <input
              className="event--set-date event-form__item event-date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleTimeChange}
            />
            <input
              className={`event--set-date event-form__item event-time__start ${
                formErrors.start ? "error" : ""
              }`}
              type="time"
              name="start"
              value={formData.start}
              onChange={handleTimeChange}
            />
            <span> - </span>
            <input
              className={`event--set-date event-form__item event-time__end ${
                formErrors.end ? "error" : ""
              }`}
              type="time"
              name="end"
              value={formData.end}
              onChange={handleTimeChange}
            />
          </label>
        </span>

        <span className="event-checkbox">
          <label className="event-checkbox__label">
            <input
              className="event-checkbox__input event-form__item"
              type="checkbox"
            ></input>
            <span>All day</span>
          </label>
          <button
            type="button"
            className="event-btn event-nav-btn event-form__item"
          >
            Time zone
          </button>
        </span>

        <label>
          <select
            className="event-select event-form__item"
            name="selectBusyFree"
          >
            <option value="Busy">Busy</option>
            <option value="Free">Free</option>
          </select>
        </label>

        <label>
          <input
            className="event-checkbox__guest event-form__item"
            type="text"
            placeholder="Add guest"
          />
        </label>

        <label>
          <select className="remote-type event-form__item">
            <option value="">Add video conferencing</option>
            <option value="remote-google">Google meet</option>
            <option value="remote-zoom">Zoom Meeting</option>
          </select>
        </label>

        <label>
          <input
            className="event-checkbox__location event-form__item"
            type="text"
            placeholder="Add rooms or location"
          />
        </label>

        <div className="event-modal__description--wrapper event-form__item">
          <label className="event-modal__description-label">
            Add
            <input
              className="event-modal__input-description"
              type="text"
              placeholder="description"
            />
          </label>

          <span>or</span>

          <label className="event-modal__input-label">
            attachments
            <input className="event-modal__input-file" type="file" />
          </label>
        </div>

        <span className="event-creator__name">Ieva Staseviciute</span>
        <ul className="event-creator__settings">
          <li>Busy</li>
          <li>Default visibility</li>
          <li>Notify 10 minutes before</li>
        </ul>
      </section>

      {formErrors.title && (
        <span className="error-msg">{formErrors.title}</span>
      )}

      {formErrors.start && (
        <span className="error-msg">{formErrors.start}</span>
      )}

      {formErrors.end && <span className="error-msg">{formErrors.end}</span>}

      <div className="event__button--wrapper">
        <button type="button" className="event-btn event-more-btn">
          More options
        </button>
        <button
          className="event-btn event-save-btn"
          name="intent-save"
          value="save"
        >
          Save
        </button>
      </div>
    </form>
  );
};
