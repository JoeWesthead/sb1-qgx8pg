import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Tooltip,
  Avatar,
  AvatarGroup,
  Link,
  Stack,
} from '@mui/material';
import { Plus, Edit2, Trash2, Users, UserPlus } from 'lucide-react';
import { usePreview } from '../context/PreviewContext';

const teamMembers = [
  {
    name: 'Riley Carter',
    email: 'riley@email.com',
    role: 'Admin',
    status: 'Active',
    avatar:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
    groups: ['Customer Support', 'Management'],
  },
  {
    name: 'Alex Johnson',
    email: 'alex@email.com',
    role: 'Agent',
    status: 'Active',
    avatar:
      'https://images.unsplash.com/photo-1599566150163-29194dcaad36?w=100',
    groups: ['Sales Team'],
  },
  {
    name: 'Jordan Lee',
    email: 'jordan@email.com',
    role: 'Agent',
    status: 'Away',
    avatar:
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
    groups: ['Customer Support'],
  },
  {
    name: 'Sam Wilson',
    email: 'sam@email.com',
    role: 'Account Owner',
    status: 'Active',
    avatar:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100',
    groups: ['Technical Support', 'Management'],
  },
];

const groups = [
  {
    name: 'Customer Support',
    description: 'Front-line customer service team',
    members: ['Riley Carter', 'Jordan Lee'],
    chatLimit: 3,
    status: 'Active',
  },
  {
    name: 'Sales Team',
    description: 'Product sales and demos',
    members: ['Alex Johnson'],
    chatLimit: 2,
    status: 'Active',
  },
  {
    name: 'Technical Support',
    description: 'Advanced technical assistance',
    members: ['Sam Wilson'],
    chatLimit: 4,
    status: 'Active',
  },
  {
    name: 'Management',
    description: 'Team supervisors and admins',
    members: ['Riley Carter', 'Sam Wilson'],
    chatLimit: 5,
    status: 'Active',
  },
];

export function TeamManagement() {
  const { isPreviewOpen } = usePreview();

  const getStatusChip = (status: string) => (
    <Chip
      size="small"
      label={status}
      sx={{
        bgcolor: status === 'Active' ? 'success.light' : 'warning.light',
        color: status === 'Active' ? 'success.dark' : 'warning.dark',
        fontWeight: 500,
      }}
    />
  );

  const getRoleChip = (role: string) => (
    <Chip
      size="small"
      label={role}
      sx={{
        bgcolor:
          role === 'AI'
            ? 'secondary.main'
            : role === 'Admin'
            ? 'primary.main'
            : 'action.selected',
        color:
          role === 'AI' || role === 'Admin'
            ? 'primary.contrastText'
            : 'text.primary',
      }}
    />
  );

  return (
    <Box
      sx={{
        px: 8,
        pt: 2,
        bgcolor: 'background.default',
        // transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
        marginRight: isPreviewOpen ? '400px' : 0,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Manage Team
      </Typography>

      {/* Groups Section */}
      <Box sx={{ mb: 6 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h6">Groups</Typography>
            <Typography variant="body2" color="text.secondary">
              Create Groups of teammates. Your <Link href="#">AI Variant</Link>{' '}
              can decide which to route to, or else route to the default group
              in your <Link href="#">Ground Rules</Link>. You can also write
              your own logic using our client-side{' '}
              <Link href="#">JavaScript API</Link>.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<Users size={16} />}
            size="small"
          >
            Create Group
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ mb: 2 }} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Group Name</TableCell>
                <TableCell>Members</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {groups.map((group) => (
                <TableRow key={group.name}>
                  <TableCell>
                    <Typography>{group.name}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <AvatarGroup max={3} sx={{ mr: 1 }}>
                        {group.members.map((member) => {
                          const teamMember = teamMembers.find(
                            (m) => m.name === member
                          );
                          return (
                            <Tooltip key={member} title={member}>
                              <Avatar
                                src={teamMember?.avatar}
                                sx={{ width: 24, height: 24 }}
                              />
                            </Tooltip>
                          );
                        })}
                      </AvatarGroup>
                      <Typography variant="body2" color="text.secondary">
                        {group.members.length}{' '}
                        {group.members.length === 1 ? 'member' : 'members'}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Tooltip title="Edit group">
                        <IconButton size="small">
                          <Edit2 size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Remove group">
                        <IconButton size="small" color="error">
                          <Trash2 size={18} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      {/* Team Members Section */}
      <Box>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            mb: 2,
          }}
        >
          <Box>
            <Typography variant="h6">Users</Typography>
            <Typography variant="body2" color="text.secondary">
              Add admins and agents to your account. Admins can view and change
              settings, while agents can operate inside the Olark Inbox.
            </Typography>
          </Box>

          <Button
            variant="outlined"
            startIcon={<UserPlus size={16} />}
            size="small"
          >
            Add User
          </Button>
        </Box>

        <TableContainer component={Paper} sx={{ mb: 2 }} variant="outlined">
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Groups</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {teamMembers.map((member) => (
                <TableRow
                  key={member.email}
                  sx={
                    member.role === 'AI'
                      ? {
                          bgcolor: 'action.hover',
                        }
                      : undefined
                  }
                >
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                      <Avatar
                        src={member.avatar}
                        sx={{ width: 24, height: 24 }}
                      />
                      {member.name}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {member.email}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ color: 'text.secondary' }}>
                      {member.role}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Stack direction="row" gap={0.5}>
                      {member.groups.map((group, index) => (
                        <Typography
                          key={`${member.email}-${group}`}
                          sx={{ color: 'text.secondary' }}
                        >
                          {group} {index < member.groups.length - 1 ? '•' : ''}
                        </Typography>
                      ))}
                    </Stack>
                  </TableCell>
                  <TableCell align="right">
                    <Box
                      sx={{
                        display: 'flex',
                        gap: 1,
                        justifyContent: 'flex-end',
                      }}
                    >
                      <Tooltip title="Edit member">
                        <IconButton size="small">
                          <Edit2 size={18} />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Remove member">
                        <IconButton size="small" color="error">
                          <Trash2 size={18} />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
}
