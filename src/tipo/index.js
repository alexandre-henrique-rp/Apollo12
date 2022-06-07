import React from "react";
import { Box, Button, Center, Container, Flex, Modal, ModalContent, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useIdleTimer } from 'react-idle-timer';



export default function TipoDeCertificado() {

    const nanvigate = useNavigate();
   
    const timeout = 2 * 60 * 1000;

    useEffect(() => {
        setOverlay(<OverlayOne />)
    }, [])

    const OverlayOne = () => (
        <ModalOverlay
            bg='greem.300'
            backdropFilter='blur(10px) hue-rotate(90deg)'
        />
    )

    const { isOpen, onOpen, onClose } = useDisclosure()
    const [overlay, setOverlay] = useState(<OverlayOne />)

    function pf() {
        onOpen()
        localStorage.setItem('tipoDeCertificado', 'A1PF')
    
        setTimeout(() => {
            nanvigate('/pf');
        }, 100);
    }

    function pj() {
        onOpen()
        localStorage.setItem('tipoDeCertificado', 'A1PJ');
        
        setTimeout(() => {
            nanvigate('/pj');
        }, 100);
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
            <Container>
                <Flex
                    flexDirection='column'
                    gap={56}
                >
                    <Box>
                        <Center>
                            <Button
                                size='xl'
                                height='100px'
                                width='500px'
                                border='2px'
                                borderColor='#00713c'
                                borderRadius='25px'
                                colorScheme='#00713c'
                                backgroundColor={'#00713c'}
                                fontSize='4rem'
                                onClick={pf}
                            >
                                A1PF
                            </Button>
                        </Center>
                    </Box>

                    <div>
                        <Center>
                            <Button
                                size='xl'
                                height='100px'
                                width='500px'
                                border='2px'
                                borderColor='#00713c'
                                borderRadius='25px'
                                colorScheme='#00713c'
                                backgroundColor={'#00713c'}
                                fontSize='4rem'
                                onClick={pj}
                            >
                                A1PJ
                            </Button>
                        </Center>
                    </div>
                </Flex>
            </Container>
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