import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Countries from "./pages/countries";
import Provinces from "./pages/provinces";
import CountryService from "./services/country-service";
import React from "react";

function App() {
  //   React.useEffect(() => {
  //     async function foo() {
  //       const res = await CountryService.exportToCSV();
  //     }

  //     foo();
  //   }, []);
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Countries />} exact />
          <Route path="/countries/:countryId" element={<Provinces />} exact />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
