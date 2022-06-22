import React, { useEffect } from "react";
import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from 'react-idle-timer';


export default function Intro() {

    const nanvigate = useNavigate();
    const timeout = 40 * 1000;

    function handleClick() {
        nanvigate("/02");
    };

    const handleOnIdle = () => {
        nanvigate('/')
    };

    const { getRemainingTime } = useIdleTimer({
        timeout,
        onIdle: handleOnIdle
    });

    useEffect(() => {
        getRemainingTime();
        localStorage.clear();
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