import React from 'react';
import { Box } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';



export default function Protecao() {
    const nanvigate = useNavigate();

    return (
        <Box
            zIndex={1}
            h='100vh'
            w='100vw'
            onClick={() => nanvigate("/01")}
        >
            <video autoPlay loop muted>
                <source src="https://redebrasilrp.com.br/_assets/videos/vt_totem_hd.mp4" type="video/mp4" />
            </video>
        </Box>
    )
}