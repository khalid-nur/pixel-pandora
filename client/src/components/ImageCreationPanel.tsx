import ImageGenerationForm from "./ImageGenerationForm";
interface ImageCreationPanelProps {
  onImageUpdate: () => void;
}
const ImageCreationPanel = ({ onImageUpdate }: ImageCreationPanelProps) => {
  return (
    <>
      <div className="mb-4">
        <h1 className="text-2xl text-center text-zinc-700 font-redHat font-bold  mb-8 md:text-3xl">
          Generate Image to Spark Your Creative Genius!
        </h1>
      </div>

      <div className="mb-4">
        <ImageGenerationForm onImageUpdate={onImageUpdate} />
      </div>
    </>
  );
};

export default ImageCreationPanel;
