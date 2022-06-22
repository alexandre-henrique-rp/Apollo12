import React from "react";
import { useEffect, useRef, useState } from 'react';
import swal from 'sweetalert';
import { Box, Button, chakra, Flex, Heading, Input, InputGroup, InputLeftElement, Modal, ModalContent, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react';
import { mask, unMask } from 'remask';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useNavigate } from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer';
import { IoMdClose } from "react-icons/io";
import { BsFillCalendar2WeekFill } from "react-icons/bs";



export default function DATANASC() {

    const nanvigate = useNavigate();
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
            "datanscimento": inputVal
        });
        keyboard.current.setInput(inputVal);
    };

   

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

    


    function salvarCNPJ() {
        const dtNs = inputs.datanscimento;
        const dia = dtNs.substring(0, 2);
        const mes = dtNs.substring(2, 4);
        const ano = dtNs.substring(4, 10);
        const dataNascimento1 = ano + "-" + mes + "-" + dia;
        const dataNascimento2 = dia + "-" + mes + "-" + ano;

        if (dtNs === '' || dtNs === undefined) {
            swal({
                icon: "error",
                text: "Preencha o campos",
                dangerMode: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
            });

        } else if (dia >= 32) {
            swal({
                icon: "error",
                text: "Data de Nacimento invalida, por favor revise o que foi digitado",
                dangerMode: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
            });
        } else if (mes >= 13) {
            swal({
                icon: "error",
                text: "Data de Nacimento invalida, por favor revise o que foi digitado",
                dangerMode: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
            });
        } else if (ano <= 1900) {
            swal({
                icon: "error",
                text: "Data de Nacimento invalida, por favor revise o que foi digitado",
                dangerMode: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
            });
        } else {
            onOpen()
            
            localStorage.setItem('dtNs', dataNascimento1);
            localStorage.setItem('dtNsV', dataNascimento2);
            setTimeout(() => {
                nanvigate('/07');
            }, 100);
        }
    }

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
                            mb={8}
                        >
                            Data de Nascimento
                        </Heading>
                        <chakra.p
                            fontSize='2xl'
                            px={4}
                            textAlign='center'
                        >
                            Imforme sua data de nascimento seguindo o exemplo: {' '}
                            <chakra.span
                                fontWeight={600}
                            >
                                dd/mm/aaaa (ex: 01/01/2000)
                            </chakra.span>
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
                                <BsFillCalendar2WeekFill
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
                                placeholder='DATA DE NASCIMENTO'
                                _placeholder={{
                                    fontSize: '4xl',
                                }}
                                fontSize='4xl'
                                textAlign='center'
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
                mt={36}
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
                                "7 8 9",
                                "4 5 6",
                                "1 2 3",
                                " 0 "
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