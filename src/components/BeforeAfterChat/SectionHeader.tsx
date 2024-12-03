import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { HelpCircle } from 'lucide-react';
import { AIAugmentedChip } from './AIAugmentedChip';

interface SectionHeaderProps {
  title: string;
  description?: string;
  showAIChip?: boolean;
  section?: string;
}

export function SectionHeader({
  title,
  description,
  showAIChip = false,
  section,
}: SectionHeaderProps) {
  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Typography variant="h6">{title}</Typography>
        {/* <IconButton size="small">
          <HelpCircle size={20} />
        </IconButton> */}
        {showAIChip && section && <AIAugmentedChip sectionName={section} />}
      </Box>
      {description && (
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      )}
    </Box>
  );
}
