
import banarImg from '../assets/banar.jpg';

const Hero = () => {
  return (
    <section id='hero' className="relative w-full h-screen">
      <img 
        className="absolute inset-0 w-full h-full object-cover blur-sm filter" 
        src={banarImg} 
        alt="صورة المركز الرئيسي للصحة النفسية" 
      />
      <div className="flex flex-col items-center justify-center h-full text-center text-fourth">
        <h1 className="text-5xl font-extrabold mb-5 drop-shadow-lg" style={{lineHeight: 1.3}}>مركز جويرية للصحة النفسية</h1>
        <p className="text-lg font-light max-w-lg px-4 leading-relaxed drop-shadow-sm text-wrap">
          مركز جويرية للصحة النفسية هو مركز متخصص في مجال الرعاية النفسية ويعمل على توفير خدمات الرعاية النفسية لجميع الفئات العمرية وتنمية مهاراتهم وتنميتهم.
        </p>
      </div>
    </section>
  );
}

export default Hero