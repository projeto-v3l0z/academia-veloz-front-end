'use client';
import * as React from 'react';

// components
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import ModulesList from '@/app/components/apps/modules/modulesList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Modulos',
  },
];

const CoursesListPage = () => {
  return (
    <PageContainer title="Modulos" description="Modulos dos cursos">
      {/* breadcrumb */}
      <Breadcrumb title="Modulos" items={BCrumb} />
      {/* end breadcrumb */}
      <ModulesList />
    </PageContainer>
  );
};

export default CoursesListPage;
