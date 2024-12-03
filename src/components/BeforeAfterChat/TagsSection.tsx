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
  {
    id: '5',
    name: 'bug',
    description: 'Reports of software bugs or issues',
    active: true,
  },
  {
    id: '6',
    name: 'sales',
    description: 'Sales inquiries and opportunities',
    active: true,
  },
  {
    id: '7',
    name: 'feedback',
    description: 'General feedback and suggestions',
    active: true,
  },
  {
    id: '8',
    name: 'complaint',
    description: 'Customer complaints requiring attention',
    active: true,
  },
  {
    id: '9',
    name: 'refund',
    description: 'Refund requests and processing',
    active: true,
  },
  {
    id: '10',
    name: 'general',
    description: 'General inquiries and questions',
    active: true,
  },
];

export function TagsSection() {
  const [tags, setTags] = useState<Tag[]>(defaultTags);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleDeleteTag = (id: string) => {
    setTags(tags.filter((tag) => tag.id !== id));
  };

  const filteredTags = tags.filter(
    (tag) =>
      tag.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      tag.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <Stack
        direction="row"
        sx={{ mb: 1 }}
        spacing={2}
        alignItems="center"
        justifyContent="space-between"
      >
        <Button variant="soft" startIcon={<Plus size={16} />} size="small">
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

      <TableContainer component={Paper} variant="outlined" sx={{ mb: 6 }}>
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
                  <Stack direction="row" spacing={1} justifyContent="flex-end">
                    <IconButton size="small">
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
                    {searchQuery ? 'No matching tags found' : 'No tags found'}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

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
    </>
  );
}
