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
  Alert,
} from '@mui/material';
import { Plus, Edit2, Trash2, HelpCircle } from 'lucide-react';
import { AddFieldModal } from './AddFieldModal';
import { HelpDialog } from '../common/HelpDialog';

interface Field {
  id: string;
  name: string;
  fieldName: string;
  required: string;
}

interface FollowupFormData {
  fields: Field[];
}

interface FollowupFormSectionProps {
  initialData: FollowupFormData;
  onSave: (data: FollowupFormData) => void;
  hasAIFields?: boolean;
}

const defaultFields: Field[] = [
  {
    id: '1',
    name: 'Name',
    fieldName: 'visitorName',
    required: 'Always required',
  },
  {
    id: '2',
    name: 'Email',
    fieldName: 'visitorEmail',
    required: 'Always required',
  },
  {
    id: '3',
    name: 'Message',
    fieldName: 'visitorMessage',
    required: 'Always required',
  },
];

export function FollowupFormSection({
  initialData,
  onSave,
  hasAIFields = false,
}: FollowupFormSectionProps) {
  const [data, setData] = useState<FollowupFormData>({
    fields: initialData.fields.length > 0 ? initialData.fields : defaultFields,
  });
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const [editingField, setEditingField] = useState<Field | null>(null);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);

  const handleAddField = (fieldData: {
    name: string;
    fieldName: string;
    label: string;
    responseType: string;
    required: string;
    options: string[];
  }) => {
    const newField: Field = {
      id: crypto.randomUUID(),
      name: fieldData.name,
      fieldName: fieldData.fieldName,
      required: fieldData.required,
    };

    setData((prev) => ({
      fields: [...prev.fields, newField],
    }));
    onSave({
      fields: [...data.fields, newField],
    });
    setIsAddFieldModalOpen(false);
  };

  const handleEditField = (field: Field) => {
    setEditingField(field);
    setIsAddFieldModalOpen(true);
  };

  const handleRemoveField = (id: string) => {
    const newFields = data.fields.filter((field) => field.id !== id);
    setData({ fields: newFields });
    onSave({ fields: newFields });
  };

  return (
    <Stack sx={{ mb: 6 }}>
      <Box sx={{ mb: 1 }}>
        <Button
          startIcon={<Plus size={16} />}
          size="small"
          onClick={() => {
            setEditingField(null);
            setIsAddFieldModalOpen(true);
          }}
          variant="soft"
        >
          Add Field
        </Button>
      </Box>

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Field Name</TableCell>
              <TableCell>Form Prompt</TableCell>
              <TableCell>When Required</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.fields.map((field) => (
              <TableRow key={field.id}>
                <TableCell>
                  <Typography color="text.secondary">
                    {field.fieldName}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="text.secondary">{field.name}</Typography>
                </TableCell>
                <TableCell>
                  <Typography color="text.secondary">
                    {field.required}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}
                  >
                    <Tooltip title="Edit field">
                      <IconButton
                        size="small"
                        onClick={() => handleEditField(field)}
                      >
                        <Edit2 size={18} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove field">
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => handleRemoveField(field.id)}
                      >
                        <Trash2 size={18} />
                      </IconButton>
                    </Tooltip>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
            {data.fields.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} align="center">
                  <Typography color="text.secondary">
                    No fields have been added
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      <AddFieldModal
        open={isAddFieldModalOpen}
        onClose={() => setIsAddFieldModalOpen(false)}
        onSave={handleAddField}
        initialData={editingField || undefined}
      />

      <HelpDialog
        open={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
        title="Follow-up Survey"
        description="This form appears when no agents are available and AI assistance is not enabled. It allows visitors to leave their contact information and message for follow-up."
      />
    </Stack>
  );
}
