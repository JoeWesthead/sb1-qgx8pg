import React from 'react';
import { Box, Fade } from '@mui/material';
import { useSettingVisibility } from '../hooks/useSettingVisibility';

interface SettingSectionProps {
  id: string;
  children: React.ReactNode;
}

export function SettingSection({ id, children }: SettingSectionProps) {
  const isVisible = useSettingVisibility(id);

  if (!isVisible) return null;

  return (
    <Fade in={true} timeout={500}>
      <Box sx={{ mb: 6 }}>
        {children}
      </Box>
    </Fade>
  );
}