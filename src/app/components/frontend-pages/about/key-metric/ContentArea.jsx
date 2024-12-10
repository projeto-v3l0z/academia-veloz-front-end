'use client';
import React from "react";
import { Typography } from "@mui/material";

const ContentArea = () => {

    return (
        <>
            <Typography variant="h1" mb={2} lineHeight={1.4} fontWeight={700} sx={{
                fontSize: {
                    xs: '34px', sm: '40px'
                }
            }}>Premiações</Typography>
            <Typography lineHeight={1.9} >As premiações do Grupo Ser reconhecem e celebram individuos notáveis que se destacaram em suas áreas de atuação. Estas homenagens visam valorizar contribuições excepcionais que promovem avanços na sociedade e inspiram futuras geracões. Cada premiado ė cuidadosamente selecionado por seu impacto e com seu compromisso com a excelência.</Typography>
        </>
    );
};

export default ContentArea;
