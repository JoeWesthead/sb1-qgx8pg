import React from 'react';
import {
  Box,
  Typography,
  Button,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  IconButton,
  Tooltip,
  Paper,
} from '@mui/material';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  Clock,
  AlertCircle,
} from 'lucide-react';

interface Source {
  id: string;
  name: string;
  type: string;
  lastUpdated: Date;
  status: string;
}

interface SourcesSectionProps {
  sources: Source[];
  onAddSource: () => void;
  onRemoveSource: (id: string) => void;
}

export function SourcesSection({
  sources,
  onAddSource,
  onRemoveSource,
}: SourcesSectionProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Ready':
        return (
          <Tooltip title="Ready">
            <CheckCircle2 size={20} color="success" />
          </Tooltip>
        );
      case 'Processing':
        return (
          <Tooltip title="Processing">
            <Clock size={20} className="text-warning-500" />
          </Tooltip>
        );
      case 'Error':
        return (
          <Tooltip title="Error">
            <AlertCircle size={20} className="text-error-500" />
          </Tooltip>
        );
      default:
        return null;
    }
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Typography variant="h5" sx={{ mb: 3 }}>
        Knowledge Sources
      </Typography>

      <TableContainer component={Paper} sx={{ mb: 3 }} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Status</TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Last Updated</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sources.map((source) => (
              <TableRow key={source.id}>
                <TableCell>{getStatusIcon(source.status)}</TableCell>
                <TableCell>{source.name}</TableCell>
                <TableCell>{source.type}</TableCell>
                <TableCell>{formatDate(source.lastUpdated)}</TableCell>
                <TableCell align="right">
                  <Box
                    sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}
                  >
                    <Tooltip title="Remove source">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => onRemoveSource(source.id)}
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Button
        variant="outlined"
        startIcon={<Plus size={18} />}
        onClick={onAddSource}
      >
        Add source
      </Button>
    </Box>
  );
}
