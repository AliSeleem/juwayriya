import DetailsModal from "@/components/DetailsModal";
import Loader from "@/components/Loader";
import MakeAppointment from "@/components/MakeAppointment";
import { cancelAppointment, getUserAppointments } from "@/services/Appointments";
import { isDoctorAvailable } from "@/services/Clinic";
import { Toastify } from "@/services/Toastify";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useCallback, useMemo } from "react";

const PatientHome = () => {
  const [make, setMake] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const client = useQueryClient()

  // Fetch user's not-done appointments
  const { data: appointments = [], error, isSuccess, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: getUserAppointments,
    select: data => data.filter(appointment => appointment.status !== "Done"),
  });

  // Fetch doctor's availability
  const { data: doctorAvailable } = useQuery({
    queryKey: ["doctor"],
    queryFn: isDoctorAvailable,
  });

  if (error) {
    Toastify(error.message);
  }

  const handleCancel = useCallback(async (id: any) => {
    if (confirm("هل تريد الغاء الجلسة؟")) {
      Toastify("جاري الإلغاء...");
      await cancelAppointment(id);
      client.invalidateQueries({
        queryKey: ["appointments"],
      })
    }
  }, []);

  const upcomingAppointments = useMemo(() => appointments.map(app => ({
    ...app,
    dateDisplay: new Date(app.date[0]).toLocaleString().split(",")[0],
    timeDisplay: new Date(app.date[0]).toLocaleString().split(",")[1],
  })), [appointments]);

  return (
    <div className="w-full max-w-3xl px-5">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-3xl text-primary font-bold">أهلاً بك في مركز جويرية</h2>
        <p className="text-fourth text-lg mt-1">رعاية صحتك النفسية هي هدفنا</p>
      </div>

      {/* Doctor Availability */}
      <div className="text-center mb-6">
        <p className={`text-lg font-medium ${doctorAvailable ? "text-primary" : "text-socendery"}`}>
          {doctorAvailable ? "الدكتورة موجوده الآن في المركز" : "الدكتورة غير موجوده الآن في المركز"}
        </p>
      </div>

      {/* Appointment Section Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xl font-semibold border-b-2 border-primary pb-1">الجلسات القادمه</h3>
        <button 
          onClick={() => setMake(true)} 
          className="bg-fourth text-primary px-4 py-2 rounded-lg shadow-sm hover:bg-primary hover:text-fourth transition"
        >
          حجز جلسه
        </button>
      </div>

      {/* Appointments Table */}
      {isLoading ? (
        <div className="flex justify-center">
          <Loader />
        </div>
      ) : isSuccess && (
        <div className="overflow-x-auto">
          <table className="w-full text-center border-collapse">
            <thead>
              <tr className="border-b-2 border-fourth">
                <th className="p-2 text-lg">اليوم</th>
                <th className="p-2 text-lg hidden lg:table-cell">الساعة</th>
                <th className="p-2 text-lg hidden lg:table-cell">المده</th>
                <th className="p-2 text-lg hidden lg:table-cell">الحالة</th>
                <th className="p-2 text-lg hidden lg:table-cell">إلغاء</th>
                <th className="p-2 text-lg lg:hidden">تفاصيل</th>
              </tr>
            </thead>
            <tbody>
              {upcomingAppointments.length ? (
                upcomingAppointments.map((app) => (
                  <tr key={app._id} className="border-b border-gray-200">
                    <td className="p-2">{app.dateDisplay}</td>
                    <td className="p-2 hidden lg:table-cell">{app.timeDisplay}</td>
                    <td className="p-2 hidden lg:table-cell">{app.date.length}</td>
                    <td className="p-2 hidden lg:table-cell">{app.status === "Accepted" ? "تم الحجز" : "تم الطلب"}</td>
                    <td className="p-2 hidden lg:table-cell">
                      <button 
                        className="bg-primary text-white py-1 px-3 rounded-md shadow-sm hover:bg-red-500 transition" 
                        onClick={() => handleCancel(app._id)}
                      >
                        إلغاء
                      </button>
                    </td>
                    <td className="p-2 lg:hidden">
                      <button 
                        className="bg-primary text-white py-1 px-3 rounded-md shadow-sm hover:bg-blue-500 transition" 
                        onClick={() => setSelectedAppointment(app)}
                      >
                        تفاصيل
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="p-4 text-fourth">لا يوجد جلسات قادمة</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Make Appointment Modal */}
      <MakeAppointment open={make} close={() => setMake(false)} />

      {/* Details Modal */}
      {selectedAppointment && (
        <DetailsModal 
          appointment={selectedAppointment} 
          onClose={() => setSelectedAppointment(null)} 
        />
      )}
    </div>
  );
};

export default PatientHome;
