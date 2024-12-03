import React from 'react';
import { Box, Typography, Button, IconButton, Avatar } from '@mui/material';
import { HelpCircle, Upload, X } from 'lucide-react';

interface AgentAvatarProps {
  avatar: string | null;
  agentName: string;
  onUpload: (file: File) => void;
  onRemove: () => void;
}

export function AgentAvatar({
  avatar,
  agentName,
  onUpload,
  onRemove,
}: AgentAvatarProps) {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file);
    }
  };

  return (
    <Box sx={{ mb: 4 }}>
      <Typography variant="subtitle2">Agent Avatar</Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
        The customer-facing picture to represent your chatbot
      </Typography>

      <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 2 }}>
        <Box sx={{ position: 'relative' }}>
          <Avatar
            src={avatar || undefined}
            sx={{
              width: 32,
              height: 32,
              bgcolor: 'action.selected',
              fontSize: '1rem',
            }}
          >
            {!avatar && agentName.charAt(0)}
          </Avatar>
          {avatar && (
            <IconButton
              size="small"
              onClick={onRemove}
              sx={{
                position: 'absolute',
                top: -8,
                right: -8,
                bgcolor: 'background.paper',
                boxShadow: 1,
                '&:hover': {
                  bgcolor: 'background.paper',
                },
              }}
            >
              <X size={14} />
            </IconButton>
          )}
        </Box>

        <Box>
          <Button
            variant="outlined"
            component="label"
            startIcon={<Upload size={16} />}
            size="small"
          >
            {avatar ? 'Change Avatar' : 'Upload Avatar'}
            <input
              type="file"
              hidden
              accept="image/*"
              onChange={handleFileChange}
            />
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
