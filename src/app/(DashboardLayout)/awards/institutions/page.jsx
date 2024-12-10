'use client';
import * as React from 'react';

// components
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import InstitutionsList from '@/app/components/awards/institutions/institutionsList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Instituições',
  },
];

const AwardsListPage = () => {
  return (
    <PageContainer title="Instituições" description="Tabela de instituições cadastradas">
      {/* breadcrumb */}
      <Breadcrumb title="Instituições" items={BCrumb} />
      {/* end breadcrumb */}
      <InstitutionsList />
    </PageContainer>
  );
};

export default AwardsListPage;
