import "./modal.css";

function Modal({ isOpen, children }) {
  if (!isOpen) return null;
  return (
    <div className="modal-overlay">
      <div className="modal-card">{children}</div>
    </div>
  );
}

export default Modal;
