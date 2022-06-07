import React from "react";
import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Modal, ModalContent, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import { GoPerson } from "react-icons/go";
import { FaIdCard, FaIdCardAlt } from "react-icons/fa";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { GiFactory } from "react-icons/gi";
import { useEffect, useState, useRef } from "react";
import { mask, unMask } from 'remask';
import { cpf, cnpj } from 'cpf-cnpj-validator';
import swal from 'sweetalert';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from 'react-idle-timer';
import { IoMdClose } from "react-icons/io";




export default function A1PJ() {

    const nanvigate = useNavigate();
    const [cpfCliente, setCpfCliente] = useState('');
    const [rgCliente, setRgClienete] = useState('');
    const [nomeCliente, setNomeCliente] = useState('');
    const [dataNascimentoCli, setDataNascimentoCli] = useState('');
    const [cnpjCliente, setCnpjCliente] = useState('');
    const [show, setShow] = useState(false);
    const [inputs, setInputs] = useState({});
    const [inputName, setInputName] = useState("default");
    const keyboard = useRef();
    const timeout = 2 * 60 * 1000;


    useEffect(() => {
        setOverlay(<OverlayOne />);
        setTimeout(() => {
            nanvigate('/')
        }, 900000);
    }, [])

    const OverlayOne = () => (
        <ModalOverlay
            bg='greem.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

    useEffect(() => {
        console.log("inputsss", inputs);
    }, [inputs]);

    const onChangeAll = (inputs) => {
        console.log("Inputs changed", inputs);
        setInputs(inputs);
    };

    const onChangeClear = (inputName) => {
        const inputVal = '';
        setInputs({
            ...inputs,
            [inputName]: inputVal
        });
        keyboard.current.setInput(inputVal);
    };

    const onChangeInput = (event) => {
        const inputVal = event.target.value;

        setInputs({
            ...inputs,
            [inputName]: inputVal
        });

        keyboard.current.setInput(inputVal);
    };

    useEffect(() => {
        const cpf = inputs.cpf;
        setCpfCliente(cpf)
        const rg = inputs.rg;
        setRgClienete(rg)
        const nome = inputs.nome;
        setNomeCliente(nome)
        const dataNascimento = inputs.datanscimento;
        setDataNascimentoCli(dataNascimento)
        const cnpj = inputs.cnpj;
        setCnpjCliente(cnpj)
    }, [inputs])

    const valid = cpf.isValid(cpfCliente);
    const validCnpj = cnpj.isValid(cnpjCliente);

    const send = () => {

        if (cpfCliente === '' || rgCliente === '' || nomeCliente === '' || dataNascimentoCli === '' || cnpjCliente === '') {
            swal({
                icon: "error",
                text: "Preencha todos os campos",
                dangerMode: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
            });

        } else if (cpfCliente.length < 10) {
            swal({
                icon: "error",
                text: "Campo CPF imcompleto",
                dangerMode: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
            });
        } else if (valid === false) {
            swal({
                icon: "error",
                text: "CPF não existe",
                dangerMode: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
            });
        } else if (rgCliente.length < 9) {
            swal({
                icon: "error",
                text: "Campo RG imcompleto",
                dangerMode: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
            });
        } else if (cnpjCliente.length < 13) {
            swal({
                icon: "error",
                text: "Campo CNPJ imcompleto",
                dangerMode: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
            });
        } else if (validCnpj === false) {
            swal({
                icon: "error",
                text: "CNPJ não existe",
                dangerMode: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
            });
        } else {
            onOpen()
            localStorage.setItem('cpf', cpfCliente);
            localStorage.setItem('rg', rgCliente);
            localStorage.setItem('nome', nomeCliente);
            localStorage.setItem('dtNs', dataNascimentoCli);
            localStorage.setItem('cnpj', cnpjCliente);
            setTimeout(() => {
                nanvigate('/agenda');
            }, 250);
        }
    }

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
        <>
            <Flex
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                w='95%'

                gap={5}
            >

                <Box
                    mt={48}
                    display='flex'
                    justifyContent='center'
                    alignItems='center'
                >
                    <InputGroup>
                        <InputLeftElement
                            height='65px'
                            fontSize='3rem'
                            paddingLeft='0.3rem'
                            marginRight='1rem'
                        ><GoPerson /></InputLeftElement>
                        <Input
                            height='65px'
                            type='text'
                            placeholder='NOME COMPLETO'
                            fontSize='1.5rem'
                            _placeholder={{ fontSize: '2rem' }}
                            paddingLeft='4rem'
                            borderColor='#00713c'
                            focusBorderColor='none'
                            textAlign={'center'}
                            value={(() => {
                                const valei = inputs.nome === undefined ? '' : inputs.nome;
                                return valei;
                            })()}
                            onChange={onChangeInput}
                            onFocus={() => {
                                setShow(true)
                                setInputName("nome");
                            }}
                        />
                    </InputGroup>
                    <Button
                        ms={4}
                        bg='red.700'
                        rounded='full'
                        w="4.5rem"
                        h="4.5rem"
                        onClick={(() => {
                            setInputs({ ...inputs, nome: '' });
                        })}
                    >
                        <IoMdClose
                            color='white'
                            fontWeight={900}
                            size='8rem'
                        />
                    </Button>
                </Box>
                <Flex>
                    <InputGroup>
                        <InputLeftElement
                            height='65px'
                            fontSize='3rem'
                            paddingLeft='0.3rem'
                            marginRight='1rem'
                        ><FaIdCardAlt /></InputLeftElement>
                        <Input
                            width='600px'
                            height='65px'
                            type='text'
                            fontSize='3rem'
                            _placeholder={{ fontSize: '2rem', height: '65px' }}
                            paddingLeft='4rem'
                            placeholder='RG + ORGÂO EMISOR'
                            borderColor='#00713c'
                            focusBorderColor='none'
                            textAlign={'center'}
                            maxLength={14}
                            value={(() => {
                                const valei = inputs.rg === undefined ? '' : inputs.rg;
                                return valei;
                            })()}
                            onChange={onChangeInput}
                            onFocus={() => {
                                setShow(true)
                                setInputName("rg");
                            }}
                        />
                    </InputGroup>
                    <Button
                        ms={4}
                        bg='red.700'
                        rounded='full'
                        w="4.5rem"
                        h="4.5rem"
                        onClick={onChangeClear}
                    >
                        <IoMdClose
                            color='white'
                            fontWeight={900}
                            size='8rem'
                        />
                    </Button>
                </Flex>
                <Flex>
                    <InputGroup>
                        <InputLeftElement
                            height='65px'
                            fontSize='3rem'
                            paddingLeft='0.3rem'
                            marginRight='1rem'
                        ><FaIdCard /></InputLeftElement>
                        <Input
                            width='600px'
                            height='65px'
                            type='text'
                            fontSize='3rem'
                            _placeholder={{ fontSize: '2rem', height: '65px' }}
                            paddingLeft='4rem'
                            placeholder='CPF'
                            borderColor='#00713c'
                            focusBorderColor='none'
                            textAlign={'center'}
                            maxLength={12}
                            value={(() => {
                                const valei = inputs.cpf === undefined ? '' : inputs.cpf;
                                const originalVelue = unMask(valei);
                                const maskedValue = mask(originalVelue, ["999.999.999-99"]);
                                return maskedValue;
                            })()}
                            onChange={onChangeInput}
                            onFocus={() => {
                                setShow(true)
                                setInputName("cpf");
                            }}
                        />
                    </InputGroup>
                    <Button
                        ms={4}
                        bg='red.700'
                        rounded='full'
                        w="4.5rem"
                        h="4.5rem"
                        onClick={onChangeClear}
                    >
                        <IoMdClose
                            color='white'
                            fontWeight={900}
                            size='8rem'
                        />
                    </Button>
                </Flex>
                <Flex>
                    <InputGroup>
                        <InputLeftElement
                            height='65px'
                            fontSize='3rem'
                            paddingLeft='0.3rem'
                            marginRight='1rem'
                        ><BsFillCalendar2WeekFill /></InputLeftElement>
                        <Input
                            width='600px'
                            height='65px'
                            type='text'
                            fontSize='3rem'
                            _placeholder={{ fontSize: '2rem', height: '65px' }}
                            paddingLeft='4rem'
                            placeholder='DATA DE NASCIMENTO'
                            borderColor='#00713c'
                            focusBorderColor='none'
                            textAlign={'center'}
                            maxLength={8}
                            value={(() => {
                                const valei = inputs.datanscimento === undefined ? '' : inputs.datanscimento;
                                const originalVelue = unMask(valei);
                                const maskedValue = mask(originalVelue, ["99/99/9999"]);
                                return maskedValue;
                            })()}
                            onChange={onChangeInput}
                            onFocus={() => {
                                setShow(true)
                                setInputName("datanscimento");
                            }}
                        />
                    </InputGroup>
                    <Button
                        ms={4}
                        bg='red.700'
                        rounded='full'
                        w="4.5rem"
                        h="4.5rem"
                        onClick={onChangeClear}
                    >
                        <IoMdClose
                            color='white'
                            fontWeight={900}
                            size='8rem'
                        />
                    </Button>
                </Flex>
                <Flex>
                    <InputGroup>
                        <InputLeftElement
                            height='65px'
                            fontSize='3rem'
                            paddingLeft='0.3rem'
                            marginRight='1rem'

                        ><GiFactory /></InputLeftElement>
                        <Input
                            width='600px'
                            height='65px'
                            type='text'
                            fontSize='3rem'
                            _placeholder={{ fontSize: '2rem', height: '65px' }}
                            paddingLeft='4rem'
                            placeholder='CNPJ'
                            borderColor='#00713c'
                            focusBorderColor='none'
                            textAlign={'center'}
                            maxLength={14}
                            value={(() => {
                                const valei = inputs.cnpj === undefined ? '' : inputs.cnpj;
                                const originalVelue = unMask(valei);
                                const maskedValue = mask(originalVelue, ["99.999.999/9999-99"]);
                                return maskedValue;
                            })()}
                            onChange={onChangeInput}
                            onFocus={() => {
                                setShow(true)
                                setInputName("cnpj")
                            }}
                        />
                    </InputGroup>
                    <Button
                        ms={4}
                        bg='red.700'
                        rounded='full'
                        w="4.5rem"
                        h="4.5rem"
                        onClick={onChangeClear}
                    >
                        <IoMdClose
                            color='white'
                            fontWeight={900}
                            size='8rem'
                        />
                    </Button>
                </Flex>

                <Flex
                    justifyContent='center'
                >
                    <Button
                        size='xl'
                        height='70px'
                        width='300px'
                        border='2px'
                        borderColor='#00713c'
                        borderRadius='30px'
                        colorScheme='#00713c'
                        backgroundColor={'#00713c'}
                        fontSize='3rem'
                        onClick={send}
                    >
                        Registrar
                    </Button>
                </Flex>

                <Flex
                    mt={12}
                    justifyContent='center'
                    w='100vw'
                    h='15rm'
                >
                    {show && (
                        <Keyboard
                            keyboardRef={(r) => (keyboard.current = r)}
                            theme={"hg-theme-default myTheme1"}
                            onChangeAll={onChangeAll}
                            inputName={inputName}
                            layout={{
                                default: [
                                    "1 2 3 4 5 6 7 8 9 0 ",
                                    "Q W E R T Y U I O P",
                                    'A S D F G H J K L',
                                    "Z X C V B N M ",
                                    "{space}"
                                ]
                            }}
                        />
                    )}
                </Flex>
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

        </>
    )
}