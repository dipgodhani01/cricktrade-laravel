import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { navLinks } from "../data";
import icon from "../assets/icon.png";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="max-w-7xl mx-auto p-4 flex justify-between items-center">
        <Link to="/home">
          <div className="flex items-center gap-2">
            <img src={icon} alt="" />
            <h1 className="text-2xl font-bold text-yellow-300">CrickTrade</h1>
          </div>
        </Link>

        <ul className="hidden md:flex space-x-6 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.link} className="hover:text-yellow-300 transition">
                {link.name}
              </a>
            </li>
          ))}
        </ul>

        <button
          onClick={toggleMenu}
          className="md:hidden text-2xl focus:outline-none"
        >
          {menuOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      <div
        className={`overflow-hidden md:hidden transition-all duration-300 ease-in-out ${
          menuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <ul className="bg-black px-4 pb-4 py-4 space-y-3 font-medium">
          {navLinks.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="block hover:text-yellow-300">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
