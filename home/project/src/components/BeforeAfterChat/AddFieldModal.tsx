import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Grid,
} from '@mui/material';
import { X, Plus } from 'lucide-react';

interface AddFieldModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (field: {
    name: string;
    fieldName: string;
    label: string;
    responseType: string;
    required: string;
    options: string[];
  }) => void;
  initialData?: {
    name: string;
    fieldName: string;
    label: string;
    responseType: string;
    required: string;
    options: string[];
  };
}

const responseTypes = [
  'free text entry',
  'multiple choice, single select',
  'yes / no',
  '5-star scale',
  'email address',
  'phone number',
];

const requiredOptions = [
  'Always required',
  'Only if agents are unavailable',
  'Only if agents are available',
  'Not required',
];

export function AddFieldModal({ open, onClose, onSave, initialData }: AddFieldModalProps) {
  const [formPrompt, setFormPrompt] = useState('');
  const [fieldName, setFieldName] = useState('');
  const [label, setLabel] = useState('');
  const [responseType, setResponseType] = useState('');
  const [required, setRequired] = useState('');
  const [options, setOptions] = useState<string[]>([]);
  const [currentOption, setCurrentOption] = useState('');

  useEffect(() => {
    if (initialData) {
      setFormPrompt(initialData.name);
      setFieldName(initialData.fieldName);
      setLabel(initialData.label);
      setResponseType(initialData.responseType);
      setRequired(initialData.required);
      setOptions(initialData.options);
    } else {
      setFormPrompt('');
      setFieldName('');
      setLabel('');
      setResponseType('');
      setRequired('');
      setOptions([]);
    }
  }, [initialData, open]);

  const handleClose = () => {
    setFormPrompt('');
    setFieldName('');
    setLabel('');
    setResponseType('');
    setRequired('');
    setOptions([]);
    setCurrentOption('');
    onClose();
  };

  const handleAddOption = () => {
    if (currentOption.trim()) {
      setOptions([...options, currentOption.trim()]);
      setCurrentOption('');
    }
  };

  const handleSave = () => {
    onSave({
      name: formPrompt,
      fieldName,
      label,
      responseType,
      required,
      options,
    });
    handleClose();
  };

  const isValid = formPrompt && fieldName && label && responseType && required;
  const showOptions = responseType === 'multiple choice, single select';

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <Box sx={{ 
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        p: 2,
        pb: 1
      }}>
        <Typography variant="h6">Add a Field</Typography>
        <IconButton onClick={handleClose} size="small">
          <X size={20} />
        </IconButton>
      </Box>

      <DialogContent dividers>
        <Grid container spacing={4}>
          <Grid item xs={6}>
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Form Prompt
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={formPrompt}
                onChange={(e) => setFormPrompt(e.target.value)}
                placeholder="Reason for visiting"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Field Name
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={fieldName}
                onChange={(e) => setFieldName(e.target.value)}
                placeholder="reasonForVisit"
                helperText="Used for integrations and reporting"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Integration / Reporting Label
              </Typography>
              <TextField
                fullWidth
                size="small"
                value={label}
                onChange={(e) => setLabel(e.target.value)}
                placeholder="#ReasonVisit"
              />
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle1" gutterBottom>
                Required
              </Typography>
              <Select
                fullWidth
                size="small"
                value={required}
                onChange={(e) => setRequired(e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>Select when required</MenuItem>
                {requiredOptions.map((option) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </Box>

            <Box>
              <Typography variant="subtitle1" gutterBottom>
                Response Type
              </Typography>
              <Select
                fullWidth
                size="small"
                value={responseType}
                onChange={(e) => setResponseType(e.target.value)}
                displayEmpty
              >
                <MenuItem value="" disabled>Select response type</MenuItem>
                {responseTypes.map((type) => (
                  <MenuItem key={type} value={type}>
                    {type}
                  </MenuItem>
                ))}
              </Select>
            </Box>
          </Grid>

          <Grid item xs={6}>
            {showOptions && (
              <Box>
                <Typography variant="subtitle1" gutterBottom>
                  Response Options
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {options.map((option, index) => (
                    <TextField
                      key={index}
                      value={option}
                      disabled
                      size="small"
                      fullWidth
                    />
                  ))}
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <TextField
                      fullWidth
                      size="small"
                      value={currentOption}
                      onChange={(e) => setCurrentOption(e.target.value)}
                      placeholder="enter an option"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          handleAddOption();
                        }
                      }}
                    />
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={handleAddOption}
                      disabled={!currentOption.trim()}
                      startIcon={<Plus size={18} />}
                    >
                      add
                    </Button>
                  </Box>
                </Box>
              </Box>
            )}
          </Grid>
        </Grid>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!isValid || (showOptions && options.length === 0)}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}