import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Checkbox,
  InputAdornment,
  Tabs,
  Tab,
  Stack,
  Chip,
} from '@mui/material';
import { 
  FileText, 
  Globe, 
  FolderOpen,
  ArrowLeft,
  Upload,
  X,
  Search,
  History,
} from 'lucide-react';

interface AddSourceModalProps {
  open: boolean;
  onClose: () => void;
  onAdd: (source: any) => void;
}

type SourceType = 'document' | 'webpage' | 'website' | 'previous';

const sourceTypes = [
  {
    id: 'previous',
    title: 'Previously imported',
    description: 'Re-import sources from other variants',
    icon: History,
  },
  {
    id: 'document',
    title: 'Document',
    description: 'Upload PDF, Word, or text files',
    icon: FileText,
    accepts: '.pdf,.doc,.docx,.txt'
  },
  {
    id: 'webpage',
    title: 'Single web page',
    description: 'Import content from a specific URL',
    icon: Globe
  },
  {
    id: 'website',
    title: 'Entire web site',
    description: 'Crawl and import an entire domain',
    icon: FolderOpen
  }
];

// Mock previously imported sources
const previousSources = [
  {
    id: '1',
    name: 'Product Documentation',
    type: 'PDF',
    variant: 'Aiden',
    lastImported: '2024-03-15',
  },
  {
    id: '2',
    name: 'API Reference',
    type: 'Website',
    variant: 'Aiden',
    lastImported: '2024-03-14',
  },
  {
    id: '3',
    name: 'Pricing Page',
    type: 'Web Page',
    variant: 'Bespoke with Aiden',
    lastImported: '2024-03-13',
  },
  {
    id: '4',
    name: 'User Guide',
    type: 'PDF',
    variant: 'Aiden',
    lastImported: '2024-03-12',
  },
  {
    id: '5',
    name: 'Support Articles',
    type: 'Website',
    variant: 'Bespoke with Aiden',
    lastImported: '2024-03-11',
  },
  {
    id: '6',
    name: 'Release Notes',
    type: 'Web Page',
    variant: 'Aiden',
    lastImported: '2024-03-10',
  },
];

export function AddSourceModal({ open, onClose, onAdd }: AddSourceModalProps) {
  const [activeStep, setActiveStep] = useState(0);
  const [selectedType, setSelectedType] = useState<SourceType | null>(null);
  const [url, setUrl] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSources, setSelectedSources] = useState<string[]>([]);

  const filteredSources = previousSources.filter(source => 
    source.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.type.toLowerCase().includes(searchQuery.toLowerCase()) ||
    source.variant.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleClose = () => {
    setActiveStep(0);
    setSelectedType(null);
    setUrl('');
    setSearchQuery('');
    setSelectedSources([]);
    onClose();
  };

  const handleTypeSelect = (type: SourceType) => {
    setSelectedType(type);
    setActiveStep(1);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onAdd({
        id: crypto.randomUUID(),
        name: file.name,
        type: 'Document',
        lastUpdated: new Date(),
        status: 'Processing',
      });
      handleClose();
    }
  };

  const handleUrlSubmit = () => {
    if (url) {
      onAdd({
        id: crypto.randomUUID(),
        name: new URL(url).hostname,
        type: selectedType === 'webpage' ? 'Web Page' : 'Website',
        lastUpdated: new Date(),
        status: 'Processing',
      });
      handleClose();
    }
  };

  const handleSourceToggle = (sourceId: string) => {
    setSelectedSources(prev => {
      if (prev.includes(sourceId)) {
        return prev.filter(id => id !== sourceId);
      }
      return [...prev, sourceId];
    });
  };

  const handleImportSelected = () => {
    const sourcesToImport = previousSources.filter(source => 
      selectedSources.includes(source.id)
    );
    sourcesToImport.forEach(source => {
      onAdd({
        id: crypto.randomUUID(),
        name: source.name,
        type: source.type,
        lastUpdated: new Date(),
        status: 'Processing',
      });
    });
    handleClose();
  };

  const renderSourceTypeSelection = () => (
    <List sx={{ width: '100%' }}>
      {sourceTypes.map((type) => (
        <ListItem key={type.id} disablePadding>
          <ListItemButton 
            onClick={() => handleTypeSelect(type.id as SourceType)}
            sx={{ 
              py: 2,
              borderRadius: 1,
              '&:hover': {
                bgcolor: 'action.hover',
              }
            }}
          >
            <ListItemIcon>
              <type.icon size={24} />
            </ListItemIcon>
            <ListItemText 
              primary={type.title}
              secondary={type.description}
              primaryTypographyProps={{
                fontWeight: 500,
                sx: { mb: 0.5 }
              }}
            />
          </ListItemButton>
        </ListItem>
      ))}
    </List>
  );

  const renderPreviousSources = () => (
    <Box>
      <TextField
        fullWidth
        size="small"
        placeholder="Search sources..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ mb: 2 }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <Search size={16} />
            </InputAdornment>
          ),
        }}
      />

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedSources.length > 0 && selectedSources.length < filteredSources.length}
                  checked={selectedSources.length === filteredSources.length}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedSources(filteredSources.map(s => s.id));
                    } else {
                      setSelectedSources([]);
                    }
                  }}
                />
              </TableCell>
              <TableCell>Source</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Variant</TableCell>
              <TableCell>Last Imported</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSources.map((source) => (
              <TableRow 
                key={source.id}
                selected={selectedSources.includes(source.id)}
                hover
                onClick={() => handleSourceToggle(source.id)}
                sx={{ cursor: 'pointer' }}
              >
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedSources.includes(source.id)}
                    onClick={(e) => e.stopPropagation()}
                    onChange={() => handleSourceToggle(source.id)}
                  />
                </TableCell>
                <TableCell>{source.name}</TableCell>
                <TableCell>
                  <Chip 
                    label={source.type} 
                    size="small"
                    variant="outlined"
                  />
                </TableCell>
                <TableCell>{source.variant}</TableCell>
                <TableCell>{source.lastImported}</TableCell>
              </TableRow>
            ))}
            {filteredSources.length === 0 && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  <Typography color="text.secondary">
                    No matching sources found
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );

  const renderSourceDetails = () => {
    if (!selectedType) return null;

    switch (selectedType) {
      case 'previous':
        return renderPreviousSources();

      case 'document':
        return (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Box
              sx={{
                border: '2px dashed',
                borderColor: 'divider',
                borderRadius: 2,
                p: 4,
                mb: 3,
                cursor: 'pointer',
                '&:hover': {
                  borderColor: 'primary.main',
                  bgcolor: 'action.hover',
                }
              }}
              component="label"
            >
              <input
                type="file"
                hidden
                accept={sourceTypes[1].accepts}
                onChange={handleFileUpload}
              />
              <Upload size={48} strokeWidth={1} className="mb-4" />
              <Typography variant="h6" sx={{ mb: 1 }}>
                Drop your file here
              </Typography>
              <Typography color="text.secondary">
                or click to browse
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary">
              Supported formats: PDF, Word, Text files
            </Typography>
          </Box>
        );

      case 'webpage':
      case 'website':
        return (
          <Box sx={{ py: 2 }}>
            <TextField
              fullWidth
              label="Enter URL"
              placeholder="https://example.com"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: { 
          borderRadius: 2,
          minHeight: 400
        }
      }}
    >
      <DialogTitle sx={{ 
        display: 'flex', 
        alignItems: 'center',
        gap: 1,
        pb: 1
      }}>
        {activeStep > 0 && (
          <IconButton onClick={() => setActiveStep(0)} size="small" sx={{ mr: 1 }}>
            <ArrowLeft size={20} />
          </IconButton>
        )}
        <Box sx={{ flex: 1 }}>
          <Typography variant="h6" component="div">
            {activeStep === 0 ? 'What are you importing?' : 'Import Details'}
          </Typography>
          {activeStep > 0 && selectedType && (
            <Typography variant="body2" color="text.secondary">
              {sourceTypes.find(t => t.id === selectedType)?.title}
            </Typography>
          )}
        </Box>
        <IconButton onClick={handleClose} size="small">
          <X size={20} />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {activeStep === 0 ? renderSourceTypeSelection() : renderSourceDetails()}
      </DialogContent>

      {activeStep > 0 && selectedType !== 'document' && (
        <DialogActions sx={{ px: 3, py: 2 }}>
          <Button onClick={handleClose}>
            Cancel
          </Button>
          {selectedType === 'previous' ? (
            <Button 
              variant="contained" 
              onClick={handleImportSelected}
              disabled={selectedSources.length === 0}
            >
              Import Selected ({selectedSources.length})
            </Button>
          ) : (
            <Button 
              variant="contained" 
              onClick={handleUrlSubmit}
              disabled={!url}
            >
              Import Source
            </Button>
          )}
        </DialogActions>
      )}
    </Dialog>
  );
}