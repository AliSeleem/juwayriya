import { useForm } from "react-hook-form"
import InputField from "./InputField"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { updatePassword } from "@/services/User"
import { Toastify } from "@/services/Toastify"

export interface IupdatePassword {
	oldPassword: string;
	newPassword: string;
	confirmPassword: string;
}

const UpdatePassword = ({ open, close}: {open: boolean, close: () => void }) => {
  // Form hook
  const { register, handleSubmit, formState: { errors } } = useForm<IupdatePassword>()

  // Query client
  const client = useQueryClient()
  // Mutation hook
  const mutation = useMutation({
    mutationFn: updatePassword,
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

  if(!open){
    return null
  }

  const update = (data: IupdatePassword) => {
    mutation.mutate(data)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-third p-6 rounded-lg shadow-lg w-3/4 max-w-lg relative">
        <button onClick={close} className="absolute top-5 right-5 text-fourth hover:text-primary font-black">✕</button>
        <h1 className="text-2xl text-fourth font-bold mb-3">تعديل البيانات</h1>
        <form onSubmit={handleSubmit(update)}>
        <InputField
          id="oldPassword"
          name="oldPassword"
          type="password"
          label="كلمة المرور القديمة"
          registerOptions={{
            required: "الرجاء ادخال كلمة المرور القديمة",
            minLength: {
              value: 8,
              message: "كلمة المرور يجب ان تكون 8 حروف او ارقام على الاقل",
            },
          }}
          register={register}
          errorMessage={errors.oldPassword?.message}
        />
        <InputField
          id="newPassword"
          name="newPassword"
          type="password"
          label="كلمة المرور الجديدة"
          registerOptions={{
            required: "الرجاء ادخال رقم كلمة المرور الجديدة",
            minLength: {
              value: 8,
              message: "كلمة المرور يجب ان تكون 8 حروف او ارقام على الاقل",
            },
          }}
          register={register}
          errorMessage={errors.newPassword?.message}
        />
        <InputField
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          label="تأكيد كلمة المرور الجديدة"
          registerOptions={{
            required: "الرجاء تأكيد كلمة المرور الجديدة",
            minLength: {
              value: 8,
              message: "كلمة المرور يجب ان تكون 8 حروف او ارقام على الاقل",
            },
          }}
          register={register}
          errorMessage={errors.confirmPassword?.message}
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

export default UpdatePassword