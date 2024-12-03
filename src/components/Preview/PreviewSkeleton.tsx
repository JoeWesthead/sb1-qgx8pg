import React from 'react';
import { Box, Skeleton, Stack } from '@mui/material';

export function PreviewSkeleton() {
  return (
    <Box sx={{ p: 2, height: '100%', display: 'flex', flexDirection: 'column' }}>
      {/* Header Skeleton */}
      <Box sx={{ bgcolor: 'primary.main', p: 2, borderRadius: 1, mb: 2 }}>
        <Skeleton variant="text" width={120} height={24} sx={{ bgcolor: 'primary.light' }} />
        <Skeleton variant="text" width={180} height={20} sx={{ bgcolor: 'primary.light' }} />
      </Box>

      {/* Chat Messages Skeleton */}
      <Stack spacing={2} sx={{ flex: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width={100} height={24} />
            <Skeleton variant="text" width="80%" height={20} />
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1, justifyContent: 'flex-end' }}>
          <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
            <Box sx={{ maxWidth: '80%' }}>
              <Skeleton variant="text" width={150} height={20} />
            </Box>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 1 }}>
          <Skeleton variant="circular" width={40} height={40} />
          <Box sx={{ flex: 1 }}>
            <Skeleton variant="text" width={120} height={24} />
            <Skeleton variant="text" width="60%" height={20} />
          </Box>
        </Box>
      </Stack>

      {/* Input Skeleton */}
      <Box sx={{ mt: 2, borderTop: 1, borderColor: 'divider', pt: 2 }}>
        <Skeleton variant="rectangular" height={40} sx={{ borderRadius: 1 }} />
      </Box>
    </Box>
  );
}