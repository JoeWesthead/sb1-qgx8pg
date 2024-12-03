import React, { useState } from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { HelpCircle } from 'lucide-react';
import { HelpDialog } from './HelpDialog';

interface SectionHeaderProps {
  title: string;
  helpText: string;
}

export function SectionHeader({ title, helpText }: SectionHeaderProps) {
  const [helpOpen, setHelpOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
      <Typography variant="h6">{title}</Typography>
      <IconButton size="small" onClick={() => setHelpOpen(true)}>
        <HelpCircle size={20} />
      </IconButton>

      <HelpDialog
        open={helpOpen}
        onClose={() => setHelpOpen(false)}
        title={title}
        description={helpText}
      />
    </Box>
  );
}