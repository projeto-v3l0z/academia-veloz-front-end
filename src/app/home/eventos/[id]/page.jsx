'use client';
import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import BlankCard from "@/app/components/shared/BlankCard";
//import { getAllPosts, getPostBySlug } from "@/utils/markdown";
//import markdownToHtml from "@/utils/markdownToHtml";
import { CardContent, Container, Divider } from "@mui/material";
import { format } from "date-fns";
import Image from "next/image";
import Link from "next/link";
import Slider from "react-slick";
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import { IconEye, IconMessage2, IconPoint, IconQuote } from '@tabler/icons-react';
import PageContainer from '@/app/components/container/PageContainer';
import C2a from '@/app/components/frontend-pages/shared/c2a';
import Footer from '@/app/components/frontend-pages/shared/footer';
import ScrollToTop from '@/app/components/frontend-pages/shared/scroll-to-top';
import HeaderAlert from "@/app/components/frontend-pages/shared/header/HeaderAlert";
import HpHeader from "@/app/components/frontend-pages/shared/header/HpHeader";
import Banner from "@/app/components/frontend-pages/blog/banner";
import { styled } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import Eventoship from '@/app/components/frontend-pages/shared/eventosship';
import Fotosship from '@/app/components/frontend-pages/shared/fotosship';

import useEvent from '@/hooks/events/useEvent';


/* export async function generateMetadata({ params }) {
    const posts = getAllPosts(["title", "date", "excerpt", "coverImage", "slug"]);
    const post = getPostBySlug(params.slug, [
        "title",
        "author",
        "content",
        "metadata",
    ]);

    const siteName = process.env.SITE_NAME || "Your Site Name";
    const authorName = process.env.AUTHOR_NAME || "Your Author Name";

    if (post) {
        const metadata = {
            title: `${post.title || "Single Post Page"} | ${siteName}`,
            author: authorName,
            robots: {
                index: true,
                follow: true,
                nocache: true,
                googleBot: {
                    index: true,
                    follow: false,
                    "max-video-preview": -1,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                },
            },
        };

        return metadata;
    } else {
        return {
            title: "Not Found",
            description: "No blog article has been found",
            author: authorName,
            robots: {
                index: false,
                follow: false,
                nocache: false,
                googleBot: {
                    index: false,
                    follow: false,
                    "max-video-preview": -1,
                    "max-image-preview": "large",
                    "max-snippet": -1,
                },
            },
        };
    }
} */

const Post = () => {
    const params = useParams();
    const { id } = params;
    const { loading, error, eventData } = useEvent(id);

    if (loading) return <div>Carregando...</div>;
    if (error) return <div>Erro ao carregar...</div>;

    return (
        <>
            <PageContainer title="Evento" description="Página de detalhes do evento">
                <HpHeader />
                <Banner />
                <Container maxWidth="lg" sx={{
                    my: 4
                }}>
                    <BlankCard>
                        <>
                            <CardMedia component="img" height="440" image={`https://api-badge.v3l0z.com.br/${eventData.fotos[0]?.imagem}`} alt="green iguana" />
                            <CardContent>
                                <Stack direction="row" sx={{ marginTop: '-45px' }}>
                                    <Tooltip title={eventData ? eventData?.nome : ''} placement="top">
                                    </Tooltip>
                                    <Chip
                                        sx={{
                                            marginLeft: 'auto',
                                            marginTop: '-21px',
                                            backgroundColor: 'white',
                                        }}
                                        label={`Evento ${eventData?.nome}`}
                                        size="small"
                                    ></Chip>
                                </Stack>
                                <Chip label={eventData?.nome} size="small" sx={{ marginTop: 5 }}></Chip>
                                <Box my={3}>
                                    <Typography
                                        gutterBottom
                                        variant="h1"
                                        fontWeight={600}
                                        color="inherit"
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        {eventData?.nome}
                                    </Typography>
                                </Box>
                                <Box my={3}>
                                    <Typography
                                        gutterBottom
                                        variant="h3"
                                        fontWeight={400}
                                        color="inherit"
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        {`Intituição: ${eventData?.instituicao.nome}`}
                                    </Typography>
                                </Box>
                                <Stack direction="row" gap={3} alignItems="center">
                                    <Stack direction="row" ml="auto" alignItems="center">
                                        <IconPoint size="16" />
                                        <small>{eventData ? <>{format(new Date(eventData.data), "dd MMM yyyy")}</> : ''}</small>
                                    </Stack>
                                </Stack>
                            </CardContent>
                            <Divider />
                            <Eventoship premiados={eventData.premiados} />
                            <Divider />
                            <Fotosship fotos={eventData.fotos} />
                        </>
                    </BlankCard>
                </Container>
                <Footer />
                <ScrollToTop />
            </PageContainer>
            {/* <PageContainer title="Pricing" description="this is Pricing">

                <HeaderAlert />
                <HpHeader />
                <Banner />
                <Container maxWidth="lg" sx={{
                    my: 4
                }}>
                    <BlankCard>
                        <>
                            <CardMedia component="img" height="440" image={post.coverImage} alt="green iguana" />
                            <CardContent>
                                <Stack direction="row" sx={{ marginTop: '-45px' }}>
                                    <Tooltip title={post ? post?.author : ''} placement="top">
                                        <Avatar aria-label="recipe" src={post.authorImage}></Avatar>
                                    </Tooltip>
                                    <Chip
                                        sx={{
                                            marginLeft: 'auto',
                                            marginTop: '-21px',
                                            backgroundColor: 'white',
                                        }}
                                        label="2 min Read"
                                        size="small"
                                    ></Chip>
                                </Stack>
                                <Chip label={post?.category} size="small" sx={{ marginTop: 2 }}></Chip>
                                <Box my={3}>
                                    <Typography
                                        gutterBottom
                                        variant="h1"
                                        fontWeight={600}
                                        color="inherit"
                                        sx={{ textDecoration: 'none' }}
                                    >
                                        {post?.title}
                                    </Typography>
                                </Box>
                                <Stack direction="row" gap={3} alignItems="center">
                                    <Stack direction="row" gap={1} alignItems="center">
                                        <IconEye size="18" /> {post?.views}
                                    </Stack>
                                    <Stack direction="row" gap={1} alignItems="center">
                                        <IconMessage2 size="18" /> {post?.comments}
                                    </Stack>

                                    <Stack direction="row" ml="auto" alignItems="center">
                                        <IconPoint size="16" />
                                        <small>{post ? <>{format(new Date(post.date), "dd MMM yyyy")}</> : ''}</small>
                                    </Stack>
                                </Stack>
                            </CardContent>
                            <Divider />
                            <CardContent>
                                <div dangerouslySetInnerHTML={{ __html: content }}></div>
                            </CardContent>
                        </>

                    </BlankCard>
                </Container>
                <C2a />
                <Footer />
                <ScrollToTop />
            </PageContainer> */}


        </>
    );
}

export default Post;
