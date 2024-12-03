import React from 'react';
import { Box, Container, Typography, Skeleton } from '@mui/material';
import { useConfig } from '../context/ConfigContext';

interface BasicPageProps {
  title: string;
}

export function BasicPage({ title }: BasicPageProps) {
  const { isLoading } = useConfig();

  if (isLoading) {
    return (
      <Box sx={{ p: 4 }}>
        <Skeleton variant="text" width={300} height={60} />
        <Skeleton variant="text" width="80%" height={24} />
        <Skeleton variant="rectangular" width="100%" height={400} sx={{ mt: 4 }} />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 4,
        bgcolor: 'background.default',
        minHeight: '100%',
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          sx={{
            fontWeight: 700,
            color: 'text.primary',
            mb: 3
          }}
        >
          {title}
        </Typography>
        <Typography color="text.secondary">
          This page is under construction.
        </Typography>
      </Container>
    </Box>
  );
}