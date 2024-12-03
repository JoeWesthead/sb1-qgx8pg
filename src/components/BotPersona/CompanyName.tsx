import React from 'react';
import { Box, Typography } from '@mui/material';
import { EditableField } from '../common/EditableField';

interface CompanyNameProps {
  value: string;
  onChange: (value: string) => void;
  hasChanges?: boolean;
}

export function CompanyName({ value, onChange, hasChanges }: CompanyNameProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle2">Company Name</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        The name of your company that the AI will reference
      </Typography>

      <EditableField
        value={value}
        onChange={onChange}
        placeholder="Enter company name"
        maxWidth={400}
        size="small"
      />
    </Box>
  );
}