import React from 'react';
import { Box, Typography, IconButton } from '@mui/material';
import { HelpCircle } from 'lucide-react';
import { EditableField } from '../common/EditableField';

interface AgentToneProps {
  value: string;
  onChange: (value: string) => void;
}

export function AgentTone({ value, onChange }: AgentToneProps) {
  return (
    <Box>
      <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
        Tone Instructions
      </Typography>

      <EditableField
        value={value}
        onChange={onChange}
        placeholder="Describe how you want your AI agent to communicate"
        multiline
        rows={4}
        maxWidth={600}
        size="small"
      />
    </Box>
  );
}
