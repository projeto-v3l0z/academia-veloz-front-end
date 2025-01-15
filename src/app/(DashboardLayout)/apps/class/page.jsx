'use client';
import * as React from 'react';

// components
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import CoursesList from '@/app/components/apps/courses/coursesList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Cursos',
  },
];

const CoursesListPage = () => {
  return (
    <PageContainer title="Cursos" description="Cursos lançados na plataforma">
      {/* breadcrumb */}
      <Breadcrumb title="Cursos" items={BCrumb} />
      {/* end breadcrumb */}
      <CoursesList />
    </PageContainer>
  );
};

export default CoursesListPage;
