import Loader from "@/components/Loader";
import { getUserAppointments } from "@/services/Appointments";
import { Toastify } from "@/services/Toastify";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const PatientAppointments = () => {
  const { data: appointments = [], error, isSuccess, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: getUserAppointments,
    select: data => data.filter(appointment => appointment.status === "Done"),
  });

  // Display error message
  useEffect(() => {
    if (error) {
      Toastify(error.message);
    }
  }, [error]);

  return (
    <div>
      <h1 className="text-primary text-2xl border-primary border-b-2 mb-10 pb-2">سجل الحجوزات</h1>
      
      {isLoading ? (
        <Loader />
      ) : (
        isSuccess && appointments.length > 0 ? (
          <table className="w-full text-right border-collapse">
            <thead>
              <tr className="border-b-2 border-fourth text-primary text-center">
                <th className="p-2">التاريخ</th>
                <th className="p-2">الساعة</th>
                <th className="p-2">التقييم</th>
                <th className="p-2">تعليقك</th>
              </tr>
            </thead>
            <tbody>
              {appointments.map((app, index) => {
                const appointmentDate = new Date(app.date[0]);
                return (
                  <tr
                    key={index}
                    className="border-b border-fourth text-center text-fourth"
                  >
                    <td className="p-2">{appointmentDate.toLocaleDateString()}</td>
                    <td className="p-2">{appointmentDate.toLocaleTimeString()}</td>
                    <td className="p-2">{app.feedback || "لا يوجد"}</td>
                    <td className="p-2">{app.notes || "لا يوجد"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <p className="text-fourth">لم تنهي اي حجوزات بعد!</p>
        )
      )}
    </div>
  );
};

export default PatientAppointments;
