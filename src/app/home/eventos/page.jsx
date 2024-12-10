import React from "react";
import BlogList from "../../components/frontend-pages/blog/blog-list/Blog";
import PageContainer from '@/app/components/container/PageContainer';
import HeaderAlert from '../../components/frontend-pages/shared/header/HeaderAlert';
import HpHeader from '../../components/frontend-pages/shared/header/HpHeader';
import C2a from '../../components/frontend-pages/shared/c2a';
import Footer from '../../components/frontend-pages/shared/footer';
import Banner from '../../components/frontend-pages/blog/banner';
import ScrollToTop from '../../components/frontend-pages/shared/scroll-to-top';
import { Box, Container } from "@mui/material";

const BlogPage = () => {

    return (
        <>
            <PageContainer title="Pricing" description="this is Pricing">
                <HpHeader />
                <Banner />
                <Box my={3}>
                    <Container maxWdith="lg">
                        <BlogList />
                    </Container>
                </Box>
                <Footer />
                <ScrollToTop />
            </PageContainer>
        </>
    );
};

export default BlogPage;
