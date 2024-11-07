import Loader from "@/components/Loader";
import UpdateMe from "@/components/UpdateMe";
import UpdatePassword from "@/components/UpdatePassword";
import { Toastify } from "@/services/Toastify";
import { deleteMe, getMe } from "@/services/User";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { Navigate } from "react-router-dom";

const PatientSettings = () => {
  // Update data state
  const [update, setUpdate] = useState(null)
  // Update password state
  const [updatePass, setUpdatePass] = useState(false)
  // Fetch user data
  const { data: user, isLoading } = useQuery({
    queryFn: getMe,
    queryKey: ["user"],
    select: (data) => {
      if (data.error) Toastify(data.message);
      else if (data.errors) {
        data.errors.forEach((e: any) => Toastify(e.msg));
      } else {
        return data.data;
      }
    }
  });

  // Delete account handler
  const {mutate} = useMutation({
    mutationFn: deleteMe,
    onError: (e) => {
      Toastify(e.message);
    },
    onSuccess: (data) => {
      if (data.error) Toastify(data.message);
      else if (data.errors) {
        data.errors.forEach((e: any) => Toastify(e.msg));
      } else {
        Toastify("تم حذف الحساب")
        Navigate({
          to: "/"
        })
      }

    }
  })

  // Loading state
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader />
      </div>
    );
  }

  // Redirect if no user data
  if (!user) {
    return <Navigate to="/auth/login" />;
  }

  const handleDeleteAccount = async () => {
    if (confirm("هل تريد حذف الحساب؟")) {
      mutate()
    }
  }

  // Main JSX
  return (
    <div className="mx-auto max-w-3xl p-8">
      {/* User Information Header */}
      <h1 className="text-2xl font-bold text-primary mb-6 border-b-2 border-primary pb-2">
        بياناتي
      </h1>
      
      {/* User Details */}
      <div className="space-y-6 mb-8">
        {[
          { label: "الإسم", value: user.name },
          { label: "رقم الهاتف", value: user.phone },
          { label: "البريد الإليكتروني", value: user.email },
          { label: "الجنس", value: user.gender === "male"? "ذكر" : "أنثى" },
          { label: "تاريخ الميلاد", value: new Date(user.dateOfBirth).toLocaleDateString() }
        ].map((item, index) => (
          <div key={index} className="flex justify-between border-b border-gray-300 py-2">
            <span className="font-semibold text-fourth">{item.label}</span>
            <span className="text-fourth">{item.value}</span>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex justify-between gap-5">
        <button onClick={() => setUpdate(user)} className="bg-socendery text-fourth hover:text-primary hover:bg-fourth transition-all duration-500 px-4 py-2 rounded-md">
          تعديل البيانات
        </button>
        <button onClick={() => setUpdatePass(true)} className="bg-socendery text-fourth hover:text-primary hover:bg-fourth transition-all duration-500 px-4 py-2 rounded-md">
          تغيير كلمة السر
        </button>
        <button onClick={handleDeleteAccount} className="bg-primary text-fourth hover:text-primary hover:bg-fourth transition-all duration-500 px-4 py-2 rounded-md">
          حذف الحساب
        </button>
      </div>
      <UpdateMe close={() => setUpdate(null)} user={update}/>
      <UpdatePassword open={updatePass} close={() => setUpdatePass(false)} />
    </div>
  );
};

export default PatientSettings;