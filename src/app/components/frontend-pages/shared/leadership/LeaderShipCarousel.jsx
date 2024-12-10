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
import winnerService from '@/services/winnerService';

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




const LeaderShipCarousel = () => {

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
            const response = await winnerService.getWinnersEmblems(); // Chama o serviço para obter todos os premiados
            // Mapeia os dados para o formato desejado
            const formattedWinners = response.results.map((winner) => ({
                name: winner.premiado.nome, // Assegure-se de que 'name' existe
                institution: winner.instituicao.nome || 'Unama', // Assegure-se de que 'institution' existe
                award: winner.emblema.nome || 'Premiação Padrão', // Define um valor padrão se 'award' não existir
                image: winner.premiado.imagem || '/images/default.png', // Um valor padrão para a imagem se não estiver disponível
            }));
            setWinners(formattedWinners);
            } catch (error) {
            setError('Ocorreu um erro ao buscar os premiados');
            } finally {
            setLoading(false);
            }
        };

        fetchWinners();
    }, []);

    return (
        <Slider {...settings} className="leadership-carousel" style={{ marginLeft: '15px' }}>
            {winners.map((winner, index) => (
                <div style={slideStyle} key={index}>
                    <Image src={winner.image} alt="user-img" width={270} height={290} style={{ borderRadius: '16px', objectFit: 'cover'}}  />
                    <UserBox bgcolor="white" px='10px' py='16px' textAlign="center" position="relative" zIndex="1">
                        <Typography variant="h5" mb={1}>{winner.name}</Typography>
                        <Typography variant="body1">Instituição: {winner.institution}</Typography>
                        <Typography variant="body1">Prêmio: {winner.award}</Typography>
                    </UserBox>
                </div>
            ))}
        </Slider>
    );
};

export default LeaderShipCarousel;
