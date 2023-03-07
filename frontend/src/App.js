import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Countries from "./pages/countries";
import Provinces from "./pages/provinces";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Countries />} exact />
        <Route path="/countries/:countryId" element={<Provinces />} exact />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
