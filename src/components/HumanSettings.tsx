import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControlLabel,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Link,
  IconButton,
  Select,
  MenuItem,
  Divider,
  Stack,
} from '@mui/material';
import { HelpCircle, Plus } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { SettingSection } from './SettingSection';
import { Banner } from './Banner';
import { SkeletonLoader } from './SkeletonLoader';
import { usePreview } from '../context/PreviewContext';
import { TagsSection } from './HumanSettings/TagsSection';

export function HumanSettings() {
  const { currentPreset, isLoading } = useConfig();
  const [enableCoBrowsing, setEnableCoBrowsing] = useState(true);
  const [enableTranslation, setEnableTranslation] = useState(false);
  const [enableUserShortcuts, setEnableUserShortcuts] = useState(false);
  const [shortcutType, setShortcutType] = useState('Any Type');
  const { isPreviewOpen } = usePreview();

  if (isLoading) {
    return <SkeletonLoader />;
  }

  return (
    <Box
      sx={{
        px: 8,
        pt: 2,
        pb: 4,
        bgcolor: 'background.default',
        // transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
        marginRight: isPreviewOpen ? '400px' : 0,
      }}
    >
      <Typography variant="h5" sx={{ mb: 3 }}>
        Human Tools
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-end',
          mb: 2,
        }}
      >
        <Box>
          <Typography variant="h6">Shortcuts</Typography>
          <Typography variant="body2" color="text.secondary">
            Help your agents save time and provide accurate responses. Shortcuts
            let your agents use shortcodes to populate the message composer with
            canned responses.
          </Typography>
        </Box>
        <Button startIcon={<Plus size={16} />} size="small" variant="outlined">
          Add Shortcut
        </Button>
      </Box>

      <TableContainer component={Paper} variant="outlined" sx={{ mb: 6 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Type</TableCell>
              <TableCell>Keyword</TableCell>
              <TableCell>Expanded message</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell colSpan={4} align="center">
                No shortcuts have been added.
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>

      <TagsSection />

      <Box>
        <Typography variant="h6">Feature Access</Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          Control which tools to make available to your agents at the account
          level.
        </Typography>
      </Box>

      <Paper sx={{ p: 3, mb: 6, position: 'relative' }} variant="outlined">
        <Stack gap={2}>
          <FormControlLabel
            control={
              <Switch
                checked={enableCoBrowsing}
                onChange={(e) => setEnableCoBrowsing(e.target.checked)}
              />
            }
            label="Cobrowsing: Enable agents to request consent to see and control the visitor's browser viewport"
          />
          <FormControlLabel
            control={
              <Switch
                checked={enableTranslation}
                onChange={(e) => setEnableTranslation(e.target.checked)}
              />
            }
            label="Translation: Enable real-time translation between visitors and agents"
          />
          <FormControlLabel
            control={
              <Switch
                checked={enableUserShortcuts}
                onChange={(e) => setEnableUserShortcuts(e.target.checked)}
              />
            }
            label={
              <Box>
                <Typography>User Shortcuts</Typography>
                <Typography variant="body2" color="text.secondary">
                  Allow agents to create their own personal shortcuts in
                  addition to team shortcuts
                </Typography>
              </Box>
            }
          />
        </Stack>
      </Paper>
    </Box>
  );
}
