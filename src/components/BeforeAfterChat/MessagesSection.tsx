import React, { useState } from 'react';
import { Box, Typography, TextField, Paper } from '@mui/material';
import { SectionFooter } from '../common/SectionFooter';

interface MessagesData {
  welcomeMessage: string;
  goodbyeMessage: string;
}

interface MessagesSectionProps {
  initialData: MessagesData;
  onSave: (data: MessagesData) => void;
}

const defaultMessages = {
  welcomeMessage: 'Hi there! How can I help you today?',
  goodbyeMessage: 'Thank you for chatting with us. Have a great day!',
};

export function MessagesSection({
  initialData = defaultMessages,
  onSave,
}: MessagesSectionProps) {
  const [data, setData] = useState<MessagesData>(initialData);

  const hasChanges =
    data.welcomeMessage !== initialData.welcomeMessage ||
    data.goodbyeMessage !== initialData.goodbyeMessage;

  const handleSave = () => {
    onSave(data);
  };

  const handleCancel = () => {
    setData(initialData);
  };

  return (
    <>
      <Paper sx={{ p: 3, mb: 6 }} variant="outlined">
        <Box sx={{ mb: 4 }}>
          <Typography variant="subtitle2" gutterBottom>
            Welcome Message
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            The first message visitors see when starting a chat
          </Typography>
          <TextField
            multiline
            rows={3}
            fullWidth
            value={data.welcomeMessage}
            onChange={(e) =>
              setData({ ...data, welcomeMessage: e.target.value })
            }
            placeholder="Enter welcome message"
            size="small"
          />
        </Box>

        <Box>
          <Typography variant="subtitle2" gutterBottom>
            Goodbye Message
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
            The message visitors see when a chat ends
          </Typography>
          <TextField
            multiline
            rows={3}
            fullWidth
            value={data.goodbyeMessage}
            onChange={(e) =>
              setData({ ...data, goodbyeMessage: e.target.value })
            }
            placeholder="Enter goodbye message"
            size="small"
          />
        </Box>

        <SectionFooter
          hasChanges={hasChanges}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Paper>
    </>
  );
}
