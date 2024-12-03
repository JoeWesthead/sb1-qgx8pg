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

interface FollowUpsData {
  email: string;
  integrationSettings: {
    sendAutomatically: boolean;
    sendAsType: 'lead' | 'case';
    includeTranscript: boolean;
    sendToVisitor: boolean;
  };
}

const defaultIntegrationSettings = {
  sendAutomatically: false,
  sendAsType: 'case' as const,
  includeTranscript: false,
  sendToVisitor: false,
};

interface FollowUpsSectionProps {
  initialData: FollowUpsData;
  onSave: (data: FollowUpsData) => void;
}

export function FollowUpsSection({
  initialData,
  onSave,
}: FollowUpsSectionProps) {
  const [data, setData] = useState<FollowUpsData>({
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
    data.integrationSettings.includeTranscript !==
      (initialData.integrationSettings?.includeTranscript ?? false) ||
    data.integrationSettings.sendToVisitor !==
      (initialData.integrationSettings?.sendToVisitor ?? false);

  const handleSettingChange = (
    setting: keyof FollowUpsData['integrationSettings']
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
          <Typography variant="subtitle2" sx={{ mb: 0.5 }}>
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

        <Stack>
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
                  Send follow-ups automatically
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Send follow-up emails without manual trigger
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
