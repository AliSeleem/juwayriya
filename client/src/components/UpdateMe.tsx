import { useForm } from "react-hook-form"
import InputField from "./InputField"
import SelectField from "./SelectField"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updateMe } from "@/services/User"
import { Toastify } from "@/services/Toastify"

export interface IupdateMe {
  name: string,
  email: string,
  phone: string,
  gender: string,
  dateOfBirth: Date,
}

const UpdateMe = ({user, close}: {user: IupdateMe | null, close: () => void }) => {
  // Form hook
  const { register, handleSubmit, formState: { errors } } = useForm<IupdateMe>()

  // Query client
  const client = useQueryClient()
  // Mutation hook
  const mutation = useMutation({
    mutationFn: updateMe,
    onSuccess: (data) => {
      if (data.error) Toastify(data.message);
      else if (data.errors){
        data.errors.map((e: any) => Toastify(e.msg))
      } else {
        client.invalidateQueries({
          queryKey: ["user"]
        })
        Toastify("User updated successfully")
        close()
    }},
    onError: (error) => {
      console.error("Error updating user:", error)
    },
  })

  if(!user){
    return null
  }

  const update = (data: IupdateMe) => {
    mutation.mutate(data)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-third p-6 rounded-lg shadow-lg w-3/4 max-w-lg relative">
        <button onClick={close} className="absolute top-5 right-5 text-fourth hover:text-primary font-black">✕</button>
        <h1 className="text-2xl text-fourth font-bold mb-3">تعديل البيانات</h1>
        <form onSubmit={handleSubmit(update)}>
        <InputField
          id="name"
          name="name"
          label="الإسم"
          registerOptions={{
            required: "الرجاء ادخال الإسم"
          }}
          register={register}
          errorMessage={errors.name?.message}
          value={user.name}
        />
        <InputField
          id="phone"
          name="phone"
          label="رقم الهاتف"
          registerOptions={{
            required: "الرجاء ادخال رقم الهاتف",
            pattern: {
              value: /^(010|011|012|015)\d{8}$/,
              message: "الرجاء ادخال رقم هاتف صحيح",
            },
          }}
          register={register}
          errorMessage={errors.phone?.message}
          value={user.phone}
        />
        <InputField
          id="email"
          name="email"
          label="البريد الإليكتروني"
          registerOptions={{
            required: "الرجاء ادخال البريد الالكتروني",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "الرجاء ادخال بريد الكتروني صحيح",
            },
          }}
          register={register}
          errorMessage={errors.email?.message}
          value={user.email}
        />
        <SelectField
          id="gender"
          name="gender"
          label="الجنس"
          registerOptions={{
            required: "الرجاء اختيار الجنس"
          }}
          options={[
            { value: "male", label: "ذكر" },
            { value: "female", label: "انثى" },
          ]}
          register={register}
          errorMessage={errors.gender?.message}
          value={user.gender}
        />
        <InputField
          id="dateOfBirth"
          name="dateOfBirth"
          label="تاربخ الميلاد"
          type="date"
          registerOptions={{
            required: "الرجاء ادخال تاريخ الميلاد",
            max: { value: new Date().toISOString(), message: "الرجاء ادخال تاريخ ميلاد صحيح" }
          }}
          register={register}
          errorMessage={errors.dateOfBirth?.message}
          value={new Date(user.dateOfBirth).toISOString().split("T")[0]}
        />

        <button
          disabled={mutation.isPending}
          className="bg-primary text-white disabled:bg-secondary rounded-lg py-2 px-4 hover:bg-secondary block mt-3 mx-auto transition duration-300"
          type="submit"
        >
          {mutation.isPending ? "الرجاء الانتظار.." : "تعديل البيانات"}
        </button>
        {mutation.isError && (
          <p className="text-red-500 text-center">
            {mutation.error instanceof Error ? mutation.error.message : "An error occurred"}
          </p>
        )}
        </form>
      </div>
    </div>
  )
}

export default UpdateMe