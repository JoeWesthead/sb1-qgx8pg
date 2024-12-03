import React, { useState } from 'react';
import { Box, Tabs, Tab, Stack, Typography, Chip } from '@mui/material';
import { Plus, Zap, ZapOff } from 'lucide-react';
import { configOptions } from '../../config/settingsConfig';
import { NewConfigModal } from './NewConfigModal';

interface ConfigurationSelectorProps {
  currentPreset: string;
  onConfigChange: (value: string) => void;
}

export function ConfigurationSelector({
  currentPreset,
  onConfigChange,
}: ConfigurationSelectorProps) {
  const [isNewConfigModalOpen, setIsNewConfigModalOpen] = useState(false);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    if (newValue === 'new') {
      setIsNewConfigModalOpen(true);
      return;
    }
    onConfigChange(newValue);
  };

  const handleCreateConfig = (name: string, copyFrom?: string) => {
    // Here you would typically make an API call to create the new configuration
    console.log('Creating new variant:', { name, copyFrom });
    setIsNewConfigModalOpen(false);
  };

  const deployedConfigs = configOptions.filter((option) => option === 'Aiden');
  const testingConfigs = configOptions.filter((option) => option !== 'Aiden');

  const StatusIndicator = ({ active }: { active: boolean }) => (
    <>
      {active ? (
        <Zap size={14} fill="currentColor" stroke="currentColor" />
      ) : (
        <ZapOff size={14} />
      )}
    </>
  );

  return (
    <>
      <Box
        sx={{
          borderBottom: 1,
          borderColor: 'divider',
        }}
      >
        <Tabs
          value={currentPreset}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            '& .MuiTab-root': {
              minHeight: 56,
              px: 2,
            },
          }}
        >
          {deployedConfigs.map((config) => (
            <Tab
              disableRipple
              key={config}
              value={config}
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <StatusIndicator active={true} />
                  <span>{config}</span>
                </Stack>
              }
            />
          ))}
          {testingConfigs.map((config) => (
            <Tab
              disableRipple
              key={config}
              value={config}
              label={
                <Stack direction="row" spacing={1} alignItems="center">
                  <StatusIndicator active={false} />
                  <span>{config}</span>
                </Stack>
              }
            />
          ))}
          <Tab
            disableRipple
            value="new"
            icon={<Plus size={16} />}
            iconPosition="start"
            label="Add AI Variant"
            sx={{ marginLeft: 'auto' }}
          />
        </Tabs>
      </Box>

      <NewConfigModal
        open={isNewConfigModalOpen}
        onClose={() => setIsNewConfigModalOpen(false)}
        onCreateConfig={handleCreateConfig}
      />
    </>
  );
}
