'use client';
import React from "react";
import { Grid, Typography } from "@mui/material";

const keys = [
    {
        text: 'Número Total de Premiações Realizadas',
        title: '8',
        subtext: 'em 2024',
    },
    {
        text: 'Total de premiados',
        title: '200+',
        subtext: 'pessoas premiadas ao longo dos anos',
    },
    {
        text: 'Mídia Ganha',
        title: '25+',
        isMargin: true,
        subtext: 'artigos e reportagens publicadas sobre os eventos',
    },
    {
        text: 'Crescimento Anual',
        title: '15%',
        isMargin: true,
        subtext: 'de aumento em relação a 2023',
    },
]

const Key = () => {

    const [eventsCount, setEventsCount] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState(null);
    //const []

    React.useEffect(() => {
        const fetchData = async () => {
          try {
            const data = await eventService.getEvents();
            setEventsCount(data.count);
          } catch (err) {
            setError(`Erro ao carregar total de eventos: ${err.message}`);
          } finally {
            setLoading(false);
          }
        };
    
        fetchData();
    }, []);

    return (
        <Grid container spacing={2}>
            {keys.map((key, i) => (
                <Grid item xs={6} sm={6} key={i} sx={{
                    marginTop: {
                        lg: key.isMargin ? '32px' : 0
                    }
                }}>
                    <Typography color="primary.main" textTransform="uppercase" fontSize="13px">{key.text}</Typography>
                    <Typography variant="h4" sx={{
                        fontSize: {
                            xs: '34px', sm: '48px'
                        }
                    }} my={1} lineHeight={1} fontWeight={700} >{key.title}</Typography>
                    <Typography variant="body1">{key.subtext}</Typography>
                </Grid>
            ))}

        </Grid>
    );
};

export default Key;
