import React from 'react';
import { Box, Skeleton } from '@mui/material';

export function SkeletonLoader() {
  return (
    <Box sx={{ p: 4 }}>
      <Skeleton variant="text" width={300} height={60} />
      <Skeleton variant="text" width="80%" height={24} sx={{ mb: 4 }} />
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="rectangular" width="100%" height={100} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="60%" height={40} />
      </Box>
      <Box sx={{ mb: 4 }}>
        <Skeleton variant="rectangular" width="100%" height={80} sx={{ mb: 2 }} />
        <Skeleton variant="rectangular" width="40%" height={40} />
      </Box>
      <Skeleton variant="rectangular" width="100%" height={200} />
    </Box>
  );
}