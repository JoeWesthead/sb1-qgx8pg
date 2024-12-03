import React from 'react';
import { Box, Typography, Paper, Stack, Button } from '@mui/material';
import { Zap, Plus } from 'lucide-react';

interface EmptyFeatureCardProps {
  title: string;
  description: string;
  benefits: string[];
  onAdd?: () => void;
  addButtonText?: string;
}

export function EmptyFeatureCard({
  title,
  description,
  benefits,
  onAdd,
  addButtonText = `Add ${title.replace(/s$/, '')}`,
}: EmptyFeatureCardProps) {
  return (
    <>
      {onAdd && (
        <Button
          sx={{ mb: 1 }}
          variant="soft"
          startIcon={<Plus size={16} />}
          onClick={onAdd}
        >
          {addButtonText}
        </Button>
      )}
      <Paper
        elevation={0}
        sx={{
          p: 3,
          bgcolor: (theme) =>
            theme.palette.mode === 'light'
              ? '#F9FAFB' // Light mode table header color
              : 'rgba(255, 255, 255, 0.05)', // Dark mode table header color
          borderRadius: 1,
        }}
      >
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Key Benefits:
        </Typography>

        <Stack spacing={1}>
          {benefits.map((benefit) => (
            <Box
              key={benefit}
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
              }}
            >
              <Zap size={14} />
              <Typography variant="body2">{benefit}</Typography>
            </Box>
          ))}
        </Stack>
      </Paper>
    </>
  );
}
