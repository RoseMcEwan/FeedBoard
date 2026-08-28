import { useEffect, useRef, useState } from "react";

const paddockPositions = [
  "1st paddock",
  "2nd paddock",
  "3rd paddock",
  "4th paddock",
  "5th paddock"
];

export default function PaddockModal({
  isOpen,
  herd,
  paddocks,
  currentOrder = [],
  onClose,
  onSave
}) {
  const [selectedOrder, setSelectedOrder] = useState([
    "",
    "",
    "",
    "",
    ""
  ]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }
      setSelectedOrder([
        currentOrder[0] ?? "",
        currentOrder[1] ?? "",
        currentOrder[2] ?? "",
        currentOrder[3] ?? "",
        currentOrder[4] ?? ""
      ]);
  }, [isOpen, currentOrder]);

  const modalRef = useRef(null);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    setSelectedOrder([
      currentOrder[0] ?? "",
      currentOrder[1] ?? "",
      currentOrder[2] ?? "",
      currentOrder[3] ?? "",
      currentOrder[4] ?? ""
    ]);
  }, [isOpen, currentOrder]);

  useEffect(() => {
    if (!isOpen) {
      return;
    }

    const previousFocus = document.activeElement;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusableElements =
        modalRef.current?.querySelectorAll(
          "button, select, input, [href], [tabindex]:not([tabindex='-1'])"
        );

      if (!focusableElements?.length) {
        return;
      }

      const firstElement = focusableElements[0];
      const lastElement =
        focusableElements[focusableElements.length - 1];

      if (
        event.shiftKey &&
        document.activeElement === firstElement
      ) {
        event.preventDefault();
        lastElement.focus();
      }

      if (
        !event.shiftKey &&
        document.activeElement === lastElement
      ) {
        event.preventDefault();
        firstElement.focus();
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener(
        "keydown",
        handleKeyDown
      );

      previousFocus?.focus();
    };
  }, [isOpen, onClose]);

  if (!isOpen || !herd) {
    return null;
  }

  const eligible = paddocks.filter(
    (paddock) =>
      paddock.herdId === herd.id &&
      ["Pasture", "Young Grass"].includes(paddock.category)
  );

  function changePaddock(position, paddockId) {
    setSelectedOrder((current) =>
      current.map((id, index) =>
        index === position ? paddockId : id
      )
    );
  }

  function saveOrder() {
    onSave(selectedOrder.filter(Boolean));
  }

  return (
    <div className="modal-backdrop" onMouseDown={onClose}>
      <section
      ref={modalRef}
        className="modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="paddock-modal-title"
        onMouseDown={(event) => 
          event.stopPropagation()
        }
      >
        <div className="modal-header">
          <div>
            <p className="eyebrow">
              Next paddocks
            </p>

            <h2 id="paddock-modal-title">
              Choose paddock order for {herd.name}
            </h2>
          </div>

          <button
            type="button"
            className="button button--icon"
            aria-label="Close paddock selector"
            onClick={onClose}
            autoFocus
          >
            ×
          </button>
        </div>

        <div className="paddock-order-list">
          {selectedOrder.map((selectedPaddockId, index) => (
            <label
              key={paddockPositions[index]}
              className="form-field"
            >
              {paddockPositions[index]}

              <select
                className="form-control"
                value={selectedPaddockId}
                onChange={(event) =>
                  changePaddock(
                    index,
                    event.target.value
                  )
                }
              >
                <option value="">
                  Select paddock
                </option>

                {eligible.map((paddock) => (
                  <option
                    key={paddock.id}
                    value={paddock.id}
                    disabled={
                      selectedOrder.includes(paddock.id) &&
                      selectedPaddockId !== paddock.id
                    }
                  >
                    Paddock {paddock.name} —{" "}
                    {paddock.hectares} ha
                  </option>
                ))}
              </select>
            </label>
          ))}
        </div>

        <div className="modal-actions">
          <button
            type="button"
            className="button"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="button"
            className="button button-primary"
            onClick={saveOrder}
          >
            Save
          </button>
        </div>
      </section>
    </div>
  );
}