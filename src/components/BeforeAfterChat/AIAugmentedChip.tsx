import React, { useState } from 'react';
import {
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  IconButton,
  Box,
} from '@mui/material';
import { X, BadgeInfo } from 'lucide-react';

interface AIAugmentedChipProps {
  sectionName: string;
}

export function AIAugmentedChip({ sectionName }: AIAugmentedChipProps) {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Chip
        label="AI Augmented"
        variant="soft"
        color="info"
        size="small"
        onClick={() => setDialogOpen(true)}
        sx={{ pl: 0.25 }}
        icon={<BadgeInfo size={14} />}
        data-clickable="true"
      />

      <Dialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 2 },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            p: 2,
            pb: 1,
          }}
        >
          <Typography variant="h6">AI Augmented {sectionName}</Typography>
          <IconButton size="small" onClick={() => setDialogOpen(false)}>
            <X size={20} />
          </IconButton>
        </Box>

        <DialogContent>
          <Typography color="text.secondary">
            This setting provides baseline behavior for your AI Variant.
            However, your deployed AI variant may behave differently based on
            its specific instructions and training.
          </Typography>
          <Typography color="text.secondary" sx={{ mt: 2 }}>
            For example, while these Ground Rules might specify certain fields
            as required, your AI Variant could be trained to collect this
            information more naturally through conversation or skip it based on
            context.
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}