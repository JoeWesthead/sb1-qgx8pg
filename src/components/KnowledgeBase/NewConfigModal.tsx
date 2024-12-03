import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
} from '@mui/material';
import { X } from 'lucide-react';
import { configOptions } from '../../config/settingsConfig';

interface NewConfigModalProps {
  open: boolean;
  onClose: () => void;
  onCreateConfig: (name: string, copyFrom?: string) => void;
}

export function NewConfigModal({
  open,
  onClose,
  onCreateConfig,
}: NewConfigModalProps) {
  const [name, setName] = useState('');
  const [copyType, setCopyType] = useState('new');
  const [copyFrom, setCopyFrom] = useState('');
  const [nameError, setNameError] = useState('');

  const handleSubmit = () => {
    if (!name.trim()) {
      setNameError('Configuration name is required');
      return;
    }

    onCreateConfig(name, copyType === 'copy' ? copyFrom : undefined);
    handleClose();
  };

  const handleClose = () => {
    setName('');
    setCopyType('new');
    setCopyFrom('');
    setNameError('');
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
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
        <Typography variant="h6">Create New AI Variant</Typography>
        <IconButton size="small" onClick={handleClose}>
          <X size={20} />
        </IconButton>
      </Box>

      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <TextField
            label="Variant Name"
            fullWidth
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setNameError('');
            }}
            error={!!nameError}
            helperText={nameError || 'Give your variant a descriptive name'}
            autoFocus
          />
        </Box>

        <FormControl sx={{ width: '100%' }}>
          <FormLabel component="legend" sx={{ mb: 1 }}>
            <Typography variant="subtitle1">Variant Type</Typography>
          </FormLabel>
          <RadioGroup
            value={copyType}
            onChange={(e) => setCopyType(e.target.value)}
          >
            <FormControlLabel
              value="new"
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="body1">Start from scratch</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Create a new variant with default settings
                  </Typography>
                </Box>
              }
            />
            <FormControlLabel
              value="copy"
              control={<Radio />}
              label={
                <Box>
                  <Typography variant="body1">
                    Copy existing configuration
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Start with settings from an existing configuration
                  </Typography>
                </Box>
              }
            />
          </RadioGroup>
        </FormControl>

        {copyType === 'copy' && (
          <FormControl fullWidth sx={{ mt: 2 }}>
            <FormLabel component="legend" sx={{ mb: 1 }}>
              <Typography variant="subtitle1">Copy from</Typography>
            </FormLabel>
            <Select
              value={copyFrom}
              onChange={(e) => setCopyFrom(e.target.value)}
              displayEmpty
              size="small"
            >
              <MenuItem value="" disabled>
                Select a configuration
              </MenuItem>
              {configOptions.map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSubmit}
          disabled={!name.trim() || (copyType === 'copy' && !copyFrom)}
        >
          Create Configuration
        </Button>
      </DialogActions>
    </Dialog>
  );
}
