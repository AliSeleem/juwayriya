import InputField from "@/components/InputField";
import { checkAuth, resetPassword } from "@/services/auth";
import Toastify from "@/services/Toastify";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface IresetPassword {
  password: string;
  confirmPassword: string;
}

const ResetPassword = () => {
  // useForm -> for handling and validationg the form
  const { register, handleSubmit, formState: { errors } } = useForm<IresetPassword>();
  // useNavigate -> for navigation
  const navigate = useNavigate();

  // useMutation -> for handling post/patch/delete requests
  const mutation = useMutation({
    mutationFn: resetPassword,
    onError: (e: Error) => console.error(e.message),
    onSuccess: (data) => {
      if (data.error) {
        console.log(data)
        Toastify(data.message);
      }
      else if (data.errors){
        data.errors.map((e: any) => Toastify(e.msg))
      } else {
        checkAuth(localStorage.getItem("token")!, navigate)
      };
    },
  });

  // onSubmit -> submit handler
  const onSubmit: SubmitHandler<IresetPassword> = (data) => {
    mutation.mutate(data);
  };

  // rendered JSX
  return (
    <>
      {/* Header */}
      <h1 className="text-fourth text-2xl font-bold mb-5 lg:text-center">استعادة الحساب</h1>
      {/* Login form */}
      <form onSubmit={handleSubmit(onSubmit)}>

        <InputField<IresetPassword>
          id="password"
          name="password"
          label="كلمة المرور"
          type="password"
          registerOptions={{
            required: "الرجاء ادخال كلمة المرور",
            minLength: {
              value: 8,
              message: "الرجاء ادخال كلمة مرور 8 حروف او ارقام ع الاقل",
            },
          }}
          register={register}
          errorMessage={errors.password?.message}
        />

        <InputField<IresetPassword>
          id="confirmPassword"
          name="confirmPassword"
          label="تأكيد كلمة المرور"
          type="password"
          registerOptions={{
            required: "الرجاء ادخال كلمة المرور مرة اخرة",
            minLength: {
              value: 8,
              message: "الرجاء ادخال كلمة مرور 8 حروف او ارقام ع الاقل",
            },

          }}
          register={register}
          errorMessage={errors.confirmPassword?.message}
        />

        <button
          disabled={mutation.isPending}
          className="bg-primary text-white disabled:bg-secondary rounded-lg py-2 px-4 hover:bg-secondary block my-5 mx-auto transition duration-300"
          type="submit"
        >
          {mutation.isPending ? "الرجاء الانتظار.." : "إدخال"}
        </button>
        
        {mutation.isError && (
          <p className="text-red-500 text-center">
            {mutation.error instanceof Error ? mutation.error.message : "An error occurred"}
          </p>
        )}
      </form>
    </>
  );
}

export default ResetPassword