import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { HelpCircle } from 'lucide-react';
import { EditableField } from '../common/EditableField';

interface AgentNameProps {
  value: string;
  onChange: (value: string) => void;
}

export function AgentName({ value, onChange }: AgentNameProps) {
  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle2">Agent Name</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        The customer-facing name of your chatbot
      </Typography>

      <EditableField
        value={value}
        onChange={onChange}
        placeholder="Enter agent name"
        maxWidth={400}
        size="small"
      />
    </Box>
  );
}
