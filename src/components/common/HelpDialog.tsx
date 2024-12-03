import React from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
  Stack,
  Divider,
} from '@mui/material';
import { X, Zap } from 'lucide-react';

interface HelpDialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  benefits?: string[];
}

export function HelpDialog({ 
  open, 
  onClose, 
  title, 
  description,
  benefits = ['Automatic knowledge extraction', 'Real-time updates', 'Contextual understanding']
}: HelpDialogProps) {
  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { 
          borderRadius: 2,
          p: 0
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'space-between',
        p: 3,
        pb: 0
      }}>
        <Typography variant="h6">{title}</Typography>
        <IconButton size="small" onClick={onClose} sx={{ mt: -0.5 }}>
          <X size={20} />
        </IconButton>
      </Box>

      <DialogContent sx={{ p: 3 }}>
        <Typography color="text.secondary" sx={{ mb: 3 }}>
          {description}
        </Typography>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Key Benefits:
        </Typography>

        <Stack spacing={0.5}>
          {benefits.map((benefit) => (
            <Box key={benefit} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <Zap size={14} />
              <Typography variant="body2">{benefit}</Typography>
            </Box>
          ))}
        </Stack>
      </DialogContent>
    </Dialog>
  );
}