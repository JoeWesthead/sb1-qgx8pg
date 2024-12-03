import React from 'react';
import { Box, Button, Paper } from '@mui/material';

interface SectionFooterProps {
  isEditing: boolean;
  onSave: () => void;
  onCancel: () => void;
}

export function SectionFooter({
  isEditing,
  onSave,
  onCancel,
}: SectionFooterProps) {
  if (!isEditing) return null;

  return (
    <Paper
      elevation={0}
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
      <Button onClick={onCancel}>Cancel</Button>
      <Button variant="contained" onClick={onSave}>
        Save Changes
      </Button>
    </Paper>
  );
}
