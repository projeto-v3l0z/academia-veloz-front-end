'use client';
import React from 'react';
import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';
import Link from 'next/link';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

export const NavLinks = [
    {
        title: 'Início',
        href: '/home'
    },
    {
        title: 'Eventos',
        href: '/home/eventos'
    },
    {
        title: 'Premiações',
        href: '/home/premios'
    },

    {
        title: 'Dashboard',
        href: '/'
    },
    /* {
        title: 'Sobre',
        href: '/home/sobre'
    }, */
]

const Navigations = () => {

    const router = usePathname()

    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;



    const StyledButton = styled(Button)(({ theme }) => ({
        fontSize: '15px',
        color: theme.palette.text.secondary,
        fontWeight: 500,
        '&.active': {
            backgroundColor: 'rgba(93, 135, 255, 0.15)',
            color: theme.palette.primary.main,
        },
    }));

    return (
        <>

            {NavLinks.map((navlink, i) => (

                <StyledButton color="inherit" component={Link} href={navlink.href} className={router === navlink.href ? 'active' : 'not-active'}
                    variant="text" key={i}>
                    {navlink.title} {navlink.new ?
                        <Chip label="New" size="small" sx={{
                            ml: '6px',
                            borderRadius: '8px',
                            color: 'primary.main',
                            backgroundColor: 'rgba(93, 135, 255, 0.15)'
                        }} />
                        : null}


                </StyledButton>
            ))}



        </>
    );
};

export default Navigations;
