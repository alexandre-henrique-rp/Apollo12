import React from "react";
import { Button, Flex } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export default function Intro() {

    const nanvigate = useNavigate();

    function handleClick() {
        nanvigate("/01");
    }


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