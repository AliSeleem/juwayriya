import Card from "./Card"

const Appointments = () => {
  return (
    <section className="p-6 bg-fourth">
      <h1 className="text-4xl font-bold text-primary text-center mb-8">الجلسات</h1>
      <div className="flex flex-col md:flex-row items-center justify-evenly gap-6 container mx-auto my-8">
        <Card 
          main="ساعه" 
          description="جلسة استشارة لمدة ساعة تشمل تقييم مبدئي ومناقشة الخطوات المقبلة." 
          primary 
        />
        <Card 
          main="ساعتين" 
          description="جلسة استشارة متعمقة لمدة ساعتين للتعرف على حالتك بشكل أعمق." 
        />
      </div>
    </section>
  )
}

export default Appointments