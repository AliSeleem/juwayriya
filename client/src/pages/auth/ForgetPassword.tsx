import InputField from "@/components/InputField";
import { forgetpassword } from "@/services/auth";
import { Toastify  } from "@/services/Toastify";
import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";

export interface IforgetPassword {
  email: string;
}

const ForgetPassword = () => {
  // useForm -> for handling and validationg the form
  const { register, handleSubmit, formState: { errors } } = useForm<IforgetPassword>();
  // useNavigate -> for navigation
  const navigate = useNavigate();

  // useMutation -> for handling post/patch/delete requests
  const mutation = useMutation({
    mutationFn: forgetpassword,
    onError: (e: Error) => console.error(e.message),
    onSuccess: (data) => {
      if (data.error) Toastify(data.message);
      else if (data.errors){
        data.errors.map((e: any) => Toastify(e.msg))
      } else {
        localStorage.setItem('token', data.resetToken);
        navigate("/auth/verifycode")
      };
    },
  });

  // onSubmit -> submit handler
  const onSubmit: SubmitHandler<IforgetPassword> = (data) => {
    mutation.mutate(data);
  };

  // rendered JSX
  return (
    <>
      {/* Header */}
      <h1 className="text-fourth text-2xl font-bold mb-5 lg:text-center">استعادة الحساب</h1>
      {/* Login form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField<IforgetPassword>
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
        />
       
        <button
          disabled={mutation.isPending}
          className="bg-primary text-white disabled:bg-secondary rounded-lg py-2 px-4 hover:bg-secondary block my-5 mx-auto transition duration-300"
          type="submit"
        >
          {mutation.isPending ? "الرجاء الانتظار.." : "طلب كود تفعيل"}
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

export default ForgetPassword