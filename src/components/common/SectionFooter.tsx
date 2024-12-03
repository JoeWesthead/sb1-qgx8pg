import React from 'react';
import { Box, Button, Paper } from '@mui/material';

interface SectionFooterProps {
  hasChanges: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function SectionFooter({
  hasChanges,
  onSave,
  onCancel,
}: SectionFooterProps) {
  return (
    <Box
      sx={{
        borderTop: '1px solid',
        borderColor: 'divider',
        p: 2,
        mt: 4,
        mx: -3,
        mb: -3,
        display: 'flex',
        justifyContent: 'flex-end',
        gap: 1,
      }}
    >
      <Button size="small" onClick={onCancel} disabled={!hasChanges}>
        Cancel
      </Button>
      <Button
        size="small"
        variant="contained"
        onClick={onSave}
        disabled={!hasChanges}
      >
        Apply Changes
      </Button>
    </Box>
  );
}
