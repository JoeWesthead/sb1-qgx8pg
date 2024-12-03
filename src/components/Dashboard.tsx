import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import { Users, MessageSquare, Brain, Zap } from 'lucide-react';
import { StatCard } from './StatCard';

const stats = [
  {
    title: 'Total Conversations',
    value: '2,847',
    trend: 12.5,
    icon: MessageSquare
  },
  {
    title: 'Active Users',
    value: '1,423',
    trend: 8.2,
    icon: Users
  },
  {
    title: 'AI Responses',
    value: '14,329',
    trend: 23.1,
    icon: Brain
  },
  {
    title: 'Response Time',
    value: '1.2s',
    trend: -15.4,
    icon: Zap
  }
];

export function Dashboard() {
  return (
    <Box
      component="main"
      sx={{
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
        bgcolor: 'background.default',
        pt: 4,
        pb: 8,
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            color: 'text.primary',
            mb: 1
          }}
        >
          Dashboard Overview
        </Typography>
        <Typography 
          variant="body1" 
          color="text.secondary"
          sx={{ mb: 4 }}
        >
          Monitor your chat performance and user engagement metrics
        </Typography>

        <Grid container spacing={3}>
          {stats.map((stat) => (
            <Grid item xs={12} sm={6} md={3} key={stat.title}>
              <StatCard {...stat} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}