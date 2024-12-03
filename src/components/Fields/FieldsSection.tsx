import React, { useState } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Paper,
  Stack,
  TextField,
  InputAdornment,
} from '@mui/material';
import { HelpCircle, Edit2, Trash2, Plus, Search } from 'lucide-react';
import { AddFieldModal } from '../BeforeAfterChat/AddFieldModal';
import { HelpDialog } from '../common/HelpDialog';

interface Field {
  id: string;
  name: string;
  standardQuestion: string;
}

interface FieldsSectionProps {
  helpContent?: {
    title: string;
    description: string;
  };
}

const initialFields: Field[] = [
  {
    id: '1',
    name: 'Name',
    standardQuestion: "Hi. I'm Aiden. What's your name?",
  },
  {
    id: '2',
    name: 'Email',
    standardQuestion: 'Could I get your email address to follow up with you?',
  },
  {
    id: '3',
    name: 'Reason',
    standardQuestion: 'What brings you here today?',
  },
  {
    id: '4',
    name: 'Order#',
    standardQuestion: 'Do you have your order number handy?',
  },
];

export function FieldsSection({ helpContent }: FieldsSectionProps) {
  const [fields, setFields] = useState<Field[]>(initialFields);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<Field | null>(null);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);

  const handleAddField = () => {
    setEditingField(null);
    setIsModalOpen(true);
  };

  const handleEditField = (field: Field) => {
    setEditingField(field);
    setIsModalOpen(true);
  };

  const handleDeleteField = (id: string) => {
    setFields(fields.filter((f) => f.id !== id));
  };

  const handleSaveField = (fieldData: {
    name: string;
    label: string;
    responseType: string;
    required: string;
    options: string[];
  }) => {
    const newField = {
      id: editingField?.id || crypto.randomUUID(),
      name: fieldData.name,
      standardQuestion: fieldData.label,
    };

    if (editingField) {
      setFields(fields.map((f) => (f.id === editingField.id ? newField : f)));
    } else {
      setFields([...fields, newField]);
    }
    setIsModalOpen(false);
  };

  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="h6">Fields</Typography>
        <IconButton size="small" onClick={() => setHelpDialogOpen(true)}>
          <HelpCircle size={20} />
        </IconButton>
      </Box>

      <Stack
        direction="row"
        sx={{ mb: 1 }}
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Button
          variant="soft"
          startIcon={<Plus size={16} />}
          onClick={handleAddField}
        >
          Add Field
        </Button>
        <TextField
          size="small"
          placeholder="Search fields..."
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

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Field Name</TableCell>
              <TableCell>Standard question</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {fields.map((field) => (
              <TableRow key={field.id}>
                <TableCell>{field.name}</TableCell>
                <TableCell>
                  <Typography variant="body2">
                    {field.standardQuestion}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => handleEditField(field)}
                    >
                      <Edit2 size={18} />
                    </IconButton>
                    <IconButton
                      size="small"
                      color="error"
                      onClick={() => handleDeleteField(field.id)}
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

      <AddFieldModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveField}
      />

      <HelpDialog
        open={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
        title={helpContent?.title || 'Fields'}
        description={helpContent?.description || 'Set which information you would like the AI to do its best to collect during conversations. Note that the AI may rephrase questions based on the context and may not always be able to capture the requested information.'}
      />
    </Box>
  );
}