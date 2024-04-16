import Icon from "../assets/main-logo.png";

const Navbar = () => {
  return (
    <header className="max-w-full mx-auto px-4 py-2 flex justify-between items-center bg-white ">
      <div className="flex items-center justify-center max-w-sm">
        <div className=" w-32 md:w-40">
          <img className=" " src={Icon} alt="" />
        </div>
      </div>

      <nav className="flex gap-4">
        <ul className=" hidden md:flex gap-4  ">
          <li className="p-2 cursor-pointer text-[#969397]">Generate</li>
          <li className="p-2 cursor-pointer text-[#969397] text-base ">
            Gallery
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Navbar;
