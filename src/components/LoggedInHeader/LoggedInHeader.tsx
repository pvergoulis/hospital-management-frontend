import { Menu, X, LogOut } from "lucide-react";
import { NavLink } from "react-router";
import { jwtDecode } from "jwt-decode";
import { useState, useEffect } from "react";
import { type DecodedToken } from "../../types/jwtTypes";
const LoggedInHeader = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    const decoded = jwtDecode<DecodedToken>(token!);
    setRole(decoded.role);
  }, []);

  return (
    <>
      <nav className="flex bg-blue-500 h-24 items-center justify-between p-4 w-full fixed ">
        <div>
          <img src="/logo4.png" alt="logo" className="w-55 text-white" />
        </div>

        <div className="md:hidden">
          <button onClick={handleToggle}>{isOpen ? <X /> : <Menu />}</button>
        </div>

        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-24 left-0 w-full bg-blue-500 p-4 md:static md:block md:w-auto md:p-0`}
        >
          <ul className="md:flex gap-16 text-white text-xl">
            {role?.includes("ADMIN") && (
              <li className="mt-2 mb-2 md:mt-0 md:mb-0">
                <NavLink to="/admin" onClick={handleToggle}>
                  Admin
                </NavLink>
              </li>
            )}

            <li className="mt-2 mb-2 md:mt-0 md:mb-0">
              <NavLink to="/doctors" onClick={handleToggle}>
                Doctors
              </NavLink>
            </li>
            <li className="mt-2 mb-2 md:mt-0 md:mb-0">
              <NavLink to="/clinics" onClick={handleToggle}>
                Clinics
              </NavLink>
            </li>
            <li className="mt-2 mb-2 md:mt-0 md:mb-0">
              <NavLink to="/myAppointments" onClick={handleToggle}>
                My Appointments
              </NavLink>
            </li>
            <li className="mt-2 mb-2 md:mt-0 md:mb-0">
              <NavLink to="/login" onClick={handleToggle}>
                <LogOut />
              </NavLink>
            </li>
          </ul>
        </div>
      </nav>
    </>
  );
};

export default LoggedInHeader;
