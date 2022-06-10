import React from "react";
import { Box, Button, Flex, FormControl, FormHelperText, Input, InputGroup, InputLeftElement, Modal, ModalContent, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import { GoPerson } from "react-icons/go";
import { FaIdCard, FaIdCardAlt } from "react-icons/fa";
import { BsFillCalendar2WeekFill } from "react-icons/bs";

import { useEffect, useState, useRef } from "react";
import { mask, unMask } from 'remask';
import { cpf } from 'cpf-cnpj-validator';
import swal from 'sweetalert';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from 'react-idle-timer';
import { IoMdClose } from "react-icons/io";



const UseFocus = () => {
    const htmlElRef = useRef(null)
    const setFocus = () => { htmlElRef.current && htmlElRef.current.focus() }
    return [htmlElRef, setFocus]
}


export default function A1PF() {

    const nanvigate = useNavigate();
    const [cpfCliente, setCpfCliente] = useState('');
    const [rgCliente, setRgClienete] = useState('');
    const [nomeCliente, setNomeCliente] = useState('');
    const [dataNascimentoCli, setDataNascimentoCli] = useState('');
    const [show, setShow] = useState(false);
    const [inputs, setInputs] = useState({});
    const [inputName, setInputName] = useState("default");
    const keyboard = useRef();
    const timeout = 2 * 60 * 1000;

    const [nome01, setNome01] = useState('');


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
    }, [inputs])

    const valid = cpf.isValid(cpfCliente);

    const send = () => {

        if (cpfCliente === '' || rgCliente === '' || nomeCliente === '' || dataNascimentoCli === '') {
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
        } else if (rgCliente.length < 7) {
            swal({
                icon: "error",
                text: "Campo RG imcompleto",
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

    const [input1Ref, setInput1Focus] = UseFocus()
    const [input2Ref, setInput2Focus] = UseFocus()
    const [input3Ref, setInput3Focus] = UseFocus()
    const [input4Ref, setInput4Focus] = UseFocus()



    useEffect(() => {

        const valei = inputs.nome === undefined ? '' : inputs.nome;
        setNome01(valei)

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
                        >
                            <GoPerson />
                        </InputLeftElement>
                        <Input
                            width='617px'
                            height='65px'
                            type='text'
                            name="nome-do-cliente"
                            placeholder='NOME COMPLETO'
                            fontSize='1.5rem'
                            _placeholder={{ fontSize: '2rem' }}
                            paddingLeft='4rem'
                            borderColor='#00713c'
                            focusBorderColor='none'
                            textAlign={'center'}
                            ref={input1Ref}
                            value={nomeCliente}
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
                            const onChangeClear4 = () => {
                                if (inputs.nome !== '') {
                                    setInputs({
                                        ...inputs,
                                        nome: ''
                                    });
                                    setNome01('')
                                }

                            };

                            onChangeClear4();
                            setInput1Focus();
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
                        >
                            <FaIdCardAlt />
                        </InputLeftElement>
                        <Input
                            width='617px'
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
                            ref={input2Ref}
                            value={(() => {
                                const valei1 = inputs.rg === undefined ? '' : inputs.rg;
                                const valei = valei1.length > 14 ? valei1.substring(0, 14) : valei1;
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
                        onClick={(() => {
                            const onChangeClear3 = () => {
                                const inputVal = '';
                                setInputs({
                                    ...inputs,
                                    "rg": inputVal
                                });
                                keyboard.current.setInput(inputVal);
                            };
                            onChangeClear3();
                            setInput2Focus();
                        })}
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
                        >
                            <FaIdCard />
                        </InputLeftElement>
                        <Input
                            width='617px'
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
                            ref={input3Ref}
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
                        onClick={(() => {
                            const onChangeClear2 = () => {
                                const inputVal = '';
                                setInputs({
                                    ...inputs,
                                    "cpf": inputVal
                                });
                                keyboard.current.setInput(inputVal);
                            };
                            onChangeClear2();
                            setInput3Focus();
                        })}
                    >
                        <IoMdClose
                            color='white'
                            fontWeight={900}
                            size='8rem'
                        />
                    </Button>
                </Flex>
                <Flex mb={5}>
                    <FormControl>
                        <InputGroup>
                            <InputLeftElement
                                height='65px'
                                fontSize='3rem'
                                paddingLeft='0.3rem'
                                marginRight='1rem'
                            >
                                <BsFillCalendar2WeekFill />
                            </InputLeftElement>
                            <Input
                                width='617px'
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
                                ref={input4Ref}
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
                        <FormHelperText
                            fontSize='xl'
                        >
                            Exemplo DD / MM / AAAA.
                        </FormHelperText>
                    </FormControl>
                    <Button
                        ms={4}
                        bg='red.700'
                        rounded='full'
                        w="4.5rem"
                        h="4.5rem"
                        onClick={(() => {
                            const onChangeClear1 = () => {
                                const inputVal = '';
                                setInputs({
                                    ...inputs,
                                    "datanscimento": inputVal
                                });
                                keyboard.current.setInput(inputVal);
                            };
                            onChangeClear1();
                            setInput4Focus();
                        })}
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
                                    "1 2 3 4 5 6 7 8 9 0",
                                    "Q W E R T Y U I O P",
                                    'A S D F G H J K L',
                                    "Z X C V B N M",
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