import { useCalendarState } from "../Reducer/CalendarReducer";
import ModalForm from "./ModalForm";

function Modal() {
  const { state, dispatchState } = useCalendarState();

  const handleCloseModal = () => {
    dispatchState({ type: "IS_OPEN_MODAL", payload: false });
  };

  return (
    <section className={`event-modal ${state.isModalOpen ? "" : "hidden"}`}>
      <header className="event-modal__header">
        <button
          onClick={handleCloseModal}
          className="close-event-modal event-btn"
        >
          <img
            className="close-event-icon"
            src="../assets/svg/close.svg"
            alt="Close icon."
          />
        </button>
      </header>

      <ModalForm />
    </section>
  );
}

export default Modal;
