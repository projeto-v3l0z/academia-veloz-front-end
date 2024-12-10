'use client';
import React, { useEffect, useState } from 'react';
import { Box, Typography } from '@mui/material';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import Image from 'next/image';
import { styled } from '@mui/material/styles';
import { IconArrowLeft, IconArrowRight } from '@tabler/icons-react';
import './carousel.css';
import { useTheme } from '@mui/material/styles';
import winnerService from '@/services/winnerService';

function SampleNextArrow(props) {
  const { className, onClick } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={className}
      sx={{
        cursor: 'pointer',
        position: 'absolute',
        top: { xs: 'unset ', sm: '-100px' },
        bottom: { xs: '-60px', sm: 'unset' },
        right: 0,
        backgroundColor: (theme) => theme.palette.grey[100],
        width: '48px',
        height: '48px',
        borderRadius: '50%',
      }}
      onClick={onClick}
    >
      <IconArrowRight />
    </Box>
  );
}

function SamplePrevArrow(props) {
  const { className, onClick } = props;
  return (
    <Box
      display="flex"
      alignItems="center"
      justifyContent="center"
      className={className}
      sx={{
        cursor: 'pointer',
        position: 'absolute',
        top: { xs: 'unset ', sm: '-100px' },
        bottom: { xs: '-60px', sm: 'unset' },
        right: '60px',
        backgroundColor: (theme) => theme.palette.grey[100],
        width: '48px',
        height: '48px',
        borderRadius: '50%',
      }}
      onClick={onClick}
    >
      <IconArrowLeft />
    </Box>
  );
}

const EmblemasShipCarousel = ({ emblemas }) => {
  const theme = useTheme();

  const [isLoading, setLoading] = useState(true);
  const [winners, setWinners] = useState([]);
  const [settings, setSettings] = useState({
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    className: 'slider variable-width',
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
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  const slideStyle = {
    padding: '0 30px', // Add padding between slides
  };

  const UserBox = styled(Box)(() => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.default : 'white',
    maxWidth: 'calc(250px - 30px)',
    marginLeft: '15px',
    borderRadius: '8px',
    marginTop: '-30px !important',
    boxShadow: '0px 6px 12px rgba(127, 145, 156, 0.12)',
    marginBottom: '10px',
  }));

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        //const response = await winnerService.getWinners(); // Chama o serviço para obter todos os emblemas
        // Mapeia os dados para o formato desejado
        console.log('emblemas', emblemas);
        const formattedWinners = emblemas.map((emblema) => ({
          name: emblema.nome, // Assegure-se de que 'name' existe
          institution: emblema.instituicao.nome || 'Nome Instituição', // Assegure-se de que 'institution' existe
          //evento: emblema.eventos[0].nome || 'Premiação Padrão', // Define um valor padrão se 'award' não existir
          image: emblema.imagem || '/images/default.png', // Um valor padrão para a imagem se não estiver disponível
        }));
        setWinners(formattedWinners);
        if (formattedWinners.length < 4) {
          setSettings({ ...settings, slidesToShow: formattedWinners.length, slidesToScroll: formattedWinners.length });
        }
      } catch (error) {
        setError('Ocorreu um erro ao buscar os emblemas');
      } finally {
        setLoading(false);
      }
    };

    fetchWinners();
  }, []);

  if ( winners.length === 0 ) {
    return (<Typography variant="body1">Nenhum emblema encontrado</Typography>);
  }

  return (
    <Slider {...settings} className="leadership-carousel" style={{ marginLeft: '15px' }}>
      {winners.map((winner, index) => (
        <div style={slideStyle} key={index}>
          <Image
            src={winner.image}
            alt="user-img"
            width={250}
            height={270}
            style={{ borderRadius: '16px', objectFit: 'cover' }}
          />
          <UserBox
            bgcolor="white"
            px="10px"
            py="16px"
            textAlign="center"
            position="relative"
            zIndex="1"
          >
            <Typography variant="h5" mb={1}>
              {winner.name}
            </Typography>
            <Typography variant="body1">Instituição: {winner.institution}</Typography>
          </UserBox>
        </div>
      ))}
    </Slider>
  );
};

export default EmblemasShipCarousel;
