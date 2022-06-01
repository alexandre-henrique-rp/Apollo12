import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Intro from "../intro/index";
import Telefone from "../tel/index";
import Tipo from '../tipo/index'
import A1PJ from '../pj/index'
import A1PF from '../pf/index'
import Agenda from '../agenda/index'
import Resumo from '../resumo/index'
import Fim from '../final/index'


export default function AppRoutes() {
     const nanvigate = useNavigate();
     
    
     return (

          <Routes>
               <Route index element={<Intro />} />
               <Route path="/01" element={<Telefone />} />
               <Route path="/02" element={<Tipo />} />
               <Route path="/pj" element={<A1PJ />} />
               <Route path="/pf" element={<A1PF />} />
               <Route path="/agenda" element={<Agenda />} />
               <Route path="/resumo" element={<Resumo />} />
               <Route path="/fim" element={<Fim />} />
               <Route path="/" element={<Intro />} />
          </Routes>

     );
    

}