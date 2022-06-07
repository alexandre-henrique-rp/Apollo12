import React from "react";
import { Box, Button, Center, Container, Flex, Heading, Modal, ModalContent, ModalOverlay, Spinner, Text, useDisclosure } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from 'react-idle-timer';


export default function Agenda() {

    const [MaisMes, setMaisMes] = useState(0);
    const [MaisDias, setMaisDias] = useState(0);
    const [Hora, setHora] = useState(0);
    // const [ind, setInd] = useState(0);
    const nanvigate = useNavigate();
    const timeout = 2 * 60 * 1000;

    var data = new Date();
    var data2 = new Date();
    var data3 = new Date();
    var dayB = data3.getDate();
    // var semanaB = data3.getDay();

    data2.setDate(data2.getDate() + MaisDias);
    data.setMonth(data.getMonth() + MaisMes);
    var dayF = data2.getDate();
    var mesF = data2.getMonth() + 1;
    var mesF2 = data2.getMonth() + 3;
    var anoF = data2.getFullYear();
    var semanaf = data2.getDay();
    var dataAtualN = [dayF, mesF, anoF, semanaf];
    var dataFinal = dataAtualN[3] === 6 ? 2 : dataAtualN[3] === 0 ? 1 : 0;
    data.setDate(data.getDate() + MaisDias + dataFinal);
    // var semana = data.getDay() === 0 ? 'Domingo' : data.getDay() === 1 ? 'Segunda-feira' : data.getDay() === 2 ? 'Terça-feira' : data.getDay() === 3 ? 'Quarta-feira' : data.getDay() === 4 ? 'Quinta-feira' : data.getDay() === 5 ? 'Sexta-feira' : data.getDay() === 6 ? 'Sábado' : 'Dia inválido';
    var dia = data.getDate();
    var mesAtual = data.getMonth() + 1;
    var mes = mesAtual === 1 ? "Janeiro" : mesAtual === 2 ? "Fevereiro" : mesAtual === 3 ? "Março" : mesAtual === 4 ? "Abril" : mesAtual === 5 ? "Maio" : mesAtual === 6 ? "Junho" : mesAtual === 7 ? "Julho" : mesAtual === 8 ? "Agosto" : mesAtual === 9 ? "Setembro" : mesAtual === 10 ? "Outubro" : mesAtual === 11 ? "Novembro" : "Dezembro";
    var ano = data.getFullYear();
    var ultimoDia = new Date(ano, mesF2, 0).getDate();
    var mesFim = mesAtual < 10 ? "0" + mesAtual : mesAtual;

    // var dataAtual = `${semana} - ${dia} / ${mesAtual} / ${ano}`;

    function NextMes() {
        if (mesF2 === mesAtual) { }
        else {
            setMaisMes(MaisMes + 1);
        }
    }

    function PrevMes() {
        if (mesF === mesAtual) {

        } else {
            setMaisMes(MaisMes - 1);
        }
    }
    function NextDia() {
        if (semanaf === 6) {
            setMaisDias(MaisDias + 2);
        } else if (semanaf === 0) {
            setMaisDias(MaisDias + 1);
        } else if (dia === ultimoDia) { }
        else {
            setMaisDias(MaisDias + 1);
        }
    }
    function PrevDia() {
        if (semanaf === 0) {
            setMaisDias(MaisDias - 2);
        } else if (semanaf === 6) {
            setMaisDias(MaisDias - 1);
        } else if (dayB === dia) { }

        else {
            setMaisDias(MaisDias - 1);
        }
    }

    var dia1 = data.getDate();
    var dia2 = data.getDate() + 1;
    var dia3 = data.getDate() + 2;

    var semana1 = data.getDay() - 1;
    var semana1F = semana1 === 0 ? 'Domingo' : semana1 === 1 ? 'Segunda-feira' : semana1 === 2 ? 'Terça-feira' : semana1 === 3 ? 'Quarta-feira' : semana1 === 4 ? 'Quinta-feira' : semana1 === 5 ? 'Sexta-feira' : semana1 === 6 ? 'Sábado' : 'Dia inválido';
    var semana2 = data.getDay();
    var semana2F = semana2 === 0 ? 'Domingo' : semana2 === 1 ? 'Segunda-feira' : semana2 === 2 ? 'Terça-feira' : semana2 === 3 ? 'Quarta-feira' : semana2 === 4 ? 'Quinta-feira' : semana2 === 5 ? 'Sexta-feira' : semana2 === 6 ? 'Sábado' : 'Dia inválido';
    var semana3 = data.getDay() + 1;
    var semana3F = semana3 === 0 ? 'Domingo' : semana3 === 1 ? 'Segunda-feira' : semana3 === 2 ? 'Terça-feira' : semana3 === 3 ? 'Quarta-feira' : semana3 === 4 ? 'Quinta-feira' : semana3 === 5 ? 'Sexta-feira' : semana3 === 6 ? 'Sábado' : 'Dia inválido';

    const horario = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

    const capareI = horario.indexOf('09:00')

    // const verificar = time === '11:30' ? 6 : time === '12:00' ? 6 : time === '12:30' ? 6 : time === '13:00' ? 7 : time === '13:30' ? 7 : 0;

    const horasFilter = capareI + Hora

    const fita2 = horasFilter === 10 ? 0 : horasFilter + 1
    const fita = horasFilter === 0 ? 9 : horasFilter - 1;
    var horai1 = fita;
    var horai2 = horasFilter;
    var horai3 = fita2;

    function NextHora() {
        if (horasFilter === 9) {
            setHora(0)
        } else {
            setHora(Hora + 1);
        }
    }
    function PrevHora() {
        if (horasFilter === 0) {
            setHora(9)
        } else {
            setHora(Hora - 1);
        }
    }

    const horaAgendada = horario[horai2]
    // const idel = capareI + ind + verificar
    // const horaIdeal = horario[idel]

    
    useEffect(() => {
        setOverlay(<OverlayOne />)
    }, [])

    const OverlayOne = () => (
        <ModalOverlay
            bg='greem.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

    function salvar() {
        onOpen()
        const data = `${ano}-${mesFim}-${dia2}`;
        const hora = horaAgendada;
        console.log(data, hora)
        localStorage.setItem('data', data);
        localStorage.setItem('hora', hora);
        setTimeout(() => {
            nanvigate('/resumo');
        }, 250);
    }

    const handleOnIdle = () => {
        nanvigate('/01')
    };
    const { getRemainingTime } = useIdleTimer({
        timeout,
        onIdle: handleOnIdle
    });
    useEffect(() => {
        getRemainingTime();
    }, []);

    return (
        <>
            <Container maxW='container.sm' centerContent>
                <Flex
                    flexDir='column'
                    justifyContent='center'
                    alignItems='center'
                    width='100vw'
                    height='100%'
                    gap={8}
                >
                    <Heading
                        as='h1'
                        size='4xl'
                        isTruncated
                        textTransform={'uppercase'}
                    >
                        Agenda
                    </Heading>
                    <Box
                        width='80vw'
                        height='35vh'
                        backgroundColor='#00713C'
                        borderRadius='30px'
                        padding='1.5rem'
                        overflow='auto'
                    >
                        <Box
                            w='100%'
                            h='20%'
                            borderRadius='15px'
                            bg='white'
                            marginBottom='2rem'
                            overflow='hidden'
                            padding='0 4rem 0 4rem'
                        >
                            <Box
                                display='flex'
                                alignItems='center'
                                justifyContent='space-around'
                            >
                               
                                <Box>
                                    <Center>
                                        <Text fontSize='xl'>{mes}</Text>
                                    </Center>
                                    <Center>
                                        <Text fontSize='lg'>{ano}</Text>
                                    </Center>
                                </Box>
                                
                            </Box>

                        </Box>
                        <Box
                            w='100%'
                            h='68%'
                            borderRadius='15px'
                            bg='white'
                            display='flex'
                            alignItems='center'
                            justifyContent='space-between'
                        >
                            <Button
                                border='none'
                                bg='transparent'
                                h='180'
                                _hover={{ bg: 'transparent' }}
                                onClick={PrevDia}
                            >
                                <IoIosArrowBack fontSize='3rem' />
                            </Button>
                            <Box
                                opacity='0.8'
                                filter='blur(4px)'
                            >
                                <Center>
                                    <Text fontSize='md'>{semana1F}</Text>
                                </Center>
                                <Center>
                                    <Heading as='h1' fontWeight='bold' fontSize='5rem'>{dia1}</Heading>
                                </Center>
                            </Box>
                            <Box>
                                <Center>
                                    <Text fontSize='xl'>{semana2F}</Text>
                                </Center>
                                <Center>
                                    <Heading as='h1' fontWeight='bold' fontSize='7rem'>{dia2}</Heading>
                                </Center>
                            </Box>
                            <Box
                                opacity='0.8'
                                filter='blur(4px)'
                            >
                                <Center>
                                    <Text fontSize='md'>{semana3F}</Text>
                                </Center>
                                <Center>
                                    <Heading as='h1' fontWeight='bold' fontSize='5rem'>{dia3}</Heading>
                                </Center>
                            </Box>
                            <Button
                                border='none'
                                bg='transparent'
                                h='180'
                                _hover={{ bg: 'transparent' }}
                                onClick={NextDia}
                            >
                                <IoIosArrowForward fontSize='3rem' />
                            </Button>
                        </Box>

                    </Box>
                    <Box
                        width='80vw'
                        height='12vh'
                        backgroundColor='#00713C'
                        borderRadius='30px'
                        padding='1.5rem'
                        display='flex'
                        alignItems='center'
                        justifyContent='space-between'
                        color='white'
                    >
                        <Button
                            border='none'
                            bg='transparent'
                            h='70'
                            _hover={{ bg: 'transparent' }}
                            onClick={PrevHora}
                        >
                            <IoIosArrowBack fontSize='2rem' />
                        </Button>
                        <Box
                            opacity='0.8'
                            filter='blur(2px)'
                        >
                            <Center>
                                <Text fontSize='2xl'>{horario[horai1]}</Text>
                            </Center>
                        </Box>
                        <Box>
                            <Center>
                                <Text fontSize='5xl'>{horario[horai2]}</Text>
                            </Center>
                        </Box>
                        <Box
                            opacity='0.8'
                            filter='blur(2px)'
                        >
                            <Center>
                                <Text fontSize='2xl'>{horario[horai3]}</Text>
                            </Center>
                        </Box>
                        <Button
                            border='none'
                            bg='transparent'
                            h='70'
                            _hover={{ bg: 'transparent' }}
                            onClick={NextHora}
                        >
                            <IoIosArrowForward fontSize='2rem' />
                        </Button>
                    </Box>
                    <Box>
                        <Button
                            size='xl'
                            height='7vh'
                            width='80vw'
                            borderRadius='40px'
                            border='2px solid #00713C'
                            bg='#00713C'
                            _hover={{ bg: '#00A853', border: '2px solid #00A853', color: '#01532C' }}
                            color='white'
                            fontSize='2rem'
                            onClick={salvar}
                        >
                            Confirmar
                        </Button>
                    </Box>
                </Flex>
            </Container>
            <Modal
                isCentered isOpen={isOpen}
                onClose={onClose}
            >
                {overlay}
                <ModalContent
                    display={'flex'}
                    alignItems={'center'}
                    bg='transparent'
                    boxShadow={'none'}
                >
                    <Spinner
                        thickness='1.5rem'
                        speed='0.65s'
                        emptyColor='gray.200'
                        color='green.700'
                        size='xl'
                        h='15rem'
                        w='15rem'
                    />
                </ModalContent>
            </Modal>
        </>

    )
}