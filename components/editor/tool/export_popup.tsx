const ExportPopup: React.FC = () => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-bold mb-4">Popup Title</h2>
            <p className="text-gray-600">Yeh ek simple popup hai!</p>
            <button
            //   onClick={onClose}
              className="mt-4 w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      );
    };

export default ExportPopup;