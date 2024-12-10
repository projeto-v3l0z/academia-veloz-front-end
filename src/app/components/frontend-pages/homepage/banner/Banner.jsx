'use client';
import React from "react";
import { Box, Stack, Typography, AvatarGroup, Avatar, Container, Grid, Button, Link } from "@mui/material";
import useMediaQuery from '@mui/material/useMediaQuery';
import Image from "next/image";
import Tooltip from '@mui/material/Tooltip';

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const Frameworks = [
    {
        name: 'React',
        icon: '/images/frontend-pages/icons/icon-react.svg'
    },
    {
        name: 'Material Ui',
        icon: '/images/frontend-pages/icons/icon-mui.svg'
    },
    {
        name: 'Next.js',
        icon: '/images/frontend-pages/icons/icon-next.svg'
    },
    {
        name: 'Typescript',
        icon: '/images/frontend-pages/icons/icon-ts.svg'
    },
    {
        name: 'Redux',
        icon: '/images/frontend-pages/icons/icon-redux.svg'
    },
    {
        name: 'Tabler Icon',
        icon: '/images/frontend-pages/icons/icon-tabler.svg'
    },
];
const Banner = () => {

    //   sidebar
    const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));

    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Box bgcolor="primary.light" pt={7}>
            <Container sx={{
                maxWidth: '1400px !important', position: "relative"
            }}>
                <Grid container spacing={3} justifyContent="center" mb={4}>
                    <Grid item xs={12} lg={7} textAlign="center">
                        <Typography variant="h1" fontWeight={700} lineHeight="1.2" sx={{
                            fontSize: {
                                xs: '40px', sm: '56px'
                            }
                        }}>Notáveis Premiados: Personalidades de Destaque Reconhecidas pelo<Typography variant="h1" sx={{
                            fontSize: {
                                xs: '40px', sm: '56px'
                            }
                        }} fontWeight={700} component="span" color="primary.main"> Grupo Ser</Typography></Typography>
                    </Grid>
                </Grid>

                {lgUp ? <Image src="/images/frontend-pages/homepage/Awards-pana.svg" alt="banner" width={500} height={300} style={{
                    width: '100%', marginBottom: '-11px'
                }} /> : null}

            </Container>
        </Box>
    );
};

export default Banner;
