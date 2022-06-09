import React, { useEffect } from "react";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { IoMdArrowBack, IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router-dom";





export default function Template({ children }) {

    const nanvigate = useNavigate();

    useEffect(() => {
        nanvigate("/01");
    }, []);
    
    
    console.log(window.location.href)
    return (
        <>
            <Box
                p={4}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                bg='#e6e6e6'
                width='100%'
            >
                <Box
                    w={56}
                    h={12}
                >
                    <img src="https://redebrasilrp.com.br/_assets/img/rede-brasil-rp--green.png"
                        alt="Vercel Logo"
                        w='full'
                        h='full'
                    />
                </Box>
                <Flex
                    flexDirection='row'
                    gap={10}
                >
                    <Button
                        width={24}
                        height={16}
                        bg='#00713C'
                        rounded={40}
                        _hover={{ bg: '#00A853', color: '#01532C' }}
                        color='white'
                        onClick={() => window.history.back()}
                    >
                        <IoMdArrowBack fontSize='50' />
                    </Button>
                    <Button
                        width={24}
                        height={16}
                        bg='#00713C'
                        _hover={{ bg: '#00A853', color: '#01532C' }}
                        color='white'
                        rounded={40}
                        onClick={() => nanvigate("/pf")}
                    >
                        <IoMdClose fontSize='50' />
                    </Button>
                </Flex>
            </Box>
            <Box
                w='100%'
                h='86vh'
                display='flex'
                justifyContent='center'
                alignItems='center'
                alignContent='center'
                flexDirection='column'
            >
                {children}
            </Box>
            <Flex

                justifyContent='space-evenly'
                py={6}
                borderTop='1px solid #c7c7c7'
                h='auto'
                w='100%'
            >
                <div>
                    <p>	&copy; 2022 By RedeBrasilRP. All Right Reserved</p>
                </div>
                <div>
                    <Image
                        src="https://redebrasilrp.com.br/_assets/img/rede-brasil-rp--green.png"
                        alt="Vercel Logo"
                        width={36}
                        height={8}
                    />
                </div>
            </Flex>
        </>
    )
}