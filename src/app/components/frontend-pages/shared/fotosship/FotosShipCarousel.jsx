'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from "@mui/material";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import Image from "next/image";
import { styled } from "@mui/material/styles";
import { IconArrowLeft, IconArrowRight } from "@tabler/icons-react";
import "./carousel.css"
import { useTheme } from "@mui/material/styles";

function SampleNextArrow(props) {
    const { className, onClick } = props;
    return (
        <Box display="flex" alignItems="center" justifyContent="center"
            className={className}
            sx={{ cursor: 'pointer', position: 'absolute', top: { xs: 'unset ', sm: '-100px' }, bottom: { xs: '-60px', sm: 'unset' }, right: 0, backgroundColor: (theme) => theme.palette.grey[100], width: '48px', height: '48px', borderRadius: '50%' }}
            onClick={onClick}
        >
            <IconArrowRight />
        </Box>
    );
}

function SamplePrevArrow(props) {
    const { className, onClick } = props;
    return (
        <Box display="flex" alignItems="center" justifyContent="center"
            className={className}
            sx={{ cursor: 'pointer', position: 'absolute', top: { xs: 'unset ', sm: '-100px' }, bottom: { xs: '-60px', sm: 'unset' }, right: '60px', backgroundColor: (theme) => theme.palette.grey[100], width: '48px', height: '48px', borderRadius: '50%' }}
            onClick={onClick}
        >
            <IconArrowLeft />
        </Box>
    );
}




const FotosShipCarousel = ( {fotos} ) => {


    const theme = useTheme();

    const [isLoading, setLoading] = useState(true);
    const [winners, setWinners] = useState([]);

    const slideStyle = {
        padding: "0 30px", // Add padding between slides
    };

    const UserBox = styled(Box)(() => ({
        backgroundColor:
        theme.palette.mode === "dark"
            ? theme.palette.background.default
            : "white",
        maxWidth: "calc(100% - 51px)",
        marginLeft: "15px",
        borderRadius: "8px",
        marginTop: "-30px !important",
        boxShadow: "0px 6px 12px rgba(127, 145, 156, 0.12)",
        marginBottom: "10px",
    }));


    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        className: "slider variable-width",
        centerMode: false,
        slidesToScroll: 4,
        nextArrow: <SampleNextArrow />,
        prevArrow: <SamplePrevArrow />,
        responsive: [
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                }
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
    };

    useEffect(() => {
        const fetchWinners = async () => {
            try {
                const formattedWinners = fotos.map((winner) => ({
                    id: winner.id,
                    imagem: winner.imagem || '/images/default.png',
                }));
                console.log("formatado: ",formattedWinners); // Verifique o que está aqui
                setWinners(formattedWinners);
            } catch (error) {
                console.error('Ocorreu um erro ao buscar os premiados', error);
            } finally {
                setLoading(false);
            }
        };
    
        fetchWinners();
    }, [fotos]);

    if (fotos.length === 0) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" height="200px">
                <Typography variant="h6">Sem fotos para mostrar</Typography>
            </Box>
        );
    }
    return (
        <Slider {...settings} className="leadership-carousel" style={{ marginLeft: '15px' }}>
            {winners.map((winner) => (
                <div style={slideStyle} key={winner.id}>
                    <Image src={`https://api-badge.v3l0z.com.br/${winner.imagem}`} alt="user-img" width={270} height={290} style={{ borderRadius: '16px', objectFit: 'cover'}}  />
                </div>
            ))}
        </Slider>
    );
};

export default FotosShipCarousel;
