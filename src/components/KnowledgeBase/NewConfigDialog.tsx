import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import { configOptions } from '../../config/settingsConfig';

interface NewConfigDialogProps {
  open: boolean;
  onClose: () => void;
  onCreateNew: (copyFrom?: string) => void;
}

export function NewConfigDialog({
  open,
  onClose,
  onCreateNew,
}: NewConfigDialogProps) {
  const [copyFrom, setCopyFrom] = useState<string>('');

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New AI Variant</DialogTitle>
      <DialogContent>
        <Typography sx={{ mb: 3 }}>
          Would you like to start fresh or copy settings from an existing AI
          Variant?
        </Typography>
        <FormControl fullWidth>
          <InputLabel>Copy settings from</InputLabel>
          <Select
            value={copyFrom}
            onChange={(e) => setCopyFrom(e.target.value)}
            label="Copy settings from"
          >
            <MenuItem value="">Start fresh</MenuItem>
            {configOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={() => onCreateNew(copyFrom || undefined)}
        >
          Create Configuration
        </Button>
      </DialogActions>
    </Dialog>
  );
}
