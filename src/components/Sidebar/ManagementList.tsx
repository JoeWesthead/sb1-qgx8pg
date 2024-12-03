import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { Inbox, BarChart2, FileText } from 'lucide-react';

const managementItems = [
  { icon: Inbox, text: 'Open Inbox', path: '/inbox', primary: true },
  { icon: BarChart2, text: 'Reporting', path: '/reporting' },
  { icon: FileText, text: 'Transcripts', path: '/transcripts' },
];

export function ManagementList() {
  const navigate = useNavigate();
  const location = useLocation();

  const isSelected = (path: string) => location.pathname === path;

  return (
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
                  sx={(theme) => ({
                    borderRadius: 1,
                    mb: 0.5,
                    ...(item.primary && {
                      bgcolor: 'primary.main',
                      color: 'primary.contrastText',
                      '&:hover': {
                        bgcolor: 'primary.dark',
                      },
                    }),
                    '&.Mui-selected': {
                      bgcolor: item.primary
                        ? 'primary.main'
                        : `${theme.palette.primary.main}14`,
                      '&:hover': {
                        bgcolor: item.primary
                          ? 'primary.dark'
                          : `${theme.palette.primary.main}24`,
                      },
                    },
                  })}
                >
                  <ListItemIcon
                    sx={item.primary ? { color: 'inherit' } : undefined}
                  >
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
  );
}
