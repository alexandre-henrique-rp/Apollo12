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

import { useNavigate } from "react-router-dom";
import { useIdleTimer } from 'react-idle-timer';

const id = 16






export default function Resumo() {

    const nanvigate = useNavigate();
    const [totem, setTotem] = useState([]);
    const [razaoSocial, setRazaoSocial] = useState('');
    const [Data, setData] = useState('');
    const [Datanasc, setDatanasc] = useState('');
    const timeout = 2 * 60 * 1000;

    const setnome = localStorage.getItem('nome');
    const nome = setnome === undefined ? '' : setnome;
    const setcpf = localStorage.getItem('cpf')
    const cpf = setcpf === undefined ? '' : setcpf;
    const setcnpj = localStorage.getItem('cnpj')
    const cnpj = setcnpj === undefined ? '' : setcnpj;
    const setrg = localStorage.getItem('rg')
    const rg = setrg === undefined ? '' : setrg;
    const setdataNascimento = localStorage.getItem('dtNs')
    const dataNascimento = setdataNascimento === undefined ? '' : setdataNascimento;
    const settelefone = localStorage.getItem('telefone')
    const telefone = settelefone === undefined ? '' : settelefone;
    const settipocd = localStorage.getItem('tipoDeCertificado')
    const tipoCd = settipocd === undefined ? '' : settipocd;
    const setdata = localStorage.getItem('data')
    const dataAg = setdata === undefined ? '' : setdata;
    const sethora = localStorage.getItem('hora')
    const hora = sethora === undefined ? '' : sethora;


    // const clienteHttp = axios.create({
    //     baseURL: 'https://totemapi.redebrasilrp.com.br/',
    // });
    const clienteHttp = axios.create({
        baseURL: 'http://localhost:3040/',
    });

    async function getUsuarios() {
        const response = await clienteHttp.get(`/totem/${id}`);
        console.log(response.data);
        setTotem(response.data);
    }

    
    var cpfMask = cpf.substring(0, 3) + '.' + cpf.substring(3, 6) + '.' + cpf.substring(6, 9) + '-' + cpf.substring(9, 11);
    console.log(cpfMask)
    
    
    
  
    var Diaag1 = Data.substring(8, 10);
    var Diaag = Diaag1.length === 1 ? '0' + Diaag1 : Diaag1;
    var Mesag = Data.substring(5, 7);
    var Anoag = Data.substring(0, 4);
    var DiaNasc1 = Datanasc.substring(0, 2);
    var DiaNasc = DiaNasc1.length === 1 ? '0' + DiaNasc1 : DiaNasc1;
    var MesNasc = Datanasc.substring(2, 4);
    var AnoNasc = Datanasc.substring(4, 8);

    const dataAgendadamento1 = Diaag + "/" + Mesag + "/" + Anoag + "-" + hora;
    const dataAgendadamento = setdata === undefined ? '' : dataAgendadamento1;
    const nasci1 = DiaNasc + "/" + MesNasc + "/" + AnoNasc;
    const nasci = setdataNascimento === undefined ? '' : nasci1;
    
    const dtnascimento = AnoNasc + "-" + MesNasc + "-" + DiaNasc;
    const agend = Anoag + "-" + Mesag + "-" + Diaag;
    const valor = tipoCd === 'A1PF' ? totem.a1pf_12m : totem.a1pj_12m

    const price1 = `R$ ${valor},00`
    const price = valor === undefined ? 'R$ 0,00' : price1

    async function getcnpj() {
        setTimeout(() => {
            onClose()
        }, 50);
        const response = await clienteHttp.get(`/roboscrap/${cnpj}`);
        console.log(response.data);
        setRazaoSocial(response.data);
    }

    console.log(setnome)


    const pagar = () => {
        onOpen()
        registro()
        
    }

    async function registro() {
        return response = await clienteHttp.post(`/cadastrar/cliente`, {
            dt_agenda: agend,
            nome: nome,
            cpf: cpf,
            cnpj: cnpj,
            rg: rg,
            dtnascimento: dtnascimento,
            telefone: telefone,
            tipocd: tipoCd,
            hr_agenda: hora,
            razaosocial: razaoSocial,
            andamento: 'agendado',
            unidade: id,
            valorcd: price,
            estatos_pgto: '',
            obscont: '',
            observacao: ''
        }).then(function (response) {
            console.log(response.data)
            setTimeout(() => {
                nanvigate('/fim');
            }, 1050);
        });
        
    }

    useEffect(() => {
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
        nanvigate('/01')
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
                as='h1'
                size='4xl'
                isTruncated
                textTransform={'uppercase'}
                mb={16}
            >
                Resumo
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
                    <Heading as='h3' size='xl'>{cpfMask}</Heading>
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
                        {cnpj}
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
                justifyContent='flex-end'
                alignItems='center'
            >
               
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