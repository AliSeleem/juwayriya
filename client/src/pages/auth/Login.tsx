import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { checkAuth, Login as Slogin } from '@/services/auth';
import InputField from "@/components/InputField";
import { Link, useNavigate } from "react-router-dom";
import {Toastify} from "@/services/Toastify";

// Login form interface
export interface Ilogin {
  email: string;
  password: string;
}

// Login component
const Login = () => {
  // useForm -> for handling and validationg the form
  const { register, handleSubmit, formState: { errors } } = useForm<Ilogin>();
  // useNavigate -> for navigation
  const navigate = useNavigate();

  // useMutation -> for handling post/patch/delete requests
  const mutation = useMutation({
    mutationFn: Slogin,
    onError: (e: Error) => console.error(e.message),
    onSuccess: (data) => {
      if (data.error) Toastify(data.message);
      else if (data.errors){
        data.errors.map((e: any) => Toastify(e.msg))
      } else {
        localStorage.setItem('token', data.token);
        checkAuth(data.token, navigate)
      };
    },
  });

  // onSubmit -> submit handler
  const onSubmit: SubmitHandler<Ilogin> = (data) => {
    mutation.mutate(data);
  };

  // rendered JSX
  return (
    <>
      {/* Header */}
      <h1 className="text-fourth text-2xl font-bold mb-5 lg:text-center">تسجيل الدخول</h1>
      {/* Login form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField<Ilogin>
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
        <InputField<Ilogin>
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
        
        <Link to={"/auth/forgetpassword"} className="text-primary hover:text-fourth transition duration-500 text-end block">نسيت كلمة المرور؟</Link>

        <button
          disabled={mutation.isPending}
          className="bg-primary text-white disabled:bg-secondary rounded-lg py-2 px-4 hover:bg-secondary block my-5 mx-auto transition duration-300"
          type="submit"
        >
          {mutation.isPending ? "الرجاء الانتظار.." : "تسجيل الدخول"}
        </button>
        
        <p className="text-fourth text-center">ليس لديك حساب؟  <Link to={"/auth/signup"} className="text-primary hover:text-fourth transition duration-500">أنشئ حساب</Link></p>
        
        {mutation.isError && (
          <p className="text-red-500 text-center">
            {mutation.error instanceof Error ? mutation.error.message : "An error occurred"}
          </p>
        )}
      </form>
    </>
  );
};

export default Login;
