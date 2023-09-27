export const Modal: React.FC<{
  onClose: () => void;
  children: React.ReactNode;
}> = ({ onClose, children }) => {
  return (
    <section className="event-modal">
      <header className="event-modal__header">
        <button onClick={onClose} className="close-event-modal event-btn">
          <img
            className="close-event-icon"
            src="../assets/svg/close.svg"
            alt="Close icon."
          />
        </button>
      </header>
      {children}
    </section>
  );
};
