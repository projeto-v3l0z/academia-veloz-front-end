'use client';
import * as React from 'react';

// components
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import LessonsList from '@/app/components/apps/lessons/lessonsList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Aulas',
  },
];

const LessonsListPage = () => {
  return (
    <PageContainer title="Aulas" description="Aulas dos cursos">
      {/* breadcrumb */}
      <Breadcrumb title="Aulas" items={BCrumb} />
      {/* end breadcrumb */}
      <LessonsList />
    </PageContainer>
  );
};

export default LessonsListPage;
