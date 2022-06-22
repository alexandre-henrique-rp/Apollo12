import React from "react";
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import swal from 'sweetalert';
import { Box, Button, chakra, Flex, Heading, Input, InputGroup, InputLeftElement, Modal, ModalContent, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react';
import { ImPhone } from "react-icons/im";
import { mask, unMask } from 'remask';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useNavigate } from 'react-router-dom';
import "./index.css";
import { useIdleTimer } from 'react-idle-timer';
import { IoMdClose } from "react-icons/io";


export default function Telefone() {

    const nanvigate = useNavigate();
    const [telefone, setTelefone] = useState('');
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
            [inputName]: inputVal
        });
        keyboard.current.setInput(inputVal);
    };

    useEffect(() => {
        const telefone = inputs.telefone === undefined ? '' : inputs.telefone;
        setTelefone(telefone)
    }, [inputs])

    function SalvaTel() {
        setOverlay(<OverlayOne />)
        var nuber = 55 + inputs.telefone;
        console.log("nuber", nuber);
        TemZap(nuber);


    }

    function TemZap(nuber) {
        function alerta() {
            swal({
                title: "Opps...!!",
                text: `Parece que o telefone ${inputs.telefone} não tem Watsapp,\n Por favor tente outro telefone`,
                icon: "error",
                dangerMode: true,
            })
        }
        var config = {
            method: 'post',
            url: `https://api.zapstar.com.br/core/v2/api/wa-number-check/${nuber}`,
            headers: {
                'access-token': '60de0c8bb0012f1e6ac5546b'
            }
        };
        axios(config)
            .then(function (response) {
                console.log(JSON.stringify(response.data));
                if (response.data.status === 'VALID_WA_NUMBER') {
                    localStorage.setItem('telefone', telefone);
                    onOpen()
                    Mensagen1(nuber)
                } else {
                    alerta();
                }
            })
            .catch(function (error) {
                console.log(error);
                alerta();
            });
    }

    function Mensagen1(nuber) {
        var myHeaders = new Headers();
        myHeaders.append("access-token", "60de0c8bb0012f1e6ac5546b");
        myHeaders.append("Content-Type", "application/json");

        var msg = 'Ola\n \nTudo bem!\n \nEu sou o *Atendimento Automatizado* da Rede Brasil Rp.\n \nAntes de pasar seu contato para um atendente preciso de algumas informações adicionais\n \n \n*1) Email de contato valido*\n Esse email é o canal onde você vai receber as chaves para baixar seu Certificado!.'

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "number": nuber,
                "message": msg,
                "forceSend": true,
                "verifyContact": true
            }),
            redirect: 'follow'
        };

        fetch("https://api.zapstar.com.br/core/v2/api/chats/send-text", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(() => {
                setTimeout(() => {
                    Mensagen2(nuber)
                }, 800);
            })
            .catch(error => console.log('error', error));
    }

    function Mensagen2(nuber) {
        var myHeaders = new Headers();
        myHeaders.append("access-token", "60de0c8bb0012f1e6ac5546b");
        myHeaders.append("Content-Type", "application/json");


        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: JSON.stringify({
                "number": nuber,
                "forceSend": true,
                "verifyContact": true,
                "linkUrl": "https://redebrasilrp.com.br/_assets/img/cnh_foto.jpeg",
                "extension": ".jpg",
                "base64": "",
                "fileName": "cnh_foto",
                "caption": "*2) Foto da CNH*\n \n a sua CNH é muito importante, para que possamos comparar se o seu dados estão corretos\n \n*Lembrando, mande apenas uma foto, com o documento aberto*.",
            }),
            redirect: 'follow'
        };

        fetch("https://api.zapstar.com.br/core/v2/api/chats/send-media", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .then(() => {
                setTimeout(() => {
                    nanvigate('/03');
                }, 3000);
            })
            .catch(error => console.log('error', error));
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

                        >
                            Infome seu whatsApp !!
                        </Heading>
                        <chakra.p
                            fontSize='2xl'
                        >
                            seu whatsApp é muito importante para video conferencia
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
                                <ImPhone
                                    size='2rem'

                                    color='gray.300'
                                />
                            </InputLeftElement>
                            <Input
                                type='tel'
                                h={20}
                                border='5px solid'
                                borderColor='#00a055'
                                _hover={{
                                    borderColor: '#00a055'
                                }}
                                _before={{
                                    borderColor: '#00a055'
                                }}
                                rounded={20}
                                placeholder='Telefone'
                                _placeholder={{
                                    fontSize: '4xl',
                                }}
                                fontSize='4xl'
                                textAlign='center'
                                value={(() => {
                                    const valei = inputs.telefone === undefined ? '' : inputs.telefone;
                                    const originalVelue = unMask(valei);
                                    const maskedValue = mask(originalVelue, ["(99) 9 9999-9999"]);
                                    return maskedValue;
                                })()}
                                onChange={onChangeInput}
                                onFocus={() => {
                                    setShow(true)
                                    setInputName("telefone");
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
                            onClick={SalvaTel}
                        >
                            Confirmar
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