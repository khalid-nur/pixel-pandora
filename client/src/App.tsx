import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import ImageGenerator from "./pages/ImageGenerator";
const App = () => {
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route path="/image-generator" element={<ImageGenerator />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
