import { useState } from "react";
import Modal from "@mui/material/Modal";
import { Box } from "@mui/material";
import { RiDownload2Line } from "react-icons/ri";
import { BsEyeFill } from "react-icons/bs";
import { IGallery } from "../models/image";

interface ModalImageProps {
  image: IGallery | null;
}

const ModalImage = ({ image }: ModalImageProps) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  console.log(image);

  return (
    <>
      <div
        className="absolute bottom-3 right-6 bg-white p-2 rounded-lg"
        onClick={handleOpen}
      >
        <BsEyeFill className="fill-black" />
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 focus:outline-none bg-white rounded-xl shadow-xl w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg xl:max-w-xl 2xl:max-w-2xl h-auto p-2 sm:overflow-auto ">
          <div className="flex flex-col h-full w-full  lg:flex-row">
            <div className="w-full   p-2 lg:w-1/2">
              <img
                className="w-full object-cover"
                src={image?.ImageUrl}
                alt=""
              />
            </div>
            <div className="py-3 px-2 w-full lg:w-1/2">
              <h1 className="text-xl  font-bold sm:text-2xl">
                {image?.prompt}
              </h1>
              <p className="text-[#898989] text-sm my-3">Prompt</p>
              <p className="p-3 bg-[#f6f3f2] rounded-xl">{image?.prompt}</p>
              <div className="mt-6">
                <p className="text-[#898989] text-sm">Resolution</p>
                <p>{image?.imageSize}</p>
              </div>
              <button className=" flex items-center gap-2 mt-6 bg-black text-white py-2 px-4 rounded ">
                <RiDownload2Line />
                Download
              </button>
            </div>
          </div>
        </Box>
      </Modal>
    </>
  );
};

export default ModalImage;
