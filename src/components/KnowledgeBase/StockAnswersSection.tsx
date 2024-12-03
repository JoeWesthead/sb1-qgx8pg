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
  Stack,
  Chip,
  Paper,
} from '@mui/material';
import { Plus, Edit2, Trash2, HelpCircle } from 'lucide-react';

interface StockAnswer {
  id: string;
  answer: string;
  questions: string[];
}

interface StockAnswersSectionProps {
  answers: StockAnswer[];
  onAddAnswer: () => void;
  onEditAnswer: (answer: StockAnswer) => void;
  onDeleteAnswer: (id: string) => void;
}

export function StockAnswersSection({ 
  answers, 
  onAddAnswer, 
  onEditAnswer, 
  onDeleteAnswer 
}: StockAnswersSectionProps) {
  return (
    <Box sx={{ mb: 6 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          Stock Phrases
        </Typography>
        <IconButton size="small">
          <HelpCircle size={20} />
        </IconButton>
      </Box>

      <TableContainer component={Paper} variant="outlined" sx={{ mb: 4 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Stock Phrase</TableCell>
              <TableCell>Example Prompts</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {answers.map((qa) => (
              <TableRow key={qa.id}>
                <TableCell>{qa.answer}</TableCell>
                <TableCell>
                  <Stack direction="row" spacing={1} flexWrap="wrap" gap={1}>
                    {qa.questions.map((q, i) => (
                      <Chip key={i} label={q} size="small" />
                    ))}
                  </Stack>
                </TableCell>
                <TableCell align="right">
                  <Box sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}>
                    <Tooltip title="Edit phrase">
                      <IconButton 
                        size="small"
                        onClick={() => onEditAnswer(qa)}
                      >
                        <Edit2 size={18} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Delete answer">
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => onDeleteAnswer(qa.id)}
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
        size="small"
        onClick={onAddAnswer}
      >
        Add Stock Phrase
      </Button>
    </Box>
  );
}