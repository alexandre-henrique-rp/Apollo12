import React from "react";
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';
import swal from 'sweetalert';
import { Box, Button, chakra, Flex, Heading, Input, InputGroup, InputLeftElement, Modal, ModalContent, ModalOverlay, Spinner, useDisclosure } from '@chakra-ui/react';
import { ImPhone } from "react-icons/im";
import { mask, unMask } from 'remask';
import Cookies from 'universal-cookie';
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import { useNavigate } from 'react-router-dom';
import "./index.css";


export default function Telefone() {

    const nanvigate = useNavigate();
    const [telefone, setTelefone] = useState('');
    const [inputs, setInputs] = useState({});
    const [show, setShow] = useState(false);
    const [inputName, setInputName] = useState("");
    const keyboard = useRef();
    const cookies = new Cookies();


    const OverlayOne = () => (
        <ModalOverlay
            bg='greem.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'

        />
    )



    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

    useEffect(() => {
        setTimeout(() => {
            nanvigate('/')
        }, 900000);
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
        const telefone = inputs.telefone === undefined ? '' : inputs.telefone;
        setTelefone(telefone)
    }, [inputs])

    function SalvaTel() {

        setOverlay(<OverlayOne />)

        var nuber = 55 + inputs.telefone;

        function alerta() {
            swal({
                title: "Opps...!!",
                text: `Parece que o telefone ${inputs.telefone} não tem Watsapp,\n Por favor tente outro telefone`,
                icon: "error",
                dangerMode: true,
            })
        }

        function alerta2() {
            swal({
                title: "Opps...!!",
                text: `Parece que o telefone ${inputs.telefone} ja esta em uma coversa,\n Por favor agarde que uma atendente entre em contato`,
                icon: "warning",
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
                    const telM = telefone;
                    cookies.set('telefone', inputs.telefone, { path: '/', expires: new Date(Date.now() + 60 * 50000) });
                    cookies.set('telM', telM, { path: '/', expires: new Date(Date.now() + 60 * 50000) });
                    enviarSms()
                    onOpen()
                    setTimeout(() => {
                        nanvigate('/02');
                    }, 3000);
                } else {
                    alerta();
                }
            })

            .catch(function (error) {
                console.log(error);
                alerta();
            });

        async function enviarSms() {



            var nuber = 55 + inputs.telefone;

            var smsScript = "Ola\n \nTudo bem!\n \nEu sou o *Robo Automatizado* da Rede Brasil Rp.\n \nDaqui ate a hora que o atendente for lhe atender, eu seri responsavel por você."

            const requestOptionsDefault = {
                headers: {
                    "access-token": "60de0c8bb0012f1e6ac5546b",
                    "Content-Type": "application/json"
                },
                redirect: 'follow'
            };

            await axios.post('https://api.zapstar.com.br/core/v2/api/chats/create-new', JSON.stringify({
                "number": nuber,
                "message": smsScript,
                "sectorId": "60de0c8bb0012f1e6ac55473",
                "userId": ""
            }), requestOptionsDefault)
                .then(function (response) {
                    console.log(JSON.stringify(response.data));
                    var url = `https://api.zapstar.com.br/core/v2/api/chats/${JSON.stringify(response.data.chatId)}/send-menu?menuId=62448d08c53044fe45dc60cb`;
                    var myHeaders = new Headers();
                    myHeaders.append("access-token", "60de0c8bb0012f1e6ac5546b");
                    myHeaders.append("Content-Type", "application/json");

                    var requestOptions = {
                        method: 'POST',
                        headers: myHeaders,
                        redirect: 'follow'
                    };

                    fetch(`https://api.zapstar.com.br/core/v2/api/chats/${JSON.stringify(response.data.chatId)}/send-menu?menuId=62448d08c53044fe45dc60cb`, requestOptions)
                        .then(response => response.text())

                })
                .catch(function (error) {
                    console.log(error.message);
                    console.log(nuber)
                    alerta2();
                });
        }

    }




    return (
        <>
            <Flex
                flexDirection='column'
                justifyContent='center'
                alignItems='center'
            >
                <Box
                    mt={72}
                >
                    <Flex
                        flexDirection='column'
                        alignItems='center'
                        mb={10}
                    >
                        <Heading
                            as='h2'
                            size='xl'
                            isTruncated

                        >
                            Infome seu whatsApp !!
                        </Heading>
                        <chakra.p
                            fontSize='xl'
                        >
                            seu whatsApp é muito importante para video conferencia
                        </chakra.p>
                    </Flex>
                    <div>
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
                    </div>
                    <div>
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
                    </div>
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
                                " 0 {bksp}"
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