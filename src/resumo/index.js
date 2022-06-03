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
    Text,
} from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import Cookies from 'universal-cookie';
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from 'react-idle-timer';

const id = 16
const cookies = new Cookies();





export default function Resumo() {

    const nanvigate = useNavigate();
    const [totem, setTotem] = useState([]);
    const [razaoSocial, setRazaoSocial] = useState('');
    const [Data, setData] = useState('');
    const [Datanasc, setDatanasc] = useState('');
    const timeout = 2 * 60 * 1000;
   
    const setnome = cookies.get('nome')
    const nome = setnome === undefined ? '' : setnome;
    const setcpf = cookies.get('cpf')
    const cpf = setcpf === undefined ? '' : setcpf;
    const setcnpj = cookies.get('cnpj')
    const cnpj = setcnpj === undefined ? '' : setcnpj;
    const setrg = cookies.get('rg')
    const rg = setrg === undefined ? '' : setrg;
    const setdataNascimento = cookies.get('dataNascimento')
    const dataNascimento = setdataNascimento === undefined ? '' : setdataNascimento;
    const settelefone = cookies.get('telefone')
    const telefone = settelefone === undefined ? '' : settelefone;
    const settipocd = cookies.get('tipoDeCertificado')
    const tipoCd = settipocd === undefined ? '' : settipocd;
    const setdata = cookies.get('data')
    const dataAg = setdata === undefined ? '' : setdata;
    const sethora = cookies.get('hora')
    const hora = sethora === undefined ? '' : sethora;
    const setcnpjM = cookies.get('cnpjM')
    const cnpjM = setcnpjM === undefined ? '' : setcnpjM;
    const setcpfM = cookies.get('cpfM')
    const cpfM = setcpfM === undefined ? '' : setcpfM;

    const clienteHttp = axios.create({
        baseURL: 'https://totemapi.redebrasilrp.com.br/',
    });

    function getUsuarios() {
        return clienteHttp.get(`/totem/${id}`).then(function (response) {
            console.log(response.data)
            setTotem(response.data)
        });
    }

    var Diaag = Data && Data.substring(8, 10);
    var Mesag = Data && Data.substring(5, 7);
    var Anoag = Data && Data.substring(0, 4);
    var DiaNasc = Datanasc && Datanasc.substring(8, 10);
    var MesNasc = Datanasc && Datanasc.substring(5, 7);
    var AnoNasc = Datanasc && Datanasc.substring(0, 4);

    const dataAgendadamento1 = Diaag + "/" + Mesag + "/" + Anoag + "-" + hora;
    const dataAgendadamento = setdata === undefined ? '' : dataAgendadamento1;
    const nasci1 = DiaNasc + "/" + MesNasc + "/" + AnoNasc;
    const nasci = setdataNascimento === undefined ? '' : nasci1;
    
    const valor = tipoCd === 'A1PF' ? totem.a1pf_12m : totem.a1pj_12m

    const price1 = `R$ ${valor},00`
    const price = valor === undefined ? 'R$ 0,00' : price1
    
    function getcnpj() {
        setTimeout(() => {
           onClose()
        }, 50);
        return clienteHttp.get(`/roboscrap/${cnpj}`).then(function (response) {
            console.log(response.data)
            setRazaoSocial(response.data)
        });
    }

    console.log(setnome)

    const editar = () => {
        onOpen()
        cookies.remove('nome');
        cookies.remove('cpf');
        cookies.remove('rg');
        cookies.remove('dataNascimento');
        cookies.remove('tipoDeCertificado');
        cookies.remove('data');
        cookies.remove('hora');
        cookies.remove('cnpj');
        cookies.remove('cpfM');
        cookies.remove('cnpjM');
        setTimeout(() => {
            nanvigate('/02');
        }, 250);
    }

    const pagar = () => {
        onOpen()
        cookies.set('nome', nome, { path: '/', expires: new Date(Date.now() + 60 * 50000) }); 
        cookies.set('cpf', cpf, { path: '/', expires: new Date(Date.now()  + 60 * 50000) });
        cookies.set('rg', rg, { path: '/', expires: new Date(Date.now()  + 60 * 50000) });
        cookies.set('dataNascimento', dataNascimento, { path: '/', expires: new Date(Date.now()  + 60 * 50000) });
        cookies.set('tipoDeCertificado', tipoCd, { path: '/', expires: new Date(Date.now()  + 60 * 50000) });
        cookies.set('data', dataAg, { path: '/', expires: new Date(Date.now()  + 60 * 50000) });
        cookies.set('hora', hora, { path: '/', expires: new Date(Date.now()  + 60 * 50000) });
        cookies.set('cnpj', cnpj, { path: '/', expires: new Date(Date.now()  + 60 * 50000) });
        cookies.set('Razao', razaoSocial, { path: '/', expires: new Date(Date.now()  + 60 * 50000) });
        cookies.set('telefone', telefone, { path: '/', expires: new Date(Date.now() + 60 * 50000) });

        
        setTimeout(() => {
            nanvigate('/fim');
        }, 250);
    }
    
    useEffect(() => {
        setTimeout(() => {
            nanvigate('/')
        }, 90000);
        
        setDatanasc(dataNascimento)
        setData(dataAg)
        getUsuarios();
        getcnpj()
        onClose()
    }, [])

    const OverlayOne = () => (
        <ModalOverlay
            bg='greem.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

    const handleOnIdle = () => {
        nanvigate('/')
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
                as='h1'
                size='4xl'
                isTruncated
                textTransform={'uppercase'}
                mb={16}
            >
                Agenda
            </Heading>
            <Flex
                flexDirection='column'
                w='100%'
                px={8}
                pb={12}
                borderBottom='2px solid #ccc'
            >
                <Flex justifyContent='space-between' alignItems='center'>
                    <Text fontSize='2xl'>Certificado:</Text>
                    <Heading as='h3' size='xl'>{tipoCd}</Heading>
                </Flex>
                <Flex justifyContent='space-between' alignItems='center'>
                    <Text fontSize='2xl'>Responsavel:</Text>
                    <Heading
                        as='h3'
                        size='xl'
                        w='30rem'
                        h='auto'
                        textAlign='end'
                    >
                        {nome}
                    </Heading>
                </Flex>
                <Flex justifyContent='space-between' alignItems='center'>
                    <Text fontSize='2xl'>CPF:</Text>
                    <Heading as='h3' size='xl'>{cpfM}</Heading>
                </Flex>
                <Flex justifyContent='space-between' alignItems='center'>
                    <Text fontSize='2xl'>Nascimento:</Text>
                    <Heading as='h3' size='xl'>{nasci}</Heading>
                </Flex>
                <Flex justifyContent='space-between' alignItems='center'>
                    <Text fontSize='2xl'>CNPJ:</Text>
                    <Heading
                        as='h3'
                        size='xl'
                        w='30rem'
                        h='auto'
                        textAlign='end'
                    >
                        {cnpjM}
                    </Heading>
                </Flex>
                <Flex justifyContent='space-between' alignItems='center'>
                    <Text fontSize='2xl'>Razão Social:</Text>
                    <Heading
                        as='h3'
                        size='xl'
                        w='30rem'
                        h='auto'
                        textAlign='end'
                    >
                        {razaoSocial}
                    </Heading>
                </Flex>
                <Flex justifyContent='space-between' alignItems='center'>
                    <Text fontSize='2xl'>Data/Hora:</Text>
                    <Heading as='h3' size='xl'>{dataAgendadamento}</Heading>
                </Flex>
            </Flex>
            <Flex
                w='100%'
                my={10}
                justifyContent='space-around'
                alignItems='center'
            >
                <Heading as='h2' size='3xl'>Total:</Heading>
                <Heading as='h2' size='3xl'>{price}</Heading>
            </Flex>
            <Flex
                w='100%'
                my={6}
                px={8}
                pt={20}
                justifyContent='space-between'
                alignItems='center'
            >
                <Button
                    bg='whatsapp.800'
                    _hover={{ bg: 'whatsapp.900' }}
                    color='white'
                    w={72}
                    h={24}
                    fontSize={56}
                    rounded={40}
                    onClick={editar}
                >
                    EDITAR
                </Button>
                <Button
                    bg='whatsapp.800'
                    _hover={{ bg: 'whatsapp.900' }}
                    color='white'
                    w={72}
                    h={24}
                    fontSize='6xl'
                    rounded={40}
                    onClick={pagar}
                >
                    PAGAR
                </Button>
            </Flex>
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
        </Box>
    )
}