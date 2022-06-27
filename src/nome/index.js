import React from "react";
import { useEffect, useRef, useState } from 'react';
import swal from 'sweetalert';
import { Box, Button, chakra, Flex, Heading, Input, InputGroup, InputLeftElement, Modal, ModalContent, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useNavigate } from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer';
import { IoMdClose } from "react-icons/io";
import { GoPerson } from "react-icons/go";
import axios from "axios";




export default function NOME() {

    const nanvigate = useNavigate();
    const [Nome, setNome] = useState('');
    const [inputs, setInputs] = useState({});
    const [show, setShow] = useState(false);
    const [inputName, setInputName] = useState("");
    const keyboard = useRef();
    const timeout = 2 * 60 * 1000;

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

    const onChangeClear = (event) => {
        const inputVal = '';
        setInputs({
            ...inputs,
            "nome": inputVal
        });
        keyboard.current.setInput(inputVal);
    };

    useEffect(() => {
        const Name = inputs.nome === undefined ? '' : inputs.nome;
        setNome(Name)
    }, [inputs])

    const handleOnIdle = () => {
        nanvigate('/01')
        localStorage.clear();
    };

    const { getRemainingTime } = useIdleTimer({
        timeout,
        onIdle: handleOnIdle
    });

    const clienteHttp = axios.create({
        baseURL: "https://totemapi.redebrasilrp.com.br"
    });
    // const clienteHttp = axios.create({
    //     baseURL: 'http://localhost:3040/',
    // });

    const controller = new AbortController();
    function tesetConection() {
        clienteHttp.get("/teste/conexao", {
            timeout: 1000 * 8,
            signal: controller.signal
        })
            .then(function (response) {
                if (response.status !== 200) {
                    controller.abort()
                    console.log("conex fall");
                } else {
                    console.log("esta conectado");
                }
                console.log("esta conectado");
            })
            .catch((e) => {
                console.log('erro de conexão')
                onClose()
                swal({
                    icon: "error",
                    text: "Ops estamos con dificuldade de comunicação com o servider, continue pelo whatsapp, ou lige para (16) 3325-4134",
                    dangerMode: true,
                    closeOnClickOutside: false,
                    closeOnEsc: false,
                });
                setTimeout(() => {
                    nanvigate('/01')
                }, 3 * 1000)
            })

    }
    
    function salvarCNPJ() {
        if (Nome === '') {
            swal({
                icon: "error",
                text: "Preencha o campos",
                dangerMode: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
            });

        } else {
            onOpen()
            localStorage.setItem('nome', Nome);
            setTimeout(() => {
                nanvigate('/05');
            }, 150);
        }
    }

    useEffect(() => {
        getRemainingTime();
        tesetConection()
    }, []);

    return (
        <>
            <Flex
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
                w='95%'
            >
                <Box
                    mt={56}
                    w='100%'
                >
                    <Flex
                        flexDirection='column'
                        alignItems='center'
                        mb={10}
                    >
                        <Heading
                            as='h1'
                            size='2xl'
                            isTruncated
                            mb={4}
                        >
                            Nome Completo
                        </Heading>
                        <chakra.p
                            fontSize='2xl'
                            px={4}
                            textAlign='center'
                        >
                            Imforme seu nome clompleto para continuar

                        </chakra.p>
                    </Flex>
                    <Box
                        display='flex'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <InputGroup>
                            <InputLeftElement
                                pointerEvents='none'
                                mx={4}
                                my={4}
                            >
                                <GoPerson
                                    size='2rem'
                                    color='gray.300'
                                />
                            </InputLeftElement>
                            <Input
                                type='text'
                                h={20}
                                border='5px solid'
                                borderColor='#00a055'
                                rounded={20}
                                _hover={{
                                    borderColor: '#00a055'
                                }}
                                _before={{
                                    borderColor: '#00a055'
                                }}
                                placeholder='Nome completo'
                                _placeholder={{
                                    fontSize: '4xl',
                                }}
                                fontSize='4xl'
                                textAlign='center'
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
                            onClick={onChangeClear}
                        >
                            <IoMdClose
                                color='white'
                                fontWeight={900}
                                size='8rem'
                            />
                        </Button>
                    </Box>
                    <Flex
                        flexDirection='column'
                        justifyContent='center'
                        alignItems='center'
                    >
                        <Button
                            size='xl'
                            height='70px'
                            width='500px'
                            border='2px'
                            borderColor='#00713c'
                            borderRadius='10px'
                            colorScheme='#00713c'
                            backgroundColor={'#00713c'}
                            fontSize='2rem'
                            mt={32}
                            onClick={salvarCNPJ}
                        >
                            Proximo
                        </Button>
                    </Flex>
                </Box>
            </Flex>
            <Flex
                mt={28}
                justifyContent='center'
                w='full'
                h='15rm'
                px={10}
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
                                "A S D F G H J K L",
                                "Z X C V B N M ",
                                "{space}"
                            ]
                        }}
                    />
                )}
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
                        speed='0.85s'
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