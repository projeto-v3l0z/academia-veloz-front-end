'use client';
import React from 'react';

// components
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import FotoList from '@/app/components/awards/fotos/fotosList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Fotos',
  },
];

const FotoPage = () => {
  
  return (
    <PageContainer title="Fotos" description="Tabela de fotos cadastradas">
      {/* breadcrumb */}
      <Breadcrumb title="Fotos" items={BCrumb} />
      {/* end breadcrumb */}
      <FotoList />
    </PageContainer>
  );
};

export default FotoPage;