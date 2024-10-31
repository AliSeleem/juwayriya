import { useState, ReactNode, Children } from 'react';
import logo from "../assets/logo.png";

const Navbar = ({ children }: { children: ReactNode }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const childArray = Children.toArray(children); // Convert children to array for easier manipulation

  return (
    <div className="fixed top-5 z-10 mx-auto bg-third py-3 px-5 rounded-full right-1/2 translate-x-1/2 container flex items-center justify-between">
      {/* Logo */}
      <div className="flex items-center gap-3">
        <img className="w-16" src={logo} alt="شعار مركز جويرية" />
        <h2 className="text-fourth font-bold text-2xl">مركز جويرية</h2>
      </div>

      {/* Buttons */}
      <div className="flex items-center gap-3 relative">
        {/* Show buttons normally on larger screens */}
        <div className="hidden md:flex items-center gap-3">
          {children}
        </div>

        {/* Dropdown for small screens if more than one child */}
        {childArray.length > 1 && (
          <div className="md:hidden">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="text-fourth text-sm px-2 py-1 rounded bg-primary"
            >
              {isDropdownOpen ? "إغلاق" : "المزيد"}
            </button>
            {isDropdownOpen && (
              <div className="absolute left-0 top-16 bg-third p-2 rounded-lg shadow-lg">
                {childArray.map((child, index) => (
                  <div key={index} className="py-1 text-center min-w-max">
                    {child}
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Show a single button directly if only one child */}
        {childArray.length === 1 && (
          <div className="flex gap-3">
            {children}
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
