import React, { useEffect, useState } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from 'react-idle-timer';
import axios from "axios";


export default function Intro() {

    const [off, setOff] = useState(false)
    const nanvigate = useNavigate();
    const timeout = 40 * 1000;

    function handleClick() {
        nanvigate("/02");
    };

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
                setOff(true)
            })

    }
    const handleOnIdle = () => {
        if (off === false) {
            nanvigate('/')
        } else {
            nanvigate('/01')
        }
    };

    const { getRemainingTime } = useIdleTimer({
        timeout,
        onIdle: handleOnIdle
    });

    useEffect(() => {
        getRemainingTime();
        localStorage.clear();
        tesetConection()
    }, []);

    return (
        <>
            <Flex
                flexDir='column'
                justifyContent='center'
                alignItems='center'
                alignContent='center'
            >

                <Button

                    size='xl'
                    height='70px'
                    width='500px'
                    border='2px solid #00713C'
                    bg='#00713C'
                    _hover={{ bg: '#00A853', border: '2px solid #00A853', color: '#01532C' }}
                    color='white'
                    fontSize='2rem'
                    rounded={20}
                    onClick={handleClick}

                >
                    INICIAR
                </Button>

            </Flex>
        </>
    )
}