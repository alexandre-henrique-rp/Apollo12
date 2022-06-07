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
import Protecao from '../prot/index'


export default function AppRoutes() {

     return (
          <>
               <Routes>
                    <Route path="/" element={<Protecao />} />
                    <Route path="/01" element={<Intro />} />
                    <Route path="/02" element={<Telefone />} />
                    <Route path="/03" element={<Tipo />} />
                    <Route path="/pj" element={<A1PJ />} />
                    <Route path="/pf" element={<A1PF />} />
                    <Route path="/agenda" element={<Agenda />} />
                    <Route path="/resumo" element={<Resumo />} />
                    <Route path="/fim" element={<Fim />} />
               </Routes>
          </>
     );


}