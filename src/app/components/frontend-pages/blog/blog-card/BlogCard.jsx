'use client';
import React, { FC } from "react";
import Image from "next/image";
import { format } from "date-fns";
import Link from "next/link";
import BlankCard from "../../../shared/BlankCard";
import NextLink from 'next/link';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { IconEye, IconMessage2, IconPoint } from '@tabler/icons-react';
import { useTheme } from "@mui/material/styles";

const BlogCard = ({ blog }) => {

    const theme = useTheme();
    console.log(blog);

    const { title, coverImage, excerpt, date, slug, author, authorImage, views, comments, category } = blog;
    return (
        <>
            <BlankCard className="hoverCard">
                <>
                    <Typography
                        component={NextLink}
                        href={`/home/eventos/${blog.id}`}
                    >
                        <CardMedia component="img" height="240" image={`https://api-badge.v3l0z.com.br/${blog.fotos[0]?.imagem}`} alt={`Imagem do evento ${blog.nome}`} />
                    </Typography>
                    <CardContent>
                        <Box my={3}>
                            <Typography
                                gutterBottom
                                variant="h5"
                                color="inherit"
                                sx={{ textDecoration: 'none' }}
                                component={NextLink}
                                href={`/home/eventos/${blog.id}`}
                            >
                                {blog.nome}
                            </Typography>
                        </Box>
                        <Stack direction="row" gap={3} alignItems="center">
                            <Stack direction="row" ml="auto" alignItems="center">
                                <IconPoint size="16" />
                                <small>{format(new Date(blog.data), "dd MMM yyyy")}</small>
                            </Stack>
                        </Stack>
                    </CardContent>

                </>
            </BlankCard>

            {/* <div className="group mb-10 relative">
                <div className="mb-8 overflow-hidden rounded">
                    <Link href={`/frontend-pages/blog/${slug}`} aria-label="blog cover" className="block">
                        <Image
                            src={coverImage}
                            alt="image"
                            className="w-full transition group-hover:scale-125"
                            width={408}
                            height={272}
                            style={{ width: 'auto', height: 'auto' }}
                            quality={100}
                        />
                    </Link>
                </div>
                <div className="absolute top-0 bg-primary py-2 ml-4 mt-4 px-5 rounded">
                    <span className="text-white font-medium text-14">
                        Pricing
                    </span>
                </div>
                <div>
                    <h3>
                        <Link
                            href={`/frontend-pages/blog/${slug}`}
                            className="mb-4 inline-block font-semibold text-dark text-black hover:text-primary dark:text-white dark:hover:text-primary text-22"
                        >
                            {title}
                        </Link>
                    </h3>
                    <span className="text-14 font-semibold leading-loose text-SereneGray">
                        {format(new Date(date), "dd MMM yyyy")}
                    </span>
                </div>
            </div> */}
        </>
    );
};

export default BlogCard;
