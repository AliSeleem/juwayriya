import { FieldValues, Path, RegisterOptions, UseFormRegister } from "react-hook-form";

function InputField <T extends FieldValues>({
  id,
  label,
  name,
  type = "text",
  registerOptions,
  register,
  errorMessage,
}: {
  id: string;
  name: Path<T>;
  label: string;
  type?: string;
  registerOptions: RegisterOptions<T, Path<T>>;
  register: UseFormRegister<T>;
  errorMessage?: string;
}) {
  return (
    <>
      <label className="text-fourth block mb-2 text-lg" htmlFor={id}>
        {label}
      </label>
      <input
        className="rounded-lg focus:border-primary border-2 outline-none min-w-[300px] px-3 py-1 mb-3"
        type={type}
        {...register(name, registerOptions)}
        id={id}
      />
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </>
  );
}

export default InputField