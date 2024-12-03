import React, { useState } from 'react';
import {
  Box,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  ListItemButton,
  Divider,
} from '@mui/material';
import {
  MoreVertical,
  User,
  Settings,
  UserPlus,
  Moon,
  Sun,
  LogOut,
} from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export function UserMenu() {
  const { mode, toggleTheme } = useTheme();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
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
    </Box>
  );
}