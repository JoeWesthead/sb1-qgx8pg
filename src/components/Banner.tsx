import React from 'react';
import { Box, Typography, Link } from '@mui/material';

interface BannerProps {
  title: React.ReactNode;
  description: React.ReactNode;
  action?: React.ReactNode;
}

export function Banner({ title, description, action }: BannerProps) {
  return (
    <Box
      sx={{
        p: 4,
        bgcolor: 'primary.main',
        opacity: 0.9,
        borderRadius: 1,
        mb: 4,
      }}
    >
      <Typography 
        variant="h6" 
        sx={{ 
          color: 'primary.contrastText',
          mb: 2,
          '& a': {
            color: 'inherit',
            textDecoration: 'underline',
            '&:hover': {
              textDecoration: 'none',
            },
          },
        }}
      >
        {title}
      </Typography>
      <Typography 
        sx={{ 
          color: 'primary.contrastText',
          mb: action ? 2 : 0,
        }}
      >
        {description}
      </Typography>
      {action && (
        <Typography sx={{ color: 'primary.contrastText' }}>
          {action}
        </Typography>
      )}
    </Box>
  );
}