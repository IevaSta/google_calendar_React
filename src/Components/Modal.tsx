import { createPortal } from "react-dom";
// import propTypes from "prop-types";

export const Modal: React.FC<{
  onClose: () => void;
  children: React.ReactNode;
}> = ({ onClose, children }) => {
  return (
    <Portal>
      <section className="event-modal">
        <header className="event-modal__header">
          <button
            onClick={onClose}
            className="close-event-modal modalClose_eventBtn"
          >
            <img
              className="close-event-icon"
              src="../assets/svg/close.svg"
              alt="Close icon."
            />
          </button>
        </header>
        {children}
      </section>
    </Portal>
  );
};

// Modal.propTypes = {
//   // @ts-expect-error err
//   age: propTypes.number.isRequired,
// };

export const Portal: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return createPortal(children, document.body);
};
