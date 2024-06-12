import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Navbar from "./components/Navbar";
import ImageGenerator from "./pages/ImageGenerator";
import ImageGallery from "./pages/ImageGallery";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useAuth } from "./hooks/useAuthContext";

const App = () => {
  const { authReady, user } = useAuth();
  console.log(authReady);

  return (
    <div>
      {authReady ? (
        <Router>
          {user && <Navbar />}
          <Routes>
            <Route
              path="/login"
              element={!user ? <Login /> : <Navigate to="/image-generator" />}
            />
            <Route
              path="/signup"
              element={!user ? <Signup /> : <Navigate to="/image-generator" />}
            />
            <Route
              path="/image-generator"
              element={user ? <ImageGenerator /> : <Navigate to="/login" />}
            />
            <Route
              path="/image-gallery"
              element={user ? <ImageGallery /> : <Navigate to="/login" />}
            />
          </Routes>
        </Router>
      ) : (
        <div>Loading spinner or animation...</div>
      )}
    </div>
  );
};

export default App;
