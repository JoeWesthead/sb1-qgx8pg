import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Stack,
  Radio,
  FormControlLabel,
  FormControl,
  FormLabel,
  RadioGroup,
  Tooltip,
  TextField,
  InputAdornment,
  Select,
  MenuItem,
} from '@mui/material';
import {
  HelpCircle,
  Edit,
  Save,
  Plus,
  Copy,
  AlertCircle,
  Globe,
  MessageSquare,
  Mail,
  CheckCircle2,
  AlertOctagon,
  Clock,
  AlertTriangle,
} from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { configOptions } from '../config/settingsConfig';
import { InfoAlert } from './InfoAlert';
import { usePreview } from '../context/PreviewContext';
import { VariantModal } from './Deploy/VariantModal';
import { HelpDialog } from './common/HelpDialog';
import { NewConfigModal } from './KnowledgeBase/NewConfigModal';

interface Destination {
  id: string;
  type: 'Web' | 'SMS' | 'Email';
  icon: React.ReactNode;
  variant: string;
  status: 'Active' | 'Inactive' | 'Setup Required' | 'Not Installed';
  lastActive?: string;
}

const destinations: Destination[] = [
  {
    id: '1',
    type: 'Web',
    icon: <Globe size={16} />,
    variant: 'Aiden',
    status: 'Not Installed',
    lastActive: undefined,
  },
  {
    id: '2',
    type: 'SMS',
    icon: <MessageSquare size={16} />,
    variant: 'Bespoke with Aiden',
    status: 'Setup Required',
  },
  {
    id: '3',
    type: 'Email',
    icon: <Mail size={16} />,
    variant: 'Classic Olark',
    status: 'Inactive',
    lastActive: '2024-02-15',
  },
];

export function ConfigurationPage() {
  const { activeConfig, setActiveConfig } = useConfig();
  const [selectedRadio, setSelectedRadio] = useState(activeConfig);
  const [hasChanges, setHasChanges] = useState(false);
  const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const { isPreviewOpen } = usePreview();
  const [variantModalOpen, setVariantModalOpen] = useState(false);
  const [editingDestination, setEditingDestination] =
    useState<Destination | null>(null);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [destinationsList, setDestinationsList] =
    useState<Destination[]>(destinations);
  const [newConfigModalOpen, setNewConfigModalOpen] = useState(false);

  const siteId = '6982-24-10-2002';
  const installCode = `<!-- Begin Chat Widget -->
<script type="text/javascript">
  ;(function(o,l,a,r,k){
    o.olark||(k=o.olark=function(){k.s.push(arguments);});
    k.s=[];k.site='${siteId}';
    a=l.createElement('script');
    a.async=1;a.src='//'+r;
    l.getElementsByTagName('head')[0].appendChild(a);
  })(window,document,'static.olark.com/jsclient/loader.js');
</script>
<!-- End Chat Widget -->`;

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(installCode);
      setCopySuccess(true);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleVariantChange = (destinationId: string, variant: string) => {
    setDestinationsList((prev) =>
      prev.map((dest) =>
        dest.id === destinationId ? { ...dest, variant } : dest
      )
    );
    setHasChanges(true);
  };

  const handleCreateConfig = (name: string, copyFrom?: string) => {
    console.log('Creating new variant:', { name, copyFrom });
    setNewConfigModalOpen(false);
  };

  const handleSaveChanges = () => {
    setConfirmDialogOpen(true);
  };

  const handleConfirmChange = () => {
    setHasChanges(false);
    setConfirmDialogOpen(false);
  };

  const handleEditDestination = (destination: Destination) => {
    setEditingDestination(destination);
    setVariantModalOpen(true);
  };

  const handleSaveDestination = (data: any) => {
    console.log('Saving destination:', data);
    setVariantModalOpen(false);
    setEditingDestination(null);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Active':
        return (
          <Tooltip title="Active">
            <Box sx={{ color: 'success.main' }}>
              <CheckCircle2 size={16} />
            </Box>
          </Tooltip>
        );
      case 'Inactive':
        return (
          <Tooltip title="Inactive">
            <Box sx={{ color: 'text.disabled' }}>
              <AlertOctagon size={16} />
            </Box>
          </Tooltip>
        );
      case 'Setup Required':
        return (
          <Tooltip title="Setup Required">
            <Box sx={{ color: 'warning.main' }}>
              <Clock size={16} />
            </Box>
          </Tooltip>
        );
      case 'Not Installed':
        return (
          <Tooltip title="Olark not yet installed">
            <Box sx={{ color: 'warning.main' }}>
              <AlertTriangle size={16} />
            </Box>
          </Tooltip>
        );
      default:
        return null;
    }
  };

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
        Deploy
      </Typography>

      <Box sx={{ mb: 6 }}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            mb: 2,
          }}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Typography variant="h6">Go Live</Typography>
            <IconButton size="small" onClick={() => setHelpDialogOpen(true)}>
              <HelpCircle size={20} />
            </IconButton>
          </Box>
        </Box>

        <TableContainer component={Paper} variant="outlined" sx={{ mb: 1 }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Destination</TableCell>
                <TableCell>Active Variant</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Last Active</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {destinationsList.map((destination) => (
                <TableRow key={destination.id}>
                  <TableCell>
                    <Stack direction="row" spacing={1} alignItems="center">
                      {destination.icon}
                      <Typography>{destination.type}</Typography>
                      {destination.type === 'Web' && (
                        <Typography variant="body2">
                          &ndash;&ensp;wherever Olark code is installed
                        </Typography>
                      )}
                    </Stack>
                  </TableCell>
                  <TableCell>
                    <Select
                      value={destination.variant}
                      onChange={(e) =>
                        handleVariantChange(destination.id, e.target.value)
                      }
                      size="small"
                      sx={{ minWidth: 200 }}
                    >
                      {configOptions.map((option) => (
                        <MenuItem key={option} value={option}>
                          {option}
                        </MenuItem>
                      ))}
                    </Select>
                  </TableCell>
                  <TableCell>{getStatusIcon(destination.status)}</TableCell>
                  <TableCell>
                    <Typography
                      variant="body2"
                      color={
                        destination.lastActive === 'Now'
                          ? 'success.main'
                          : 'text.secondary'
                      }
                    >
                      {destination.lastActive || '—'}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        {hasChanges && (
          <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
            <Button
              variant="contained"
              startIcon={<Save size={16} />}
              size="small"
              onClick={handleSaveChanges}
            >
              Apply Changes
            </Button>
            <Button
              variant="text"
              size="small"
              onClick={() => {
                setDestinationsList(destinations);
                setHasChanges(false);
              }}
            >
              Cancel
            </Button>
          </Stack>
        )}
      </Box>

      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="h6">Installation</Typography>
          <IconButton size="small" onClick={() => setHelpDialogOpen(true)}>
            <HelpCircle size={20} />
          </IconButton>
        </Box>

        <Paper sx={{ p: 3 }} variant="outlined">
          <Typography variant="subtitle2" gutterBottom>
            Add this code to your website
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Copy and paste this code into your website's HTML, just before the
            closing &lt;/body&gt; tag. Using a CMS?{' '}
            <Link href="#">WordPress</Link>, <Link href="#">BigCommerce</Link>,
            or <Link href="#">Shopify</Link> installation guides are available.
          </Typography>

          <Box
            sx={{
              p: 2,
              bgcolor: 'action.hover',
              borderRadius: 1,
              position: 'relative',
              mb: 3,
              fontFamily: 'monospace',
              fontSize: '0.875rem',
            }}
          >
            <pre style={{ margin: 0, whiteSpace: 'pre-wrap' }}>
              {installCode}
            </pre>
          </Box>

          <Button
            variant="outlined"
            startIcon={<Copy size={16} />}
            onClick={handleCopyCode}
            size="small"
          >
            Copy Installation Code
          </Button>
        </Paper>
      </Box>

      <Box sx={{ mb: 6 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="h6">Site ID</Typography>
          <IconButton size="small" onClick={() => setHelpDialogOpen(true)}>
            <HelpCircle size={20} />
          </IconButton>
        </Box>

        <Paper sx={{ p: 3 }} variant="outlined">
          <Typography variant="subtitle2" gutterBottom>
            Your unique site identifier
          </Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            This ID is used to identify your account and is required for
            installation
          </Typography>

          <TextField
            value={siteId}
            InputProps={{
              readOnly: true,
              startAdornment: (
                <InputAdornment position="start">
                  <Typography color="text.secondary">Site ID:</Typography>
                </InputAdornment>
              ),
              endAdornment: (
                <InputAdornment position="end">
                  <Button
                    size="small"
                    startIcon={<Copy size={16} />}
                    onClick={() => {
                      navigator.clipboard.writeText(siteId);
                      setCopySuccess(true);
                    }}
                  >
                    Copy
                  </Button>
                </InputAdornment>
              ),
            }}
            fullWidth
            size="small"
            sx={{ maxWidth: 400 }}
          />
        </Paper>
      </Box>

      <Dialog
        open={confirmDialogOpen}
        onClose={() => setConfirmDialogOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Confirm AI Variant Changes</DialogTitle>
        <DialogContent>
          <Alert severity="warning" sx={{ mb: 3 }}>
            This action will immediately affect your live chat widget across all
            selected destinations.
          </Alert>
          <Typography>
            You are about to update the variant for multiple destinations. These
            changes will take effect immediately.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setConfirmDialogOpen(false)} size="small">
            Cancel
          </Button>
          <Button
            onClick={handleConfirmChange}
            variant="contained"
            color="primary"
            size="small"
          >
            Confirm Changes
          </Button>
        </DialogActions>
      </Dialog>

      <VariantModal
        open={variantModalOpen}
        onClose={() => setVariantModalOpen(false)}
        onSave={handleSaveDestination}
        variant={editingDestination}
        existingVariants={configOptions}
      />

      <NewConfigModal
        open={newConfigModalOpen}
        onClose={() => setNewConfigModalOpen(false)}
        onCreateConfig={handleCreateConfig}
      />

      <HelpDialog
        open={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
        title="Destinations"
        description="Configure which AI Variant should be active for each communication channel. You can have different variants active on different channels simultaneously."
        benefits={[
          'Channel-specific configurations',
          'Flexible deployment options',
          'Independent channel management',
        ]}
      />

      <Snackbar
        open={copySuccess}
        autoHideDuration={3000}
        onClose={() => setCopySuccess(false)}
        message="Copied to clipboard!"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      />
    </Box>
  );
}
