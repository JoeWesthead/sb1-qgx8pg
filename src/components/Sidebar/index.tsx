import React from 'react';
import { Box, Drawer, useTheme } from '@mui/material';
import { Logo } from '../Logo';
import { UserMenu } from './UserMenu';
import { NavigationList } from './NavigationList';
import { ManagementList } from './ManagementList';

const DRAWER_WIDTH = 280;

export function Sidebar() {
  const theme = useTheme();

  return (
    <Drawer
      variant="permanent"
      transitionDuration={0}
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
          borderRight: '1px solid',
          borderColor: 'divider',
          borderRadius: 0,
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden',
        },
      }}
    >
      <Box
        sx={{
          p: 2,
          flexShrink: 0,
          borderBottom: '1px solid',
          borderColor: 'divider',
        }}
      >
        <Logo />
      </Box>

      <Box
        sx={{
          flex: 1,
          overflowY: 'auto',
          overflowX: 'hidden',
          '&::-webkit-scrollbar': {
            width: 6,
          },
          '&::-webkit-scrollbar-track': {
            background: 'transparent',
          },
          '&::-webkit-scrollbar-thumb': {
            background:
              theme.palette.mode === 'light'
                ? 'rgba(0,0,0,0.2)'
                : 'rgba(255,255,255,0.2)',
            borderRadius: 3,
          },
        }}
      >
        <NavigationList />
      </Box>

      <Box sx={{ flexShrink: 0 }}>
        <ManagementList />
        <UserMenu />
      </Box>
    </Drawer>
  );
}
