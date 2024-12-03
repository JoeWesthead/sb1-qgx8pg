import React from 'react';
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  IconButton,
  Button,
} from '@mui/material';
import { HelpCircle, Plus } from 'lucide-react';

export function BotPersonaSection() {
  return (
    <Box sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Bot persona
        </Typography>
        <IconButton size="small">
          <HelpCircle size={20} />
        </IconButton>
      </Box>

      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            AI Agent Name
          </Typography>
          <IconButton size="small">
            <HelpCircle size={20} />
          </IconButton>
        </Box>
        <FormControl fullWidth sx={{ maxWidth: 400 }}>
          <InputLabel>Agent Name</InputLabel>
          <Select value="AI Assistant" label="Agent Name" size="small">
            <MenuItem value="AI Assistant">AI Assistant</MenuItem>
            <MenuItem value="Support Bot">Support Bot</MenuItem>
            <MenuItem value="Custom Name">Custom Name</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 600 }}>
            AI Agent Avatar
          </Typography>
          <IconButton size="small">
            <HelpCircle size={20} />
          </IconButton>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <Box
            sx={{
              width: 64,
              height: 64,
              borderRadius: '50%',
              bgcolor: 'action.hover',
            }}
          />
          <Button
            variant="outlined"
            size="small"
            startIcon={<Plus size={18} />}
          >
            Choose a File
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
