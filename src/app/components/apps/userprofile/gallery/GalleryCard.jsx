"use client";
import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import { IconSearch } from '@tabler/icons-react';
import Image from 'next/image'; // Assuming you're using Next.js
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import FsLightbox from 'fslightbox-react';
import { Chip, Skeleton } from '@mui/material';
import winnerService from '@/services/winnerService';
import NextLink from 'next/link';

const GalleryCard = () => {
  const [search, setSearch] = useState('');
  const [isLoading, setLoading] = useState(true);
  const [toggler, setToggler] = useState(false);
  const [currentImage, setCurrentImage] = useState(null);
  const [currentAwardee, setCurrentAwardee] = useState(null);
  const [error, setError] = useState(null);
  const [winners, setWinners] = useState([]);

  const theme = useTheme();

  useEffect(() => {
    const fetchWinners = async () => {
      try {
        const response = await winnerService.getWinners(); // Chama o serviço para obter todos os premiados
        // Mapeia os dados para o formato desejado
        const formattedWinners = response.results.map((winner) => ({
          id: winner.id,
          name: winner.nome, // Assegure-se de que 'name' existe
          image: winner.imagem || '/images/default.png', // Um valor padrão para a imagem se não estiver disponível
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

  /* const users = [
    {
      name: 'Ministro Edson Fachin',
      institution: 'UNAMA',
      award: 'Honoris Causa',
      image: '/images/frontend-pages/homepage/edson.png',
    },
    {
      name: 'Governador Helder Barbalho',
      institution: 'UNAMA',
      award: 'Honoris Causa',
      image: '/images/frontend-pages/homepage/helder.png',
    },
    {
      name: 'Secretário Jarbas Vasconcelos',
      institution: 'UNAMA',
      award: 'Comenda UNAMA',
      image: '/images/frontend-pages/homepage/jarbas.jpg',
    },
    {
      name: 'Dr. Marcus Augusto Losada',
      institution: 'UNAMA',
      award: 'Comenda UNAMA',
      image: '/images/frontend-pages/homepage/marcus.jpg',
    },
    {
      name: 'Ministro Jader Filho',
      institution: 'UNAMA',
      award: 'Comenda UNAMA',
      image: '/images/frontend-pages/homepage/jader.jpg',
    },
  ]; */

  const filteredUsers = winners?.filter((user) =>
    user.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);
    return () => clearTimeout(timer);
  }, []);

  const openLightbox = (image, award) => {
    setCurrentImage(image);
    setCurrentAwardee(award);
    setToggler(!toggler);

  };

  const slideStyle = {
    padding: '0 30px', // Add padding between slides
  };

  const UserBox = styled(Box)(() => ({
    backgroundColor:
      theme.palette.mode === 'dark'
        ? theme.palette.background.default
        : 'white',
    maxWidth: 'calc(100% - 51px)',
    marginLeft: '-5px',
    borderRadius: '8px',
    marginTop: '-30px !important',
    boxShadow: '0px 6px 12px rgba(127, 145, 156, 0.12)',
    marginBottom: '10px',
  }));

  return (
    <Box>
      <Stack direction="row" alignItems="center" mt={2} mb={3}>
        <Box>
          <Typography variant="h3">
            Premiados &nbsp;
            <Chip label={filteredUsers?.length} color="primary" size="small" />
          </Typography>
        </Box>
        <Box ml="auto">
          <TextField
            id="outlined-search"
            placeholder="Procurar"
            size="small"
            type="search"
            variant="outlined"
            inputProps={{ 'aria-label': 'Search Users' }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconSearch size="14" />
                </InputAdornment>
              ),
            }}
            fullWidth
            onChange={(e) => setSearch(e.target.value)}
          />
        </Box>
      </Stack>
      <Grid container spacing={3} mt={3}>
        {filteredUsers?.map((user, index) => (
          <Grid item xs={12} lg={4} style={slideStyle} key={index}>
            {isLoading ? (
              <Skeleton
                variant="rectangular"
                animation="wave"
                width={270}
                height={290}
              />
            ) : (
              <Image
                src={user.image}
                alt="user-img"
                width={270}
                height={290}
                style={{ borderRadius: '16px', objectFit: 'cover' }}
                onClick={() => openLightbox(user.image, user.award)}
              />
            )}
            <UserBox
              bgcolor="white"
              px="10px"
              py="16px"
              textAlign="center"
              position="relative"
              zIndex="1"
            >
              <Typography
                gutterBottom
                color="inherit"
                component={NextLink}
                href={`/home/premios/${user.id}`}
                sx={{ textDecoration: 'none' }}
              >
                <Typography variant="h5" mb={1}>
                  {user.name}
                </Typography>
              </Typography>
            </UserBox>
          </Grid>
        ))}
      </Grid>
      <FsLightbox toggler={toggler} sources={[currentImage]} />
    </Box>
  );
};

export default GalleryCard;
