import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Typography,
  Box,
  IconButton,
  Chip,
  Stack,
} from '@mui/material';
import { X, Plus } from 'lucide-react';

interface StockAnswerModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (answer: { answer: string; questions: string[] }) => void;
  initialData?: { answer: string; questions: string[] };
}

export function StockAnswerModal({ 
  open, 
  onClose, 
  onSave,
  initialData 
}: StockAnswerModalProps) {
  const [answer, setAnswer] = useState(initialData?.answer || '');
  const [currentQuestion, setCurrentQuestion] = useState('');
  const [questions, setQuestions] = useState<string[]>(initialData?.questions || []);

  const handleClose = () => {
    setAnswer('');
    setCurrentQuestion('');
    setQuestions([]);
    onClose();
  };

  const handleAddQuestion = () => {
    if (currentQuestion.trim()) {
      setQuestions([...questions, currentQuestion.trim()]);
      setCurrentQuestion('');
    }
  };

  const handleRemoveQuestion = (index: number) => {
    setQuestions(questions.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    if (answer.trim() && questions.length > 0) {
      onSave({ answer: answer.trim(), questions });
      handleClose();
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
    >
      <DialogTitle>
        <Typography variant="h6" component="div">
          Add Stock Answer
        </Typography>
      </DialogTitle>

      <DialogContent dividers>
        <Box sx={{ mb: 3 }}>
          <Typography variant="subtitle1" gutterBottom>
            Stock Answer
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Enter the response you want the AI to use for matching example questions
          </Typography>
          <TextField
            multiline
            rows={4}
            fullWidth
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            placeholder="Enter your stock answer..."
          />
        </Box>

        <Box>
          <Typography variant="subtitle1" gutterBottom>
            Example Questions
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            List questions that should trigger the Stock Answer
          </Typography>
          
          <Stack spacing={2}>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <TextField
                fullWidth
                size="small"
                value={currentQuestion}
                onChange={(e) => setCurrentQuestion(e.target.value)}
                placeholder="Enter an example question..."
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddQuestion();
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddQuestion}
                disabled={!currentQuestion.trim()}
                startIcon={<Plus size={18} />}
              >
                Add
              </Button>
            </Box>

            <Stack spacing={1} direction="row" flexWrap="wrap" useFlexGap>
              {questions.map((question, index) => (
                <Chip
                  key={index}
                  label={question}
                  onDelete={() => handleRemoveQuestion(index)}
                  sx={{ maxWidth: '100%' }}
                />
              ))}
            </Stack>
          </Stack>
        </Box>
      </DialogContent>

      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button 
          variant="contained"
          onClick={handleSave}
          disabled={!answer.trim() || questions.length === 0}
        >
          Save Answer
        </Button>
      </DialogActions>
    </Dialog>
  );
}