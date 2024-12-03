import React from 'react';
import { Paper, Box, Typography, Stack } from '@mui/material';
import { Zap } from 'lucide-react';

interface FeatureCardProps {
  title: string;
  description: string;
  benefits: string[];
}

export function FeatureCard({ title, description, benefits }: FeatureCardProps) {
  return (
    <Paper 
      variant="outlined" 
      sx={{ 
        p: 3,
        height: '100%',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 2,
        },
      }}
    >
      <Typography variant="h6" sx={{ mb: 2 }}>
        {title}
      </Typography>
      
      <Typography color="text.secondary" sx={{ mb: 2 }}>
        {description}
      </Typography>

      <Typography variant="subtitle2" sx={{ mb: 1 }}>
        Key Benefits:
      </Typography>

      <Stack spacing={0.5}>
        {benefits.map((benefit) => (
          <Box key={benefit} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Zap size={14} />
            <Typography variant="body2">{benefit}</Typography>
          </Box>
        ))}
      </Stack>
    </Paper>
  );
}