'use client';
import * as React from 'react';

// components
import Breadcrumb from '@/app/(DashboardLayout)/layout/shared/breadcrumb/Breadcrumb';
import PageContainer from '@/app/components/container/PageContainer';
import EventsList from '@/app/components/awards/events/EventsList';

const BCrumb = [
  {
    to: '/',
    title: 'Home',
  },
  {
    title: 'Eventos',
  },
];

const EventsListPage = () => {
  return (
    <PageContainer title="Eventos" description="Tabela de eventos cadastrados">
      {/* breadcrumb */}
      <Breadcrumb title="Eventos" items={BCrumb} />
      {/* end breadcrumb */}
      <EventsList />
    </PageContainer>
  );
};

export default EventsListPage;
