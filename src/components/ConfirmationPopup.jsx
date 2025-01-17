/* eslint-disable react/prop-types */

const ConfirmationPopup = ({ actionType, onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay bg-white p-5 rounded-lg relative z-30">
      <div className="popup-content">
        <h2 className="text-primary_clr text-center">{actionType === "update" ? "Update" : "Delete"} Confirmation</h2>
        <p className="text-primary_clr text-center">
          Are you sure you want to{" "}
          {actionType === "update" ? "update" : "delete"} ?
        </p>
        <div className="popup-buttons flex gap-3 justify-center">
          <button
            onClick={onCancel}
            className="border border-[#ccc] bg-[#ccc] capitalize text-black px-3 py-2 rounded-lg "
          >
            cancel
          </button>
          <button
            onClick={onConfirm}
            className={`text-white px-3 py-2 rounded-lg capitalize  ${actionType ==="update" ? "bg-[#4caf50]":"bg-[#f44337]"}`}
          >
            {actionType === "update" ? "update" : "delete"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
