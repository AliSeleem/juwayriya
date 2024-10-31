import Button from "@/components/Button";
import { SubmitHandler, useForm } from "react-hook-form";
import { memo } from "react";

type Inputs = {
  email: string;
  password: string;
};

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <>
      <h2 className="text-fourth text-3xl font-bold mb-8">تسجيل الدخول</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col space-y-4">
        <label htmlFor="email" className="text-fourth text-2xl">
          الايميل
        </label>
        <input
          id="email"
          type="email"
          className="rounded-full text-lg py-2 px-4 outline-none w-96 text-primary"
          {...register("email", { required: "الايميل مطلوب" })}
        />
        {errors.email && <span className="text-red-600">{errors.email.message}</span>}

        <label htmlFor="password" className="text-fourth text-2xl">
          كلمة المرور
        </label>
        <input
          id="password"
          type="password"
          className="rounded-full text-lg py-2 px-4 outline-none w-96 text-primary"
          {...register("password", { required: "كلمة المرور مطلوبة" })}
        />
        {errors.password && <span className="text-red-600">{errors.password.message}</span>}

        <Button className="mt-6">تسجيل الدخول</Button>
      </form>
    </>
  );
};

export default memo(Login);
