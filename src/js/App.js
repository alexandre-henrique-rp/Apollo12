import React from "react";
import AppRoutes from "../page/appRoutes";
import Template from "../components/themplate";
import { BrowserRouter } from "react-router-dom";


function App() {
 
  return (
    <>
      <BrowserRouter>
        <Template>
          <AppRoutes />
        </Template>
      </BrowserRouter>
    </>

  );
}

export default App;
