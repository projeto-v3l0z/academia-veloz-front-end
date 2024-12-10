"use client";
import React, { useEffect, useState } from 'react';
import BlogCard from '../blog-card/BlogCard';
//import { getAllPosts } from "@/utils/markdown";
import { Box, Chip, Container, Grid, InputAdornment, Stack, TextField, Typography } from '@mui/material';
import eventService from '@/services/eventService';
import { IconSearch } from '@tabler/icons-react';

const BlogList = () => {

    const [isLoading, setLoading] = useState(true);
    const [eventos, setEventos] = useState([]);
    //const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug", "author", "authorImage", "views", "comments", "category"]);

    const [search, setSearch] = useState('');

    useEffect(() => {
        const fetchEventos = async () => {
            try {
            const response = await eventService.getEvents();
            // Mapeia os dados para o formato desejado
            
            setEventos(response.results);
            } catch (error) {
            setError('Ocorreu um erro ao buscar os eventos');
            } finally {
            setLoading(false);
            }
        };

        fetchEventos();
    }, []);

    const filteredEventos = eventos.filter((evento) => {
        return evento.nome.toLowerCase().includes(search.toLowerCase());
    });

    return (
        <Box>
            <Stack direction="row" alignItems="center" mt={2} mb={3}>
                <Box>
                    <Typography variant="h4" component="h2" sx={{ flexGrow: 1 }}>
                        Eventos &nbsp;
                        <Chip label={eventos?.length} color="primary" size="small" />
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
            <Container maxWidth="lg" sx={{
                mt: 4, mb: 8
            }}>
                <Grid container spacing={3}>
                    {filteredEventos.map((blog, i) => (
                        <Grid item xs={12} lg={4} md={4} sm={6} display="flex" alignItems="stretch" key={i}>
                            <BlogCard blog={blog} />
                        </Grid>
                    ))}
                </Grid>
            </Container >
        </Box>
    );
}

export default BlogList;
