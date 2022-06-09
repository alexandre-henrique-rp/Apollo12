import React from "react";
import { Box, chakra, Flex, Heading, Image, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";


export default function Fim() {

    const nanvigate = useNavigate();
    
    localStorage.clear();
    

    // setTimeout(() => {
    //     nanvigate('/01')
    // }, 10 * 1000);

    return (
        <>
            <Flex
                flexDirection='column'
                alignItems='center'
                justifyContent='center'
                w='100%'
            >
                <Flex   
                    align="center"
                    pos="relative"
                    justifyContent='center'
                    boxSize="full"
                >
                    <Stack
                        textAlign="center"
                        alignItems="center"
                        spacing={6}
                    >
                        <Heading
                            fontSize="7xl"
                            fontWeight="semibold"
                            textTransform="uppercase"
                            mb={20}
                        >
                            Parabéns  
                        </Heading>
                        <chakra.span
                            px={10}
                            fontSize="2.75rem"
                            fontWeight="semibold"
                        >
                            Seu agendamento foi efetuado com sucesso!
                        </chakra.span>
                        <chakra.span
                            px={10}
                            fontSize="2.50rem"
                        >
                            Agora só aguardar que um do nossos atendemte entra em conatato.
                        </chakra.span>
                        <Box
                            w={72}
                            h={80}
                            position='relative'
                        >
                            <Image src="https://maquinadecartaohome.files.wordpress.com/2019/04/diferenciais_image_3.png"
                                w='full'
                                h='full'
                            />
                        </Box>
                    </Stack>
                </Flex> 
            </Flex> 
        </>
    )
}