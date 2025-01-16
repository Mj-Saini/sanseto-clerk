

const ConfirmationPopup = ({ actionType, onConfirm, onCancel }) => {
  return (
    <div className="popup-overlay bg-white p-5 rounded-lg relative z-30">
      <div className="popup-content">
        <h2>{actionType === 'update' ? 'Update' : 'Delete'} Confirmation</h2>
        <p>
          Are you sure you want to {actionType === 'update' ? 'update' : 'delete'} this item?
        </p>
        <div className="popup-buttons flex gap-3 justify-center">
          <button onClick={onCancel} className="border border-[#ccc] bg-[#ccc] capitalize text-black px-3 py-2 rounded-lg ">cancel</button>
          <button onClick={onConfirm} className="text-white px-3 py-2 rounded-lg bg-[#4caf50] ">{actionType === 'update' ? 'update' : 'delete'}</button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
