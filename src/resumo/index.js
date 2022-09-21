import React from "react";
import {
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalContent,
  ModalOverlay,
  Spinner,
  useDisclosure,
  Text
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";

const id = 16;
const TotemName = "TOTEM 01";
const id_local = TotemName + " - TOTEM DE TESTE";
const id_contador = "REDEBRASILRP";

export default function Resumo() {
  const nanvigate = useNavigate();
  const [totem, setTotem] = useState([]);
    const [razaoSocial, setRazaoSocial] = useState("");
    const [endereco, setEndereco] = useState("");
    const [nrua, setNrua] = useState("");
    const [bairro, setBairro] = useState("");
    const [cep, setCep] = useState("");
    const [complemento, setComplemento] = useState("");
    const [uf, setUf] = useState("");
    const [cidade, setCidade] = useState("");
    const [obs, setObs] = useState("");

  const [Data, setData] = useState("");
  const [Datanasc, setDatanasc] = useState("");
  const timeout = 2 * 60 * 1000;

  const setnome = localStorage.getItem("nome");
  const nome = setnome === undefined ? "" : setnome;
  const setcpf = localStorage.getItem("cpf");
  const cpf = setcpf === undefined ? "" : setcpf;
  const setcnpj = localStorage.getItem("cnpj");
  const cnpj = setcnpj === undefined ? "" : setcnpj;
  const setdataNascimento = localStorage.getItem("dtNs");
  const dataNascimento =
    setdataNascimento === undefined ? "" : setdataNascimento;
  const settelefone = localStorage.getItem("telefone");
  const telefone = settelefone === undefined ? "" : settelefone;
  const settipocd = localStorage.getItem("tipoDeCertificado");
  const tipoCd = settipocd === undefined ? "" : settipocd;
  const setdata = localStorage.getItem("data");
  const dataAg = setdata === undefined ? "" : setdata;
  const sethora = localStorage.getItem("hora");
  const hora = sethora === undefined ? "" : sethora;

  const dtNsV2 = localStorage.getItem("dtNsV");

  const clienteHttp = axios.create({
    baseURL: "https://totemapi.redebrasilrp.com.br/"
  });

  // const clienteHttp = axios.create({
  //     baseURL: 'http://localhost:3040/',
  // });

  async function getUsuarios() {
    const response = await clienteHttp.get(`/totem/${id}`);
    console.log(response.data);
    setTotem(response.data);
  }

  var cpfMask =
    cpf.substring(0, 3) +
    "." +
    cpf.substring(3, 6) +
    "." +
    cpf.substring(6, 9) +
    "-" +
    cpf.substring(9, 11);
  console.log(cpfMask);

  var Diaag1 = Data.substring(8, 10);
  var Diaag = Diaag1.length === 1 ? "0" + Diaag1 : Diaag1;
  var Mesag = Data.substring(5, 7);
  var Anoag = Data.substring(0, 4);

  const dataAgendadamento1 = Diaag + "/" + Mesag + "/" + Anoag + "-" + hora;
  const dataAgendadamento = setdata === undefined ? "" : dataAgendadamento1;

  const agend = Anoag + "-" + Mesag + "-" + Diaag;
  const valor = tipoCd === "A1PF" ? totem.a1pf_12m : totem.a1pj_12m;

  const price1 = `R$ ${valor},00`;
  const price = valor === undefined ? "R$ 0,00" : price1;
  async function getcnpj() {
    if (tipoCd === "A1PF") {
      setTimeout(() => {
        onClose();
      }, 50);
    } else {
        onOpen();
        
      fetch(`https://publica.cnpj.ws/cnpj/${cnpj}`)
        .then((response) => response.json())
        .then((response) => {
            console.log(response);
            const rua = response.estabelecimento.tipo_logradouro + " " + response.estabelecimento.logradouro
            const email = 'email de contato da empresa é'+response.estabelecimento.email
            setRazaoSocial(response.razao_social)
            setEndereco(rua)
            setNrua(response.estabelecimento.numero)
            setBairro(response.estabelecimento.bairro)
            setCep(response.estabelecimento.cep)
            setComplemento(response.estabelecimento.complemento)
            setUf(response.estabelecimento.estado.sigla)
            setCidade(response.estabelecimento.cidade.nome)
            setObs(email)

        })
        .catch((err) => console.error(err));
    }
  }

  const pagar = () => {
    onOpen();
    registro();
  };

  const id_obs = `O AGENDAMENTO FOI EFETUADO PELO TOTEM DE AUTOATENDIMENTO (${id_local}), PARA O CLIENTE ${nome} COM O TELEFONE ${telefone}, FICAR ATENTO AO HORARIO DE ATENDIMENTO, E AS INFORMACOES REGISTRADAS, NAO ESQUECENDO DE PESQUISAR SE O CLIENTE TEM MATRICULA CEI.`;

  function registro() {
    const dataI = new Date();
    const dia = dataI.getDate();
    const mes = dataI.getMonth() + 1;
    const ano = dataI.getFullYear();
    const horario = dataI.getHours();
    const minuto = dataI.getMinutes();
    const seg = dataI.getSeconds();
    const hist =
      dia +
      "-" +
      mes +
      "-" +
      ano +
      "." +
      horario +
      ":" +
      minuto +
      ":" +
      seg +
      "-" +
      TotemName +
      ":criou_FC.";

    return (response = clienteHttp
      .post("/cadastrar/cliente", {
        dt_agenda: agend,
        cpf: cpf,
        andamento: "AGENDADO",
        nome: nome,
        cnpj: cnpj,
        unidade: id,
        tipocd: tipoCd,
        hr_agenda: hora,
        valorcd: price,
        telefone: telefone,
        dtnascimento: Datanasc,
        razaosocial: razaoSocial,
        obscont: id_local,
        estatos_pgto: "Falta Pgto",
        observacao: id_obs +" "+ obs,
        contador: id_contador,
        historico: hist,
          validacao: "VIDEO CONF",
          endereco: endereco,
          nrua: nrua,
          bairro: bairro,
          cep: cep,
          complemento: complemento,
          uf: uf,
          cidade: cidade
      })
      .then(function (response) {
        console.log(response.data);
        setTimeout(() => {
          nanvigate("/fim");
        }, 1050);
      }));
  }

  useEffect(() => {
    setDatanasc(dataNascimento);
    setData(dataAg);
    getUsuarios();
    getcnpj();
  }, []);

  const OverlayOne = () => (
    <ModalOverlay
      bg="greem.300"
      backdropFilter="blur(10px) hue-rotate(90deg)"
    />
  );

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [overlay, setOverlay] = useState(<OverlayOne />);

  const handleOnIdle = () => {
    nanvigate("/01");
    localStorage.clear();
  };
  const { getRemainingTime } = useIdleTimer({
    timeout,
    onIdle: handleOnIdle
  });
  useEffect(() => {
    getRemainingTime();
  }, []);

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100%"
    >
      <Heading
        as="h1"
        size="4xl"
        isTruncated
        textTransform={"uppercase"}
        mb={16}
      >
        Resumo
      </Heading>
      <Flex
        flexDirection="column"
        w="100%"
        px={8}
        pb={12}
        borderBottom="2px solid #ccc"
      >
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl">Certificado:</Text>
          <Heading as="h3" size="xl">
            {tipoCd}
          </Heading>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl">Responsavel:</Text>
          <Heading as="h3" size="xl" w="30rem" h="auto" textAlign="end">
            {nome}
          </Heading>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl">CPF:</Text>
          <Heading as="h3" size="xl">
            {cpfMask}
          </Heading>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl">Nascimento:</Text>
          <Heading as="h3" size="xl">
            {dtNsV2}
          </Heading>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl">CNPJ:</Text>
          <Heading as="h3" size="xl" w="30rem" h="auto" textAlign="end">
            {cnpj}
          </Heading>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl">Razão Social:</Text>
          <Heading as="h3" size="xl" w="30rem" h="auto" textAlign="end">
            {razaoSocial}
          </Heading>
        </Flex>
        <Flex justifyContent="space-between" alignItems="center">
          <Text fontSize="2xl">Data/Hora:</Text>
          <Heading as="h3" size="xl">
            {dataAgendadamento}
          </Heading>
        </Flex>
      </Flex>
      <Flex w="100%" my={10} justifyContent="space-around" alignItems="center">
        <Heading as="h2" size="3xl">
          Total:
        </Heading>
        <Heading as="h2" size="3xl">
          {price}
        </Heading>
      </Flex>
      <Flex
        w="100%"
        my={6}
        px={8}
        pt={20}
        justifyContent="flex-end"
        alignItems="center"
      >
        <Button
          bg="whatsapp.800"
          _hover={{ bg: "whatsapp.900" }}
          color="white"
          w={72}
          h={24}
          fontSize="6xl"
          rounded={40}
          onClick={pagar}
        >
          Finalizar
        </Button>
      </Flex>
      <Modal isCentered isOpen={isOpen} onClose={onClose}>
        {overlay}
        <ModalContent
          display={"flex"}
          alignItems={"center"}
          bg="transparent"
          boxShadow={"none"}
        >
          <Spinner
            thickness="1.5rem"
            speed="0.65s"
            emptyColor="gray.200"
            color="green.700"
            size="xl"
            h="15rem"
            w="15rem"
          />
        </ModalContent>
      </Modal>
    </Box>
  );
}
