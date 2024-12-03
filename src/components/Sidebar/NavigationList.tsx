import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Tooltip,
  ListSubheader,
} from '@mui/material';
import {
  Palette,
  Settings,
  Wrench,
  Puzzle,
  Users,
  Power,
  CreditCard,
  Scroll,
  Zap,
  ZapOff,
} from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { configOptions } from '../../config/settingsConfig';

const globalSettings = [
  { icon: Palette, text: 'Widget Appearance', path: '/chat-appearance' },
  { icon: Scroll, text: 'Ground Rules', path: '/chat-settings' },
  { icon: Wrench, text: 'Human Tools', path: '/human-settings' },
  { icon: Puzzle, text: 'Integrations', path: '/integrations' },
  { icon: Users, text: 'Manage Team', path: '/team' },
  { icon: Power, text: 'Deploy', path: '/configuration' },
  { icon: CreditCard, text: 'Billing', path: '/billing' },
];

export function NavigationList() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentPreset, setCurrentPreset } = useConfig();

  const isSelected = (path: string) => location.pathname === path;

  const deployedConfigs = configOptions.filter((option) => option === 'Aiden');
  const testingConfigs = configOptions.filter((option) => option !== 'Aiden');

  return (
    <Box sx={{ px: 1 }}>
      <List
        dense
        subheader={
          <ListSubheader 
            sx={{ 
              mt: 1, 
              mb: 0.5,
              bgcolor: 'inherit',
              position: 'relative'
            }}
          >
            <Typography variant="subtitle2">AI Variants</Typography>
          </ListSubheader>
        }
      >
        {deployedConfigs.map((config) => (
          <ListItem key={config} disablePadding>
            <ListItemButton
              onClick={() => {
                setCurrentPreset(config);
                navigate('/');
              }}
              selected={currentPreset === config && location.pathname === '/'}
              sx={(theme) => ({
                borderRadius: 1,
                mb: 0.5,
                transition: 'background-color 0.2s',
                '&.Mui-selected': {
                  bgcolor: `${theme.palette.primary.main}14`,
                  '&:hover': {
                    bgcolor: `${theme.palette.primary.main}24`,
                  },
                },
              })}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <Zap size={16} />
              </ListItemIcon>
              <ListItemText
                primary={config}
                primaryTypographyProps={{
                  variant: 'body2',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
        {testingConfigs.map((config) => (
          <ListItem key={config} disablePadding>
            <ListItemButton
              onClick={() => {
                setCurrentPreset(config);
                navigate('/');
              }}
              selected={currentPreset === config && location.pathname === '/'}
              sx={(theme) => ({
                borderRadius: 1,
                mb: 0.5,
                transition: 'background-color 0.2s',
                '&.Mui-selected': {
                  bgcolor: `${theme.palette.primary.main}14`,
                  '&:hover': {
                    bgcolor: `${theme.palette.primary.main}24`,
                  },
                },
              })}
            >
              <ListItemIcon sx={{ minWidth: 36 }}>
                <ZapOff size={16} />
              </ListItemIcon>
              <ListItemText
                primary={config}
                primaryTypographyProps={{
                  variant: 'body2',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <List
        dense
        subheader={
          <ListSubheader 
            sx={{ 
              mt: 1, 
              mb: 0.5,
              bgcolor: 'inherit',
              position: 'relative'
            }}
          >
            <Typography variant="subtitle2">Global Settings</Typography>
          </ListSubheader>
        }
      >
        {globalSettings.map((item) => {
          const Icon = item.icon;
          const selected = isSelected(item.path);
          return (
            <ListItem key={item.text} disablePadding>
              <Tooltip title={item.tooltip || ''} placement="right">
                <ListItemButton
                  onClick={() => navigate(item.path)}
                  selected={selected}
                  sx={(theme) => ({
                    borderRadius: 1,
                    mb: 0.5,
                    transition: 'background-color 0.2s',
                    '&.Mui-selected': {
                      bgcolor: `${theme.palette.primary.main}14`,
                      '&:hover': {
                        bgcolor: `${theme.palette.primary.main}24`,
                      },
                    },
                  })}
                >
                  <ListItemIcon sx={{ minWidth: 36 }}>
                    <Icon size={20} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item.text}
                    primaryTypographyProps={{
                      variant: 'body2',
                    }}
                  />
                </ListItemButton>
              </Tooltip>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
}