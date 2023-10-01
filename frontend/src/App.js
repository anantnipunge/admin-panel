import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import UploadProduct from "./Components/UploadProduct";
import WelcomePage from "./Components/WelocomePage";

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/upload" element={<UploadProduct />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
