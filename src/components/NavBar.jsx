import { useState } from "react";
import { BiMenuAltLeft } from "react-icons/bi";
import { FaOpencart, FaSearch } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import { Link } from "react-router-dom";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <nav className="bg-emerald-500 text-white py-2 px-3 text-lg flex gap-4 items-center justify-between">
      <button
        className="text-2xl md:hidden"
        onClick={() => setIsMenuOpen(!isMenuOpen)}
      >
        <BiMenuAltLeft />
      </button>
      <div className="flex gap-2 bg-white text-black items-center rounded-full px-2 py-1 focus-within:outline-10 focus-within:outline-red-500 max-w-sm">
        <span>
          <FaSearch className="text-gray-500 font-medium" />
        </span>
        <input
          type="search"
          className="focus:outline-none w-full"
          placeholder="Search Gamers Stop"
        />
      </div>
      <ul
        className={`fixed top-0 bottom-0 left-0 bg-white text-black max-w-[100vw] z-50 w-full flex-col py-2 px-4 ${
          isMenuOpen ? "flex" : "hidden"
        }`}
      >
        <li>
          <Link className="text-2xl" to="/">
            Gamers Stop
          </Link>
        </li>
        <li>
          <button
            className="absolute top-2 right-2 text-2xl"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <AiOutlineClose />
          </button>
        </li>
      </ul>
      <Link to="/cart" className="block text-2xl relative">
        <span className="absolute -top-1 -left-1 bg-red-500 w-4 h-4 rounded-full font-medium flex items-center justify-center text-sm">
          0
        </span>
        <FaOpencart />
      </Link>
    </nav>
  );
}

export default NavBar;
