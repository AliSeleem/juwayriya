import { useMutation } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";
import { checkAuth, signup as SignupService } from '@/services/auth';
import InputField from "@/components/InputField";
import { Link, useNavigate } from "react-router-dom";
import { Toastify  } from "@/services/Toastify";
import SelectField from "@/components/SelectField";

// Signup form interface
export interface Isignup {
  name: string;
  phone: string;
  email: string;
  password: string;
  confirmPassword: string;
  gender: string;
  dateOfBirth: Date;
}

// Signup component
const Signup = () => {
  // useForm -> for handling and validationg the form
  const { register, handleSubmit, formState: { errors } } = useForm<Isignup>();
  // useNavigate -> for navigation
  const navigate = useNavigate();

  // useMutation -> for handling post/patch/delete requests
  const mutation = useMutation({
    mutationFn: SignupService,
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
  const onSubmit: SubmitHandler<Isignup> = (data) => {
    mutation.mutate(data);
  };

  // rendered JSX
  return (
    <>
      {/* Header */}
      <h1 className="text-fourth text-2xl font-bold mb-5 lg:text-center">إنشاء حساب</h1>
      {/* Signup form */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <InputField<Isignup>
          id="name"
          name="name"
          label="الإسم"
          registerOptions={{
            required: "الرجاء ادخال الإسم"
          }}
          register={register}
          errorMessage={errors.name?.message}
        />
        <InputField<Isignup>
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
        />
        <InputField<Isignup>
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
        <InputField<Isignup>
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
        <InputField<Isignup>
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
        <SelectField<Isignup>
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
        />
        <InputField<Isignup>
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
        />

        <button
          disabled={mutation.isPending}
          className="bg-primary text-white disabled:bg-secondary rounded-lg py-2 px-4 hover:bg-secondary block mt-3 mx-auto transition duration-300"
          type="submit"
        >
          {mutation.isPending ? "الرجاء الانتظار.." : "إنشاء حساب"}
        </button>
        <p className="text-fourth text-center">هل لديك حساب؟  <Link to={"/auth/login"} className="text-primary">سجل الدخول</Link></p>
        {mutation.isError && (
          <p className="text-red-500 text-center">
            {mutation.error instanceof Error ? mutation.error.message : "An error occurred"}
          </p>
        )}
      </form>
    </>
  );
};

export default Signup;
