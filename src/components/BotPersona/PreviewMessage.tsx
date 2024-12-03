import React from 'react';
import { Box, Typography, Avatar } from '@mui/material';

interface PreviewMessageProps {
  avatar: string | null;
  agentName: string;
}

export function PreviewMessage({ avatar, agentName }: PreviewMessageProps) {
  return (
    <Box sx={{ p: 2 }}>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start', mb: 2 }}>
        <Avatar
          src={avatar || undefined}
          sx={{ width: 40, height: 40 }}
        >
          {!avatar && agentName.charAt(0)}
        </Avatar>
        <Box
          sx={{
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            p: 2,
            borderRadius: 2,
            maxWidth: '80%',
          }}
        >
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            {agentName}
          </Typography>
          <Typography variant="body2">
            Hello! How can I assist you today?
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}