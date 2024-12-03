import React from 'react';
import { Paper, Box, Typography } from '@mui/material';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string;
  trend: number;
  icon: LucideIcon;
}

export function StatCard({ title, value, trend, icon: Icon }: StatCardProps) {
  const isPositive = trend >= 0;
  const trendColor = isPositive ? 'success.main' : 'error.main';
  const trendSymbol = isPositive ? '↑' : '↓';

  return (
    <Paper
      sx={{
        p: 3,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 2,
        bgcolor: 'background.paper',
        transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: 4,
        },
      }}
    >
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
        <Box>
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{ mb: 0.5, fontWeight: 500 }}
          >
            {title}
          </Typography>
          <Typography
            variant="h4"
            sx={{ 
              fontWeight: 600,
              color: 'text.primary',
              letterSpacing: '-0.5px'
            }}
          >
            {value}
          </Typography>
        </Box>
        <Box
          sx={{
            bgcolor: 'action.hover',
            borderRadius: '50%',
            p: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon size={24} color="inherit" />
        </Box>
      </Box>
      <Typography
        variant="body2"
        sx={{
          color: trendColor,
          display: 'flex',
          alignItems: 'center',
          gap: 0.5,
          fontWeight: 500,
        }}
      >
        {trendSymbol} {Math.abs(trend)}%
        <Typography
          component="span"
          variant="body2"
          color="text.secondary"
          sx={{ ml: 0.5 }}
        >
          vs last month
        </Typography>
      </Typography>
    </Paper>
  );
}