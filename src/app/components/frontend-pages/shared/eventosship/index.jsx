'use client';
import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import "slick-carousel/slick/slick.css";

import EventosShipCarousel from "./EventosShipCarousel";
import Contact from "./Contact";

const Eventoship = ({premiados}) => {
    return (
        <>
            <Box sx={{
                py: {
                    xs: 5,
                    lg: 10
                }
            }}>
                <Container maxWidth="lg">
                    <Grid container spacing={3} alignItems="center" mb={6}>
                        <Grid item xs={12} lg={5} sm={8}>
                            <Typography variant="h4" mb={3} sx={{
                                fontSize: {
                                    lg: '40px',
                                    xs: '35px'
                                }
                            }}>Premiados do Evento</Typography>
                            <Typography variant="body1" lineHeight="32px">Homenageados</Typography>
                        </Grid>
                    </Grid>
                    { console.log("Premiados ->",premiados) }
                    
                    { premiados.length > 0 ? (
                        
                        <EventosShipCarousel premiados={premiados}/>
                    ) : (
                        <Typography variant="body1" lineHeight="32px">O evento não possui Homenageados</Typography>
                    )}

                </Container>

            </Box>
        </>
    );
};

export default Eventoship;
