import React from "react";
import { Box, Flex, Heading, Image, Stack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import swal from "sweetalert";

export default function Fim() {

    const nanvigate = useNavigate();

    setTimeout(() => {
        swal({
            title: "Opps...!!",
            text: `Ouve um erro ao conunicar com o servidor de pagamento, um atendente entrara em contato mais tarde via WhatsApp.`,
            icon: "error",
            dangerMode: true,
            buttons: false,
            timer: 7500,
        })
    }, 3000);

    setTimeout(() => {
        nanvigate('/')
    }, 11000);

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
                            fontSize="4xl"
                            fontWeight="semibold"
                            textTransform="uppercase"
                            mb={20}
                        >
                            Agendamento confirmado   
                        </Heading>
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