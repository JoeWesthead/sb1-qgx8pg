import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Stack,
  FormControl,
  FormControlLabel,
  Checkbox,
  Link,
  Paper,
  RadioGroup,
  Radio,
} from '@mui/material';
import { SectionFooter } from '../common/SectionFooter';

interface TranscriptsData {
  email: string;
  integrationSettings: {
    sendAutomatically: boolean;
    sendAsType: 'lead' | 'case';
    sendOfflineMessages: boolean;
    sendAllEvents: boolean;
  };
}

const defaultIntegrationSettings = {
  sendAutomatically: false,
  sendAsType: 'case' as const,
  sendOfflineMessages: false,
  sendAllEvents: false,
};

interface TranscriptsSectionProps {
  initialData: TranscriptsData;
  onSave: (data: TranscriptsData) => void;
}

export function TranscriptsSection({
  initialData,
  onSave,
}: TranscriptsSectionProps) {
  const [data, setData] = useState<TranscriptsData>({
    email: initialData.email || '',
    integrationSettings: {
      ...defaultIntegrationSettings,
      ...(initialData.integrationSettings || {}),
    },
  });

  const hasChanges =
    data.email !== initialData.email ||
    data.integrationSettings.sendAutomatically !==
      (initialData.integrationSettings?.sendAutomatically ?? false) ||
    data.integrationSettings.sendAsType !==
      (initialData.integrationSettings?.sendAsType ?? 'case') ||
    data.integrationSettings.sendOfflineMessages !==
      (initialData.integrationSettings?.sendOfflineMessages ?? false) ||
    data.integrationSettings.sendAllEvents !==
      (initialData.integrationSettings?.sendAllEvents ?? false);

  const handleSettingChange = (
    setting: keyof TranscriptsData['integrationSettings']
  ) => {
    setData((prev) => ({
      ...prev,
      integrationSettings: {
        ...prev.integrationSettings,
        [setting]: !prev.integrationSettings[setting],
      },
    }));
  };

  const handleSave = () => {
    onSave(data);
  };

  const handleCancel = () => {
    setData({
      email: initialData.email || '',
      integrationSettings: {
        ...defaultIntegrationSettings,
        ...(initialData.integrationSettings || {}),
      },
    });
  };

  return (
    <>
      <Paper sx={{ p: 3, mb: 6, position: 'relative' }} variant="outlined">
        <FormControl sx={{ mb: 4 }}>
          <Typography variant="subtitle2" gutterBottom>
            Email destination
          </Typography>
          <TextField
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
            size="small"
            type="email"
            placeholder="Enter email address"
            sx={{ maxWidth: 400 }}
          />
        </FormControl>

        <Typography variant="subtitle2" sx={{ mb: 1 }}>
          Salesforce
        </Typography>

        <Stack spacing={2}>
          <FormControlLabel
            control={
              <Checkbox
                checked={data.integrationSettings.sendAutomatically}
                onChange={() => handleSettingChange('sendAutomatically')}
              />
            }
            label={
              <Box>
                <Typography variant="body1">
                  Send all transcripts automatically
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Send chat transcripts without typing a command
                </Typography>
              </Box>
            }
          />

          {data.integrationSettings.sendAutomatically && (
            <Box sx={{ ml: 4 }}>
              <Typography variant="subtitle2" gutterBottom>
                Send as
              </Typography>
              <RadioGroup
                value={data.integrationSettings.sendAsType}
                onChange={(e) =>
                  setData((prev) => ({
                    ...prev,
                    integrationSettings: {
                      ...prev.integrationSettings,
                      sendAsType: e.target.value as 'lead' | 'case',
                    },
                  }))
                }
              >
                <FormControlLabel
                  value="lead"
                  control={<Radio size="small" />}
                  label="Lead"
                />
                <FormControlLabel
                  value="case"
                  control={<Radio size="small" />}
                  label="Case"
                />
              </RadioGroup>
            </Box>
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={data.integrationSettings.sendAllEvents}
                onChange={() => handleSettingChange('sendAllEvents')}
              />
            }
            label={
              <Box>
                <Typography variant="body1">Send all events</Typography>
                <Typography variant="body2" color="text.secondary">
                  Send all events to this webhook. Learn more about this feature
                  in the{' '}
                  <Link href="#" underline="hover">
                    documentation
                  </Link>
                  .
                </Typography>
              </Box>
            }
          />
        </Stack>

        <SectionFooter
          hasChanges={hasChanges}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Paper>
    </>
  );
}
