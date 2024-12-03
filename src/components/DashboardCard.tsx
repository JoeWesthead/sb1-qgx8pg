import React, { ReactNode } from 'react';

interface DashboardCardProps {
  title: string;
  children: ReactNode;
}

export function DashboardCard({ title, children }: DashboardCardProps) {
  return (
    <div>
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export default DashboardCard;