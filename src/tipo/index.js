import React from "react";
import { Box, Button, Center, Container, Flex, Modal, ModalContent, ModalOverlay, Spinner, useDisclosure } from "@chakra-ui/react";
import Cookies from 'universal-cookie';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";



export default function TipoDeCertificado() {

    const nanvigate = useNavigate();
    const cookies = new Cookies();

    setTimeout(() => {
        nanvigate('/')
    }, 55000);
    
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
        cookies.set('tipoDeCertificado', 'A1PF', { path: '/', expires: new Date(Date.now() + 5000) });
        setTimeout(() => {
            nanvigate('/pf');
        }, 100);
    }

    function pj() {
        onOpen()
        cookies.set('tipoDeCertificado', 'A1PJ', { path: '/', expires: new Date(Date.now() + 5000) });
        setTimeout(() => {
            nanvigate('/pj');
        }, 100);
    }

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