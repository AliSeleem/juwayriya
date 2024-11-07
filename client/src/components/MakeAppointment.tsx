import { useForm } from "react-hook-form"
import InputField from "./InputField"
import SelectField from "./SelectField"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { MakeAppointment as MakeAppointmentFunc } from "@/services/Appointments"
import { Toastify  } from "@/services/Toastify"

interface Imake {
  date: Date;
  time: number;
  duration: string;
}

const MakeAppointment = ({open, close}: {open: boolean, close: () => void}) => {
  const queryClint = useQueryClient()

  const {mutate, isPending} = useMutation({
    mutationFn: MakeAppointmentFunc,
    onSuccess: (data) => {
      if (data.error) Toastify(data.message);
      else if (data.errors){
        data.errors.map((e: any) => Toastify(e.msg))
      } else {
        queryClint.invalidateQueries({
          queryKey: ["appointments"]
        })
        Toastify("تم حجز الجلسة")
        close()
      }
    },
    onError: (e) => {
      Toastify(e.message)
    }

  }) 

  const {register, handleSubmit} = useForm<Imake>()

  const submit = (data: Imake) => {
    const date = new Date(data.date)
    const weekDay = date.getDay()
    const day = date.getDate()
    const month = date.getMonth()
    const year = date.getFullYear()
    if (weekDay === 5 || weekDay === 6) {
      return Toastify("مواعيد العمل من الأحد الى الخميس فقط")
    }

    let date_
    if (data.duration === "2") {
      date_ = [new Date(year, month, day, data.time), new Date(year, month, day, parseInt(`${data.time}`)+1)]
    } else {
      date_ = [new Date(year, month, day, data.time)]
    }
    mutate(date_)

  }
  return (
    <div className={`fixed top-0 right-0 w-screen h-screen flex items-center justify-center bg-[#00000059] ${!open && "hidden"}`}>
      <div className="relative bg-primary py-5 px-10 rounded-3xl">
        <button onClick={close} className="absolute top-5 right-5 text-fourth hover:text-third font-black">✕</button>
        <h2 className="text-fourth text-2xl border-fourth border-b-2 p-2 m-5">حجز جلسه</h2>
        <form onSubmit={handleSubmit(submit)}>
          <InputField
            id="date"
            type="date"
            label="أختر المعاد"
            name="date"
            register={register}
            registerOptions={{
              required: true,
            }}
          />
          <SelectField 
            id="time"
            name="time"
            label="اختر الساعة"
            options={Array(8).fill(0).map((_, i) => ({value: `${i+1}`, label: `${i+1}`}))}
            register={register}
            registerOptions={{
              required: true,
            }}
          />
          <SelectField 
            id="duration"
            name="duration"
            label="اختر المده"
            options={Array(2).fill(0).map((_, i) => ({value: `${i+1}`, label: `${i+1} ساعة`}))}
            register={register}
            registerOptions={{
              required: true,
            }}
          />

          <button className="block m-5 mx-auto bg-fourth text-primary hover:bg-third hover:text-fourth px-4 py-2 rounded-xl ">{isPending? "الرجاء اانتظار..." : "حجز جلسه"}</button>
        </form>
      </div>
    </div>
  )
}

export default MakeAppointment