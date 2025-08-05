function DeletePopup({ title, handleDeleteConfirmed, setShowConfirmModal }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-md text-center w-[90%] max-w-md">
        <h3 className="text-2xl font-medium mb-4">{title}</h3>
        <div className="flex justify-end gap-4 pt-2">
          <button
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-1.5 min-w-20 rounded"
            onClick={handleDeleteConfirmed}
          >
            Yes
          </button>
          <button
            className="bg-red-600 hover:bg-red-700 text-white px-4 py-1.5 min-w-20 rounded"
            onClick={() => setShowConfirmModal(false)}
          >
            No
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeletePopup;
