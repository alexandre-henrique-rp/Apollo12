import React from "react";
import { Box, Button, Flex, Input, InputGroup, InputLeftElement, Modal, ModalContent, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import { GoPerson } from "react-icons/go";
import { FaIdCard, FaIdCardAlt } from "react-icons/fa";
import { BsFillCalendar2WeekFill } from "react-icons/bs";
import { useEffect, useState, useRef } from "react";
import { mask, unMask } from 'remask';
import { cpf } from 'cpf-cnpj-validator';
import swal from 'sweetalert';
import Cookies from "universal-cookie";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from 'react-idle-timer';




export default function A1PJ() {

    const nanvigate = useNavigate();
    const [cpfClient, setCpfCliente] = useState('');
    const [rg, setRg] = useState('');
    const [nome, setNome] = useState('');
    const [dataNascimento, setDataNascimento] = useState('');
    const [show, setShow] = useState(false);
    const [inputs, setInputs] = useState({});
    const [inputName, setInputName] = useState("default");
    const keyboard = useRef();
    const timeout = 2 * 60 * 1000;

    const cookies = new Cookies();

    useEffect(() => {
        setTimeout(() => {
            nanvigate('/')
        }, 900000);

        setOverlay(<OverlayOne />);
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

    const onChangeInput = (event) => {
        const inputVal = event.target.value;
        setInputs({
            ...inputs,
            [inputName]: inputVal
        });
        keyboard.current.setInput(inputVal);
    };

    useEffect(() => {
        const cpf = inputs.cpf === undefined ? '' : inputs.cpf;
        setCpfCliente(cpf)
        const rg = inputs.rg === undefined ? '' : inputs.rg;
        setRg(rg)
        const nome = inputs.nome === undefined ? '' : inputs.nome;
        setNome(nome)
        const dataNascimento = inputs.datanscimento === undefined ? '' : inputs.datanscimento;
        setDataNascimento(dataNascimento)
    }, [inputs])

    const valid = cpf.isValid(cpfClient);

    const send = () => {

        if (inputs.cpf === '' || rg === '' || nome === '' || dataNascimento === '') {
            swal({
                icon: "error",
                text: "Preencha todos os campos",
                dangerMode: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
            });
        } else if (cpfClient.length < 10) {
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
        } else if (rg.length < 9) {
            swal({
                icon: "error",
                text: "Campo RG imcompleto",
                dangerMode: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
            });
        } else {
            onOpen()
            cookies.set('nome', nome, { path: '/', expires: new Date(Date.now() + 60 * 50000) });
            cookies.set('cpf', cpfClient, { path: '/', expires: new Date(Date.now() + 60 * 50000) });
            cookies.set('rg', rg, { path: '/', expires: new Date(Date.now() + 60 * 50000) });
            cookies.set('dataNascimento', dataNascimento, { path: '/', expires: new Date(Date.now() + 60 * 50000) });
            setTimeout(() => {
                nanvigate('/agenda');
            }, 250);
        }
    }

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
        <>
            <Flex
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                w='100%'

                gap={5}
            >

                <Box
                    mt={56}
                >
                    <InputGroup>
                        <InputLeftElement
                            height='65px'
                            fontSize='3rem'
                            paddingLeft='0.3rem'
                            marginRight='1rem'
                        >
                            <GoPerson />
                        </InputLeftElement>
                        <Input
                            width='600px'
                            height='65px'
                            type='text'
                            placeholder='NOME COMPLETO'
                            fontSize='2rem'
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
                </Box>
                <div>
                    <InputGroup>
                        <InputLeftElement
                            height='65px'
                            fontSize='3rem'
                            paddingLeft='0.3rem'
                            marginRight='1rem'
                        >
                            <FaIdCardAlt />
                        </InputLeftElement>
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
                </div>
                <div>
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
                </div>
                <div>
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
                </div>


                <div>
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
                </div>

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
                                    "1 2 3 4 5 6 7 8 9 0 {bksp}",
                                    "Q W E R T Y U I O P",
                                    'A S D F G H J K L',
                                    "Z X C V B N M {enter}",
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