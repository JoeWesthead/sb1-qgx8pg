import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Stack,
  IconButton,
  Tooltip,
  TextField,
  InputAdornment,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { Plus, Edit2, Trash2, Tag, Search, HelpCircle } from 'lucide-react';
import { HelpDialog } from '../common/HelpDialog';

interface Tag {
  id: string;
  name: string;
  description: string;
  active: boolean;
}

const defaultTags: Tag[] = [
  {
    id: '1',
    name: 'urgent',
    description: 'High priority issues requiring immediate attention',
    active: true,
  },
  {
    id: '2',
    name: 'billing',
    description: 'Payment and subscription related inquiries',
    active: true,
  },
  {
    id: '3',
    name: 'technical',
    description: 'Technical issues and troubleshooting',
    active: true,
  },
  {
    id: '4',
    name: 'feature_request',
    description: 'Suggestions for new features',
    active: true,
  },
];

interface TagDialogProps {
  open: boolean;
  onClose: () => void;
  onSave: (tag: Omit<Tag, 'id'>) => void;
  initialData?: Tag;
}

function TagDialog({ open, onClose, onSave, initialData }: TagDialogProps) {
  const [name, setName] = useState(initialData?.name || '');
  const [description, setDescription] = useState(
    initialData?.description || ''
  );

  const handleSave = () => {
    onSave({
      name,
      description,
      active: true,
    });
    setName('');
    setDescription('');
  };

  const handleClose = () => {
    setName('');
    setDescription('');
    onClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
      <DialogTitle>{initialData ? 'Edit Tag' : 'Add Tag'}</DialogTitle>
      <DialogContent>
        <Stack spacing={3} sx={{ mt: 2 }}>
          <TextField
            label="Tag Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            size="small"
          />
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            multiline
            rows={3}
            size="small"
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button
          variant="contained"
          onClick={handleSave}
          disabled={!name.trim() || !description.trim()}
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export function TagsSection() {
  const [tags, setTags] = useState<Tag[]>(defaultTags);
  const [searchQuery, setSearchQuery] = useState('');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingTag, setEditingTag] = useState<Tag | null>(null);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);

  const filteredTags = tags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleAddTag = () => {
    setEditingTag(null);
    setDialogOpen(true);
  };

  const handleEditTag = (tag: Tag) => {
    setEditingTag(tag);
    setDialogOpen(true);
  };

  const handleDeleteTag = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const handleSaveTag = (tagData: Omit<Tag, 'id'>) => {
    if (editingTag) {
      setTags(
        tags.map((t) =>
          t.id === editingTag.id ? { ...tagData, id: editingTag.id } : t
        )
      );
    } else {
      setTags([...tags, { ...tagData, id: crypto.randomUUID() }]);
    }
    setDialogOpen(false);
    setEditingTag(null);
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="h6">Tags</Typography>
        <IconButton size="small" onClick={() => setHelpDialogOpen(true)}>
          <HelpCircle size={20} />
        </IconButton>
      </Box>

      <Stack
        direction="row"
        sx={{ mb: 1 }}
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          variant="soft"
          startIcon={<Plus size={16} />}
          onClick={handleAddTag}
          size="small"
        >
          Add Tag
        </Button>
        <TextField
          size="small"
          placeholder="Search tags..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          sx={{ width: 300 }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search size={16} />
              </InputAdornment>
            ),
          }}
        />
      </Stack>
      <Paper variant="outlined">
        <TableContainer>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Tag</TableCell>
                <TableCell>Description</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredTags.map((tag) => (
                <TableRow key={tag.id}>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      <Tag size={16} />
                      <Typography>{tag.name}</Typography>
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2" color="text.secondary">
                      {tag.description}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <Stack
                      direction="row"
                      spacing={1}
                      justifyContent="flex-end"
                    >
                      <IconButton
                        size="small"
                        onClick={() => handleEditTag(tag)}
                      >
                        <Edit2 size={18} />
                      </IconButton>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleDeleteTag(tag.id)}
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </Stack>
                  </TableCell>
                </TableRow>
              ))}
              {filteredTags.length === 0 && (
                <TableRow>
                  <TableCell colSpan={3} align="center">
                    <Typography color="text.secondary">
                      {searchQuery
                        ? 'No matching tags found'
                        : 'No tags have been added'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      <TagDialog
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        onSave={handleSaveTag}
        initialData={editingTag || undefined}
      />

      <HelpDialog
        open={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
        title="Tags"
        description="Tags help categorize conversations for better organization and reporting. Both human agents and AI can apply these tags based on conversation context."
        benefits={[
          'Automatic conversation categorization',
          'Improved reporting and analytics',
          'Better team coordination',
          'Easier conversation routing',
        ]}
      />
    </Box>
  );
}
