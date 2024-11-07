const DetailsModal = ({ appointment, onClose }: { appointment: any, onClose: () => void }) => {
  if (!appointment) return null;

  const { date, status } = appointment;
  const appointmentDate = new Date(date[0]);
  const formattedDate = appointmentDate.toLocaleDateString();
  const formattedTime = appointmentDate.toLocaleTimeString();
  const duration = `${date.length} ساعة`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-w-lg">
        {/* Modal Header */}
        <div className="flex justify-between items-center border-b pb-3">
          <h2 className="text-2xl font-bold text-primary">تفاصيل الجلسة</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            aria-label="Close modal"
          >
            &times;
          </button>
        </div>

        {/* Appointment Details */}
        <div className="mt-4 space-y-3">
          <p><strong>اليوم:</strong> {formattedDate}</p>
          <p><strong>الساعة:</strong> {formattedTime}</p>
          <p><strong>المدة:</strong> {duration}</p>
          <p><strong>الحالة:</strong> {status === "Accepted" ? "تم الحجز" : "تم الطلب"}</p>
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end mt-6 space-x-4">
          <button 
            onClick={onClose} 
            className="px-4 py-2 rounded-md text-white bg-gray-600 hover:bg-gray-700"
          >
            إغلاق
          </button>
          
          <button 
            onClick={() => {
              if (confirm("هل تريد إلغاء الجلسة؟")) {
                onClose();  // Close modal after confirmation
              }
            }} 
            className="px-4 py-2 rounded-md text-white bg-red-600 hover:bg-red-700"
          >
            إلغاء الجلسة
          </button>
          
        </div>
      </div>
    </div>
  );
};

export default DetailsModal;
