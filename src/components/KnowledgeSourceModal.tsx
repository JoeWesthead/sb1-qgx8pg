import React, { useState, useMemo } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Box,
  Chip,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { Search, Edit2, Trash2 } from 'lucide-react';

interface KnowledgeSource {
  id: string;
  name: string;
  type: string;
  lastUpdated: Date;
  status: 'Ready' | 'Processing' | 'Error';
}

interface KnowledgeSourceModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (sources: KnowledgeSource[]) => void;
  initialSources: KnowledgeSource[];
}

export function KnowledgeSourceModal({ 
  open, 
  onClose, 
  onSave,
  initialSources = []
}: KnowledgeSourceModalProps) {
  const [sources, setSources] = useState<KnowledgeSource[]>(initialSources);
  const [searchQuery, setSearchQuery] = useState('');

  const filteredSources = useMemo(() => {
    const query = searchQuery.toLowerCase();
    return sources.filter(source => 
      source.name.toLowerCase().includes(query) ||
      source.type.toLowerCase().includes(query)
    );
  }, [sources, searchQuery]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleDelete = (id: string) => {
    setSources(prevSources => prevSources.filter(source => source.id !== id));
  };

  const handleSave = () => {
    onSave(sources);
    onClose();
  };

  const getStatusChip = (status: 'Ready' | 'Processing' | 'Error') => {
    const statusColors = {
      Ready: 'success',
      Processing: 'warning',
      Error: 'error',
    } as const;

    return (
      <Chip
        size="small"
        label={status}
        color={statusColors[status]}
      />
    );
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h6" component="div" sx={{ mb: 2 }}>
          Manage Knowledge Sources
        </Typography>
        <TextField
          fullWidth
          size="small"
          placeholder="Search sources..."
          value={searchQuery}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={20} />
              </InputAdornment>
            ),
          }}
        />
      </DialogTitle>
      <DialogContent dividers>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Source</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Last Updated</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredSources.map((source) => (
                <TableRow key={source.id}>
                  <TableCell>{source.name}</TableCell>
                  <TableCell>
                    <Chip 
                      label={source.type} 
                      size="small"
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell>
                    {source.lastUpdated.toLocaleDateString()}
                  </TableCell>
                  <TableCell>{getStatusChip(source.status)}</TableCell>
                  <TableCell align="right">
                    <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                      <IconButton size="small">
                        <Edit2 size={18} />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDelete(source.id)}
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave}>
          Save Changes
        </Button>
      </DialogActions>
    </Dialog>
  );
}