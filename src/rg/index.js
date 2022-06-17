import React from "react";
import { useEffect, useRef, useState } from 'react';
import swal from 'sweetalert';
import { Box, Button, chakra, Flex, Heading, Input, InputGroup, InputLeftElement, Modal, ModalContent, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useNavigate } from 'react-router-dom';
import { useIdleTimer } from 'react-idle-timer';
import { IoMdClose } from "react-icons/io";
import { FaIdCardAlt } from "react-icons/fa";



export default function RG() {

    const nanvigate = useNavigate();
    const [Rg, setRg] = useState('');
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
            "rg": inputVal
        });
        keyboard.current.setInput(inputVal);
    };

    useEffect(() => {
        const rg1 = inputs.rg === undefined ? '' : inputs.rg;
        setRg(rg1)
    }, [inputs])

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


    function salvarCPF() {
        if (Rg === '') {
            swal({
                icon: "error",
                text: "Preencha todos os campos",
                dangerMode: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
            });

        } else if (Rg.length < 7) {
            swal({
                icon: "error",
                text: "RG imcompleto",
                dangerMode: true,
                closeOnClickOutside: false,
                closeOnEsc: false,
            });
        }  else {
            onOpen()
            localStorage.setItem('rg', Rg);
            setTimeout(() => {
                nanvigate('/05');
            }, 150);
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
                    mt={72}
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
                            Rg
                        </Heading>
                        <chakra.p
                            fontSize='2xl'
                        >
                            O seu Rg é muito importante para video conferencia
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
                                <FaIdCardAlt
                                    size='2rem'
                                    color='gray.300'
                                />
                            </InputLeftElement>
                            <Input
                                type='text'
                                h={20}
                                placeholder='RG'
                                _placeholder={{
                                    fontSize: '4xl',
                                }}
                                fontSize='4xl'
                                textAlign='center'
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
                            onClick={salvarCPF}
                        >
                            Proximo
                        </Button>
                    </Flex>
                </Box>
            </Flex>
            <Flex
                mt={40}
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