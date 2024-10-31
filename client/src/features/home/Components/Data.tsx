import therapist from '../../../assets/Physcotherapy.jpg';

const Data = () => {
  return (
    <section className="p-6 bg-fourth">
      <h1 className="text-4xl font-bold text-primary text-center mb-8">معلومات عن المعالج</h1>
      <div className="container mx-auto flex flex-col md:flex-row items-center rounded-lg p-6 gap-8">
        {/* Text Section */}
        <div className="text-center md:text-right md:w-1/2">
          <h2 className="text-3xl font-semibold text-socendery mb-2">الدكتورة جويرية</h2>
          <p className="text-xl font-medium text-third mb-2">دكتوراة في الصحة النفسية من جامعة القاهرة</p>
          <p className="text-base text-socendery leading-relaxed">
            حاصلة على ماجستير في علم النفس الاكلينيكي ولديها خبرة تفوق الخمسة أعوام في العلاج النفسي الفردي والجماعي.
          </p>
        </div>
        {/* Image Section */}
        <div className="md:w-1/2 flex justify-center">
          <img 
            src={therapist} 
            className="rounded-lg w-60 h-60 object-cover md:w-80 md:h-80 "
          />
        </div>
      </div>
    </section>
  );
}

export default Data;
