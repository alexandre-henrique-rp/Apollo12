import React from "react";
import {
    Button,
    Select,
    chakra,
    Flex,
    Heading,
    Modal,
    ModalContent,
    ModalOverlay,
    Spinner,
    useDisclosure,
    Box
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from "react-idle-timer";
import axios from "axios";

export default function Agenda() {
    const [date, setDate] = useState([]);
    const [showpm, setShowpm] = useState(false);
    const [showam, setShowam] = useState(false);
    const [showButton, setShowButton] = useState(true);
    const [showSalve, setShowSalve] = useState(true);
    const [seletH, setSeletH] = useState("");
    const [seletD, setSeletD] = useState("");
    const [seletDV, setSeletDV] = useState("");
    //axios
    const clienteHttp = axios.create({
        baseURL: "https://totemapi.redebrasilrp.com.br/"
    });

    const nanvigate = useNavigate();
    const timeout = 2 * 60 * 1000;

    //Data------------------------------------------------

    var dataI = new Date();
    var dia = dataI.getDate();
    var mes = dataI.getMonth() + 1;
    var ano = dataI.getFullYear();

    var mesA = mes < "10" ? "0" + mes : mes;
    var dataAtual1 = ano + "-" + mesA + "-" + dia;
    var dataAtual = dataAtual1.toString();

    function getData() {
        clienteHttp.get("calendar").then(function (response) {
            console.log(response.data);
            setDate(response.data);
        });
    }
    const util1 = date.filter(
        (u) => u.dia_semana !== "sábado" && u.dia_semana !== "domingo"
    );
    const util2 = util1.filter((u) => u.feriado === "");
    const AtualPk = util2.filter((d) => d.data === dataAtual).map((a) => a.id);

    const resultF = AtualPk[0];
    const result1 = resultF + 1;
    const result2 = resultF + 2;
    const result3 = resultF + 3;
    const result4 = resultF + 4;

    const Atual = util2.filter((d) => d.id === resultF);
    const Atual1 = util2.filter((d) => d.id === result1);
    const Atual2 = util2.filter((d) => d.id === result2);
    const Atual3 = util2.filter((d) => d.id === result3);
    const Atual4 = util2.filter((d) => d.id === result4);
    const renderDate = [...Atual, ...Atual1, ...Atual2, ...Atual3, ...Atual4];
    const renderD = renderDate.map(function (item) {
        const D = item.data;
        const D_Ano = D.substring(0, 4);
        const D_Mes = D.substring(5, 7);
        const D_dia = D.substring(8, 10);
        const D_Dia = D_dia.length === 1 ? "0" + D_dia : D_dia;
        const D_vibile = D_Dia + "-" + D_Mes + "-" + D_Ano;
        return (
            <option key={item.id} value={item.data}>
                {D_vibile}
            </option>
        );
    });

    const SeteData = (e) => {
        setShowButton(false);
        setSeletD(e.target.value);
    };

    //hora-------------------------------------------------
    const am = ["09:00", "09:30", "10:00", "10:30", "11:00"];
    const pm = ["14:00", "14:30", "15:00", "15:30", "16:00", "16:30"];

    const Am = am.map(function (item) {
        return (
            <Button
                key={item}
                bg="#00713C"
                color="white"
                w="15vw"
                fontSize="1.2rem"
                p={8}
                rounded={20}
                onClick={() => {
                    setSeletH(item);
                    setShowSalve(false);
                }}
                _active={{
                    bg: "#dddfe2",
                    transform: "scale(0.98)",
                    borderColor: "#bec3c9"
                }}
                _focus={{
                    boxShadow:
                        "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)"
                }}
            >
                {item}
            </Button>
        );
    });

    const Pm = pm.map(function (item) {
        return (
            <Button
                key={item}
                bg="#00713C"
                color="white"
                w="15vw"
                fontSize="1.2rem"
                p={8}
                rounded={20}
                _active={{
                    bg: "#dddfe2",
                    transform: "scale(0.98)",
                    borderColor: "#bec3c9"
                }}
                _focus={{
                    boxShadow:
                        "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)"
                }}
                onClick={() => {
                    setSeletH(item);
                    setShowSalve(false);
                }}
            >
                {item}
            </Button>
        );
    });
    //Loading----------------------------------------------

    const OverlayOne = () => (
        <ModalOverlay
            bg="greem.300"
            backdropFilter="blur(10px) hue-rotate(90deg)"
        />
    );

    const { isOpen, onOpen, onClose } = useDisclosure();
    const [overlay, setOverlay] = useState(<OverlayOne />);

    //Salvar --------------------------------------------
    console.log(seletD);
    function salvar() {
        onOpen();
        localStorage.setItem("data", seletD);
        localStorage.setItem("hora", seletH);
        setTimeout(() => {
            nanvigate('/resumo');
        }, 250);
    }
    const visebile = () => {
        if (seletD !== "") {
            const D = seletD;
            const D_Ano = D.substring(0, 4);
            const D_Mes = D.substring(5, 7);
            const D_dia = D.substring(8, 10);
            const D_Dia = D_dia.length === 1 ? "0" + D_dia : D_dia;
            const D_vibile = D_Dia + "-" + D_Mes + "-" + D_Ano;
            setSeletDV(D_vibile);
        }
    };

    //timeout page--------------------------------------
    const handleOnIdle = () => {
        nanvigate('/01')
    };
    const { getRemainingTime } = useIdleTimer({
        timeout,
        onIdle: handleOnIdle
    });
    useEffect(() => {
        getRemainingTime();
        getData();
        setOverlay(<OverlayOne />);
        visebile();
    }, []);

    return (
        <>
            <Flex
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                w="100vw"
                h="100vh"
            >
                <Heading as="h1" fontSize="5xl" textTransform="uppercase">
                    Agendamento
                </Heading>
                <chakra.p mt={8} fontSize="2xl">
                    Informe a data e o hora, para fazer a video comferencia
                </chakra.p>
                <Select
                    placeholder="Seleciona uma data"
                    w="45vw"
                    h="5vh"
                    mt={5}
                    size="lg"
                    fontSize="3xl"
                    onChange={SeteData}
                >
                    {renderD}
                </Select>
                <Box mt={10} h={10}>
                    <Flex w="70vw" justifyContent="space-around">
                        <Box hidden={seletD !== "" ? false : true}>
                            Dia Agendado: {seletD}
                        </Box>
                        <Box hidden={seletH !== "" ? false : true}>
                            Horario Agendado {seletH}
                        </Box>
                    </Flex>
                </Box>
                <Flex mt={10} w="85vw" justifyContent="space-around">
                    <Button
                        isDisabled={showButton}
                        p={8}
                        bg="#00713C"
                        color="white"
                        fontSize="1.2rem"
                        border="2px solid #00713C"
                        rounded={20}
                        w="15rem"
                        _hover={{
                            bg: "#00A853",
                            border: "2px solid #00A853",
                            color: "#01532C"
                        }}
                        onClick={() => {
                            if (showpm === true) {
                                setShowpm(false);
                                setShowam(true);
                            } else {
                                setShowam(true);
                            }
                        }}
                    >
                        Manhã
                    </Button>
                    <Button
                        p={8}
                        isDisabled={showButton}
                        bg="#00713C"
                        color="white"
                        fontSize="1.2rem"
                        rounded={20}
                        w="15rem"
                        border="2px solid #00713C"
                        _hover={{
                            bg: "#00A853",
                            border: "2px solid #00A853",
                            color: "#01532C"
                        }}
                        onClick={() => {
                            if (showam === true) {
                                setShowam(false);
                                setShowpm(true);
                            } else {
                                setShowpm(true);
                            }
                        }}
                    >
                        Tarde
                    </Button>
                </Flex>
                <Flex
                    w="75vw"
                    justifyContent="space-around"
                    mt={16}
                    flexWrap="wrap"
                    gap="5rem"
                >
                    {showpm ? Pm : null}
                    {showam ? Am : null}
                </Flex>
                <Button
                    isDisabled={showSalve}
                    mt={16}
                    size="xl"
                    height="7vh"
                    width="80vw"
                    borderRadius="40px"
                    border="2px solid #00713C"
                    bg="#00713C"
                    _hover={{
                        bg: "#00A853",
                        border: "2px solid #00A853",
                        color: "#01532C"
                    }}
                    color="white"
                    fontSize="2rem"
                    onClick={salvar}
                >
                    Confirmar
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
        </>
    );
}
