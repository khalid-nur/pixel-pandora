import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ImageGenerator from "./pages/ImageGenerator";
import ImageGallery from "./pages/ImageGallery";
const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/image-generator" element={<ImageGenerator />} />
          <Route path="/image-gallery" element={<ImageGallery />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
