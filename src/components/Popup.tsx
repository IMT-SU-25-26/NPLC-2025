import { PopupProps } from "@/types/popUp.md";

export default function Popup({ open, title, message, onClose, success, loading }: PopupProps) {
  if (!open && !loading) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 bg-opacity-40">
      <div className="bg-white rounded-lg shadow-lg p-6 min-w-[300px] max-w-[90vw] sm:max-w-[25vw] flex flex-col items-center">
        {loading ? (
          <>
            <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
            <p className="text-gray-700 mb-2">Processing...</p>
          </>
        ) : (
          <>
            <h2 className={`text-lg font-bold mb-2 ${success ? "text-green-600" : "text-red-600"}`}>{title}</h2>
            <p className="mb-4 text-gray-700 text-center w-[80%]">{message}</p>
            <button
              className={`px-4 py-2 rounded ${success ? "bg-green-500" : "bg-red-500"} text-white`}
              onClick={onClose}
            >
              Close
            </button>
          </>
        )}
      </div>
    </div>
  );
}