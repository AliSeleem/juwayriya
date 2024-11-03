import { IoLocationOutline } from "react-icons/io5";
import { CiCalendarDate } from "react-icons/ci";
import { FaPhoneFlip, FaFacebook } from "react-icons/fa6";
import { AiFillInstagram } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-primary text-fourth text-base p-8">
      <div className="container mx-auto flex flex-col md:flex-row justify-evenly items-center gap-6">
        {/* Location and Schedule */}
        <div className="text-center md:text-left space-y-3">
          <p className="flex items-center justify-center md:justify-start gap-2">
            <IoLocationOutline /> مغاغة, المنيا
          </p>
          <p className="flex items-center justify-center md:justify-start gap-2">
            <CiCalendarDate /> من الاحد الى الخميس, من الساعة الثانية عشر حتى الثامنة مساً
          </p>
        </div>

        {/* Contact Info */}
        <div className="text-center space-y-3">
          <p className="flex items-center justify-center gap-2">
            <FaPhoneFlip /> 01009051804
          </p>
          <div className="flex items-center justify-center gap-4 text-xl">
            <FaFacebook />
            <AiFillInstagram />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;