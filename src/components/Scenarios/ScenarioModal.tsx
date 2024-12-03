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
  FormControl,
  InputLabel,
  Box,
  Typography,
  IconButton,
  Stack,
} from '@mui/material';
import { X } from 'lucide-react';

interface ScenarioModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (scenario: {
    name: string;
    whenToApply: string;
    tags?: string[];
    escalationGroup?: string;
    fallbackMessage?: string;
  }) => void;
  scenario?: {
    id: string;
    name: string;
    whenToApply: string;
    tags?: string[];
    escalationGroup?: string;
    fallbackMessage?: string;
  } | null;
}

const groups = ['Customer Support', 'Sales Team', 'Technical Support'];

export function ScenarioModal({ open, onClose, onSave, scenario }: ScenarioModalProps) {
  const [name, setName] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [whenToApply, setWhenToApply] = useState('');
  const [escalationGroup, setEscalationGroup] = useState('');
  const [fallbackMessage, setFallbackMessage] = useState('');

  useEffect(() => {
    if (scenario) {
      setName(scenario.name);
      setTags(scenario.tags || []);
      setWhenToApply(scenario.whenToApply);
      setEscalationGroup(scenario.escalationGroup || '');
      setFallbackMessage(scenario.fallbackMessage || '');
    } else {
      setName('');
      setTags([]);
      setWhenToApply('');
      setEscalationGroup('');
      setFallbackMessage('');
    }
  }, [scenario]);

  const handleClose = () => {
    onClose();
  };

  const handleSave = () => {
    onSave({
      name,
      tags,
      whenToApply,
      escalationGroup,
      fallbackMessage,
    });
  };

  const isValid = name && whenToApply;

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'space-between',
        p: 2,
        pb: 1
      }}>
        <Typography variant="h6">
          {scenario ? 'Edit' : 'Add a'} Scenario
        </Typography>
        <IconButton size="small" onClick={handleClose}>
          <X size={20} />
        </IconButton>
      </Box>

      <DialogContent dividers>
        <Stack spacing={3}>
          <TextField
            label="Scenario Name"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter scenario name"
          />

          <TextField
            label="When to apply"
            multiline
            rows={4}
            fullWidth
            value={whenToApply}
            onChange={(e) => setWhenToApply(e.target.value)}
            placeholder="Explain when to use this scenario"
          />

          <FormControl fullWidth>
            <InputLabel>Tag(s)</InputLabel>
            <Select
              multiple
              value={tags}
              onChange={(e) => setTags(typeof e.target.value === 'string' ? [e.target.value] : e.target.value)}
              label="Tag(s)"
              placeholder="Select tags or enter a new one"
            >
              <MenuItem value="needs_attention">needs_attention</MenuItem>
              <MenuItem value="escalation">escalation</MenuItem>
              <MenuItem value="sales_priority">sales_priority</MenuItem>
            </Select>
          </FormControl>

          <FormControl fullWidth>
            <InputLabel>Escalation Group</InputLabel>
            <Select
              value={escalationGroup}
              onChange={(e) => setEscalationGroup(e.target.value)}
              label="Escalation Group"
              placeholder="Select a group"
            >
              {groups.map((group) => (
                <MenuItem key={group} value={group}>
                  {group}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            label="Fallback Message"
            multiline
            rows={2}
            fullWidth
            value={fallbackMessage}
            onChange={(e) => setFallbackMessage(e.target.value)}
            placeholder="Enter message to show when escalating"
          />
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!isValid}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}