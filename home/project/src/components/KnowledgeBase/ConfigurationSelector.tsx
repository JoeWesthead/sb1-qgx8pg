import React from 'react';
import {
  Box,
  FormControl,
  Select,
  MenuItem,
  ListItemText,
  ListItemIcon,
  ListSubheader,
  Avatar,
  Divider,
  selectClasses,
  ListItemAvatar,
  Stack,
  Typography,
} from '@mui/material';
import { Bot, Plus, Laptop, Brain, Zap, Flask } from 'lucide-react';
import { configOptions } from '../../config/settingsConfig';

interface ConfigurationSelectorProps {
  currentPreset: string;
  onConfigChange: (value: string) => void;
}

export function ConfigurationSelector({
  currentPreset,
  onConfigChange,
}: ConfigurationSelectorProps) {
  const getIcon = (preset: string, isDeployed: boolean) => {
    if (isDeployed) return <Zap size={16} />;
    return <Flask size={16} />;
  };

  const getDescription = (preset: string, isDeployed: boolean) => {
    if (isDeployed) {
      return (
        <Stack direction="row" spacing={1} alignItems="center">
          <Box
            sx={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              bgcolor: 'success.main',
            }}
          />
          <Typography variant="caption" sx={{ color: 'text.secondary' }}>
            Deployed on example.co.uk
          </Typography>
        </Stack>
      );
    }
    return (
      <Typography variant="caption" sx={{ color: 'text.secondary' }}>
        Not yet deployed
      </Typography>
    );
  };

  const deployedConfigs = configOptions.filter((option) => option === 'Aiden');
  const testingConfigs = configOptions.filter((option) => option !== 'Aiden');

  return (
    <Box sx={{ mb: 4 }}>
      <FormControl fullWidth>
        <Select
          value={currentPreset}
          onChange={(e) => onConfigChange(e.target.value)}
          displayEmpty
          inputProps={{ 'aria-label': 'Select AI Variant' }}
          sx={{
            maxHeight: 56,
            width: '100%',
            maxWidth: 400,
            '&.MuiList-root': {
              p: '8px',
            },
            [`& .${selectClasses.select}`]: {
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              pl: 1,
            },
          }}
        >
          <ListSubheader sx={{ pt: 0 }}>Deployed</ListSubheader>
          {deployedConfigs.map((option) => (
            <MenuItem key={option} value={option}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                  }}
                >
                  {getIcon(option, true)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={option}
                secondary={getDescription(option, true)}
                primaryTypographyProps={{
                  variant: 'body1',
                  fontWeight: 500,
                }}
              />
            </MenuItem>
          ))}

          <ListSubheader>Testing</ListSubheader>
          {testingConfigs.map((option) => (
            <MenuItem key={option} value={option}>
              <ListItemAvatar>
                <Avatar
                  sx={{
                    width: 32,
                    height: 32,
                    bgcolor: 'secondary.main',
                    color: 'secondary.contrastText',
                  }}
                >
                  {getIcon(option, false)}
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={option}
                secondary={getDescription(option, false)}
                primaryTypographyProps={{
                  variant: 'body1',
                  fontWeight: 500,
                }}
              />
            </MenuItem>
          ))}

          <Divider sx={{ my: 1 }} />

          <MenuItem value="new">
            <ListItemIcon>
              <Plus size={20} />
            </ListItemIcon>
            <ListItemText
              primary="Create new AI Variant"
              secondary="Start from scratch or copy existing"
              primaryTypographyProps={{
                variant: 'body1',
                fontWeight: 500,
              }}
              secondaryTypographyProps={{
                variant: 'caption',
              }}
            />
          </MenuItem>
        </Select>
      </FormControl>
    </Box>
  );
}
