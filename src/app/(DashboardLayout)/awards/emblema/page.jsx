'use client';
import * as React from 'react';

// components
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import EmblemsList from '@/app/components/awards/emblems/emblemsList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Emblemas',
  },
];

const EmblemsListPage = () => {
  return (
    <PageContainer title="Emblemas" description="Tabela de emblemas cadastradas">
      {/* breadcrumb */}
      <Breadcrumb title="Emblemas" items={BCrumb} />
      {/* end breadcrumb */}
      <EmblemsList />
    </PageContainer>
  );
};

export default EmblemsListPage;