import { FieldValues, Path, UseFormRegister } from "react-hook-form";

function SelectField<T extends FieldValues>({
  id,
  label,
  name,
  options,
  registerOptions,
  register,
  errorMessage,
}: {
  id: string;
  name: Path<T>;
  label: string;
  options: { value: string; label: string }[];
  registerOptions: object;
  register: UseFormRegister<T>;
  errorMessage?: string;
}) {
  return (
    <>
      <label className="text-fourth block mb-2 text-lg" htmlFor={id}>
        {label}
      </label>
      <select
        className="rounded-lg focus:border-primary border-2 outline-none min-w-[300px] px-3 py-1 mb-3"
        {...register(name, registerOptions)}
        id={id}
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
    </>
  );
}

export default SelectField;
