import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import Intro from "../intro/index";
import Telefone from "../tel/index";
import Tipo from '../tipo/index'
import Agenda from '../agenda/index'
import Resumo from '../resumo/index'
import Fim from '../final/index'
import Protecao from '../prot/index'
import NOME from '../nome/index'
import DATANASC from '../datanascimento/index'
import CPF from '../cpf/index'
import CNPJ from '../cnpj/index'
// import RG from '../rg/index'


export default function AppRoutes() {

     return (
          <>
               <Routes>
                    <Route path="/" element={<Protecao />} />
                    <Route path="/01" element={<Intro />} />
                    <Route path="/02" element={<Telefone />} />
                    <Route path="/03" element={<NOME />} />
                    {/* <Route path="/04" element={<RG />} /> */}
                    <Route path="/05" element={<CPF />} />
                    <Route path="/06" element={<DATANASC />} />
                    <Route path="/07" element={<Tipo/>} />
                    <Route path="/08" element={<CNPJ />} />
                    <Route path="/agenda" element={<Agenda />} />
                    <Route path="/resumo" element={<Resumo />} />
                    <Route path="/fim" element={<Fim />} />
               </Routes>
          </>
     );


}