'use client';
import React from "react";
import { Box, Grid, Typography, Container } from "@mui/material";
import "slick-carousel/slick/slick.css";

import EmblemasShipCarousel from "./EmblemasShipCarousel";
import Contact from "./Contact";

const EmblemaShip = ({emblemas}) => {
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
                            }}>Premiações</Typography>
                        </Grid>
                    </Grid>

                    <EmblemasShipCarousel emblemas={emblemas}/>
                </Container>
            </Box>
        </>
    );
};

export default EmblemaShip;
