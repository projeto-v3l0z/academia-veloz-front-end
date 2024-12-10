import PageContainer from '@/app/components/container/PageContainer';
import Banner from '../components/frontend-pages/homepage/banner/Banner';
import HpHeader from '../components/frontend-pages/shared/header/HpHeader';
import Features from '../components/frontend-pages/homepage/features/Features';
import DefendFocus from '../components/frontend-pages/homepage/defend-focus';
import Leadership from '../components/frontend-pages/shared/leadership';
import PowerfulDozens from '../components/frontend-pages/homepage/powerful-dozens';
import Reviews from '../components/frontend-pages/shared/reviews';
import ExceptionalFeature from '../components/frontend-pages/homepage/exceptional-feature';
import Pricing from '../components/frontend-pages/shared/pricing';
import FAQ from '../components/frontend-pages/homepage/faq';
import C2a from '../components/frontend-pages/shared/c2a';
import Footer from '../components/frontend-pages/shared/footer';
import ScrollToTop from '../components/frontend-pages/shared/scroll-to-top';
import KeyMetric from '../components/frontend-pages/about/key-metric';

const HomePage = () => {
  return (
    <PageContainer title="Homepage" description="this is Homepage">
      <HpHeader />
      <Banner />
      <KeyMetric />
      <Leadership />
      <Footer />
      <ScrollToTop />
    </PageContainer>
  );
};

export default HomePage;
