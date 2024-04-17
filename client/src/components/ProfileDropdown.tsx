import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsImage } from "react-icons/bs";
import { BsImages } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";

const ProfileDropdown = () => {
  const [dropdown, setDropdown] = useState<null | HTMLElement>(null);
  const isDropdownOpen = Boolean(dropdown);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setDropdown(event.currentTarget);
  };
  const closeDropdownHandler = () => {
    setDropdown(null);
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <div className="flex gap-3 items-center">
          <Avatar sx={{ width: 35, height: 35 }}>K</Avatar>

          <button onClick={handleClick}>
            <span
              className=" text-zinc-700 font-figtree font-semibold"
              onClick={handleClick}
            >
              Khalid
            </span>
          </button>
        </div>
      </Box>
      <Menu
        anchorEl={dropdown}
        open={isDropdownOpen}
        onClose={closeDropdownHandler}
        onClick={closeDropdownHandler}
        sx={{ top: 10 }}
      >
        {/* TODO: Refactor this so it is not repeating */}
        <MenuItem
          sx={{
            display: "flex",
            gap: "5px",
          }}
          onClick={closeDropdownHandler}
        >
          <RiAccountCircleFill size={25} />
          My account
        </MenuItem>
        <div className="md:hidden">
          <MenuItem
            sx={{
              display: "flex",
              gap: "5px",
            }}
            onClick={closeDropdownHandler}
          >
            <BsImage size={20} />
            Generate
          </MenuItem>
          <MenuItem
            sx={{
              display: "flex",
              gap: "5px",
            }}
            onClick={closeDropdownHandler}
          >
            <BsImages size={20} />
            Gallery
          </MenuItem>
        </div>

        <MenuItem
          sx={{
            display: "flex",
            gap: "5px",
          }}
          onClick={closeDropdownHandler}
        >
          <MdOutlineLogout size={20} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileDropdown;
