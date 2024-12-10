'use client';
import * as React from 'react';

// components
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import WinnersList from '@/app/components/awards/winners/winnersList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Premiados',
  },
];

const WinnersListPage = () => {
  return (
    <PageContainer title="Premiados" description="Tabela de premiados cadastrados">
      {/* breadcrumb */}
      <Breadcrumb title="Premiados" items={BCrumb} />
      {/* end breadcrumb */}
      <WinnersList />
    </PageContainer>
  );
};

export default WinnersListPage;
