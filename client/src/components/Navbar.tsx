import { Link, useLocation } from "react-router-dom";
import Icon from "../assets/main-logo.png";
import ProfileDropdown from "./ProfileDropdown";
const Navbar = () => {
  const location = useLocation();

  const isLinkActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className="max-w-full mx-auto px-4 py-2 flex justify-between items-center bg-white  border-b border-zinc-300 ">
      <div className="flex items-center justify-center max-w-sm">
        <div className=" w-32 md:w-40">
          <img className=" " src={Icon} alt="" />
        </div>
      </div>

      <nav className="flex gap-4">
        <ul className=" hidden md:flex gap-4  ">
          <Link to={"/image-generator"}>
            <li
              className={`p-2 cursor-pointer font-figtree ${
                isLinkActive("/image-generator")
                  ? "text-black"
                  : "text-[#969397]"
              }`}
            >
              Generate
            </li>
          </Link>

          <Link to={"/image-gallery"}>
            <li
              className={`p-2 cursor-pointer font-figtree ${
                isLinkActive("/image-gallery") ? "text-black" : "text-[#969397]"
              }`}
            >
              Gallery
            </li>
          </Link>
        </ul>

        <ProfileDropdown />
      </nav>
    </header>
  );
};

export default Navbar;
