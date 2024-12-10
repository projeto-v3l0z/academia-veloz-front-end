'use client';
import PageContainer from '@/app/components/container/PageContainer';
import HpHeader from '@/app/components/frontend-pages/shared/header/HpHeader';
import Banner from '@/app/components/awards/frontend-pages/winners/banner';
import Footer from '@/app/components/frontend-pages/shared/footer';
import ScrollToTop from '@/app/components/frontend-pages/shared/scroll-to-top';
import useWinner from '@/hooks/winners/useWinner';
import { useParams } from 'next/navigation';
import { CardContent, CardMedia, Container, Divider, Typography } from '@mui/material';
import BlankCard from '@/app/components/shared/BlankCard';
import EmblemaShip from '@/app/components/frontend-pages/shared/emblemasship';

const PremiadoDetail = () => {
  const params = useParams();
  const { id } = params;
  const { loading, erro, winnerData } = useWinner(id);

  console.log('premiadoData', winnerData);

  if (loading) return <div>Carregando...</div>;
  if (erro) return <div>Error ao carregar...</div>;

  return (
    <>
      <PageContainer title="Detalhes do premiado" description="Página de detalhes do premiado">
        <HpHeader />
        <Banner />
        <Container
          maxWidth="lg"
          sx={{
            my: 4,
          }}
        >
          <BlankCard>
            <>
              <CardMedia
                component="img"
                height="440"
                image={`${winnerData.imagem}`}
                alt="imagem do premiado"
              />
              <CardContent>
                <h1>{winnerData.nome}</h1>
                <p>{winnerData.profissao}</p>

                <Divider />

                <EmblemaShip emblemas={winnerData.emblemas} />
              </CardContent>
            </>
          </BlankCard>
        </Container>
        <Footer />
        <ScrollToTop />
      </PageContainer>
    </>
  );
};

export default PremiadoDetail;
