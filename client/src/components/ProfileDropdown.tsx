import { useState } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { BsImage } from "react-icons/bs";
import { BsImages } from "react-icons/bs";
import { MdOutlineLogout } from "react-icons/md";
import { RiAccountCircleFill } from "react-icons/ri";
import { useAuth } from "../hooks/useAuthContext";
import { Link } from "react-router-dom";

const ProfileDropdown = () => {
  const [dropdown, setDropdown] = useState<null | HTMLElement>(null);
  const isDropdownOpen = Boolean(dropdown);

  const { user, logout } = useAuth();

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setDropdown(event.currentTarget);
  };
  const closeDropdownHandler = () => {
    setDropdown(null);
  };

  const logoutHandler = async () => {
    try {
      await logout();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <div className="flex gap-3 items-center">
          <Avatar sx={{ width: 35, height: 35 }}>
            {user?.username.charAt(0).toUpperCase()}
          </Avatar>

          <button onClick={handleClick}>
            <span
              className=" text-zinc-700 font-figtree font-semibold"
              onClick={handleClick}
            >
              {user?.username}
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
          <Link to={"/image-generator"}>
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
          </Link>

          <Link to={"/image-gallery"}>
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
          </Link>
        </div>

        <MenuItem
          sx={{
            display: "flex",
            gap: "5px",
          }}
          onClick={logoutHandler}
        >
          <MdOutlineLogout size={20} />
          Logout
        </MenuItem>
      </Menu>
    </>
  );
};

export default ProfileDropdown;
