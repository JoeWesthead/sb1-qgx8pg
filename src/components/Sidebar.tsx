import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  Divider,
  Avatar,
  Menu,
  IconButton,
  Tooltip,
  MenuItem,
  ListSubheader,
} from '@mui/material';
import {
  Palette,
  Settings,
  Brain,
  Wrench,
  Inbox,
  BarChart2,
  FileText,
  Puzzle,
  CreditCard,
  User,
  LogOut,
  UserPlus,
  MoreVertical,
  Power,
  Moon,
  Sun,
  Users,
  Scroll,
  Zap,
  ZapOff,
  TestTube,
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';
import { useConfig } from '../context/ConfigContext';
import { configOptions } from '../config/settingsConfig';
import { Logo } from './Logo';

const DRAWER_WIDTH = 280;

const globalSettings = [
  { icon: Palette, text: 'Widget Appearance', path: '/chat-appearance' },
  { icon: Scroll, text: 'Ground Rules', path: '/chat-settings' },
  { icon: Wrench, text: 'Human Tools', path: '/human-settings' },
  { icon: Puzzle, text: 'Integrations', path: '/integrations' },
  { icon: Users, text: 'Manage Team', path: '/team' },
  { icon: Power, text: 'Deploy', path: '/configuration' },
  { icon: CreditCard, text: 'Billing', path: '/billing' },
];

const managementItems = [
  { icon: Inbox, text: 'Open Inbox', path: '/inbox', primary: true },
  { icon: BarChart2, text: 'Reporting', path: '/reporting' },
  { icon: FileText, text: 'Transcripts', path: '/transcripts' },
];

export function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { mode, toggleTheme } = useTheme();
  const { currentPreset, setCurrentPreset } = useConfig();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const isSelected = (path: string) => location.pathname === path;

  const deployedConfigs = configOptions.filter((option) => option === 'Aiden');
  const testingConfigs = configOptions.filter((option) => option !== 'Aiden');

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          borderRadius: 0,
        },
      }}
    >
      <Box sx={{ p: 2 }}>
        <Logo />
      </Box>

      <Box sx={{ px: 1 }}>
        <List
          dense
          subheader={
            <ListSubheader sx={{ mt: 1, mb: 0.5 }}>
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
                sx={{ borderRadius: 1, mb: 0.5 }}
              >
                <ListItemIcon>
                  <Zap fill="currentColor" size={16} />
                </ListItemIcon>
                <ListItemText
                  primary={config}
                  secondaryTypographyProps={{
                    variant: 'caption',
                    sx: { color: 'success.main' },
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
                sx={{ borderRadius: 1, mb: 0.5 }}
              >
                <ListItemIcon>
                  <ZapOff size={16} />
                </ListItemIcon>
                <ListItemText
                  primary={config}
                  secondaryTypographyProps={{
                    variant: 'caption',
                    sx: { color: 'text.secondary' },
                  }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>

        <List
          dense
          subheader={
            <ListSubheader sx={{ mt: 1, mb: 0.5 }}>
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
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                    }}
                  >
                    <ListItemIcon>
                      <Icon size={20} />
                    </ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Box sx={{ flexGrow: 1 }} />

      <Box sx={{ p: 2 }}>
        <List dense>
          {managementItems.map((item) => {
            const Icon = item.icon;
            const selected = isSelected(item.path);
            return (
              <ListItem key={item.text} disablePadding>
                <Tooltip title={item.tooltip || ''} placement="right">
                  <ListItemButton
                    onClick={() => navigate(item.path)}
                    selected={selected}
                    sx={{
                      borderRadius: 1,
                      mb: 0.5,
                      ...(item.primary && {
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        '&:hover': {
                          bgcolor: 'primary.main',
                        },
                      }),
                    }}
                  >
                    <ListItemIcon
                      sx={item.primary ? { color: 'inherit' } : undefined}
                    >
                      <Icon size={20} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.text}
                      sx={
                        item.primary
                          ? { '*': { color: 'primary.contrastText' } }
                          : undefined
                      }
                    />
                  </ListItemButton>
                </Tooltip>
              </ListItem>
            );
          })}
        </List>
      </Box>

      <Divider />

      <Box>
        <ListItem
          secondaryAction={
            <IconButton edge="end" onClick={handleMenuOpen}>
              <MoreVertical size={20} />
            </IconButton>
          }
        >
          <ListItemIcon>
            <Avatar
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100"
              sx={{ width: 32, height: 32 }}
            />
          </ListItemIcon>
          <ListItemText
            primary="Riley Carter"
            secondary="riley@email.com"
            primaryTypographyProps={{ variant: 'subtitle2' }}
            secondaryTypographyProps={{ variant: 'caption' }}
          />
        </ListItem>
      </Box>

      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            minWidth: 200,
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1.5,
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <User size={20} />
          </ListItemIcon>
          Profile
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <Settings size={20} />
          </ListItemIcon>
          My account
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <UserPlus size={20} />
          </ListItemIcon>
          Add another account
        </MenuItem>
        <MenuItem
          onClick={() => {
            toggleTheme();
            handleMenuClose();
          }}
        >
          <ListItemIcon>
            {mode === 'light' ? <Moon size={20} /> : <Sun size={20} />}
          </ListItemIcon>
          Switch to {mode === 'light' ? 'dark' : 'light'} mode
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleMenuClose}>
          <ListItemIcon>
            <LogOut size={20} />
          </ListItemIcon>
          Logout
        </MenuItem>
      </Menu>
    </Drawer>
  );
}
