import { useCalendarState } from "../Reducer/CalendarReducer";

function ModalForm() {
  const { dispatchState } = useCalendarState();

  const handleCloseModal = () => {
    dispatchState({ type: "IS_OPEN_MODAL", payload: false });
  };

  return (
    <form
      className="event__form"
      onSubmit={(e) => {
        e.preventDefault();
        handleCloseModal();
      }}
    >
      <input
        className="event__form-header"
        type="text"
        placeholder="Add title"
        name="title"
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
            />
            <input
              className="event--set-date event-form__item event-time__start"
              type="time"
              name="start"
            />
            <span> - </span>
            <input
              className="event--set-date event-form__item event-time__end"
              type="time"
              name="end"
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

      {/* <section className="tab-content" data-tab="office">
        <span>
          <label>
            <input type="checkbox">Automatically decline meetings</input>
          </label>

          <label>
            <input type="radio">Only new meeting invitations</input>
            <input type="radio">New and existing meetings</input>
          </label>

          <label>
            Description
            <textarea className="office-desc" placeholder="..."></textarea>
          </label>
        </span>
      </section>*/}

      {/* <div className="error-msg"></div> */}

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
}

export default ModalForm;
