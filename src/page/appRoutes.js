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
          <>
               <Routes>
                    <Route path="/" element={<Intro />} />
                    <Route exact path="/01" element={<Telefone />} />
                    <Route exact path="/02" element={<Tipo />} />
                    <Route exact path="/pj" element={<A1PJ />} />
                    <Route exact path="/pf" element={<A1PF />} />
                    <Route exact path="/agenda" element={<Agenda />} />
                    <Route exact path="/resumo" element={<Resumo />} />
                    <Route exact path="/fim" element={<Fim />} />
               </Routes>
          </>
     );


}