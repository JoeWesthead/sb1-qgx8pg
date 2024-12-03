import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Link,
} from '@mui/material';
import {
  Edit2,
  Trash2,
  Lock,
  CheckCircle2,
  PowerOff,
  Plus,
} from 'lucide-react';
import { usePreview } from '../context/PreviewContext';

const connectedIntegrations = [
  {
    name: 'HubSpot',
    type: 'Marketing Automation',
    instanceUrl: 'https://app.hubspot.com/mycompany',
    description:
      "Share transcript info with HubSpot's versatile marketing automation tools.",
  },
];

const availableIntegrations = [
  {
    name: 'Front',
    type: 'Customer Support',
    description:
      "Connect your chats to Front's shared inbox for customer support and sales.",
    isPro: false,
  },
  {
    name: 'Google Analytics',
    type: 'Analytics',
    description: 'Record, display and analyze chatbox events.',
    isPro: false,
  },
  {
    name: 'GreenRope',
    type: 'CRM',
    description:
      "Enable maximum ROI with GreenRope's innovative sales, marketing, and operations platform.",
    isPro: false,
  },
  {
    name: 'Groove',
    type: 'Help Desk',
    description:
      'Link your live chat to Groove help desk for email, chats, and social in one place.',
    isPro: false,
  },
  {
    name: 'Help Scout',
    type: 'Help Desk',
    description:
      'Automatically send chats to your Help Scout mailbox to keep track of every customer interaction.',
    isPro: true,
  },
  {
    name: 'JIRA',
    type: 'Project Management',
    description: 'Easily create tickets with Olark and JIRA.',
    isPro: false,
  },
  {
    name: 'MailChimp',
    type: 'Email Marketing',
    description: 'Add chat visitors to your email lists with ease.',
    isPro: false,
  },
  {
    name: 'Nutshell',
    type: 'Help Desk',
    description:
      'Better help your customers by connecting chats with the Nutshell help desk solution.',
    isPro: false,
  },
  {
    name: 'Salesforce',
    type: 'CRM',
    description:
      'Bring your live chat details into this powerful CRM for more sales management.',
    isPro: true,
  },
  {
    name: 'Slack',
    type: 'Communication',
    description: 'Collaborate with your teammates in Slack.',
    isPro: false,
  },
  {
    name: 'Slate',
    type: 'CRM',
    description: 'Connect with this powerful CRM for education.',
    isPro: true,
  },
  {
    name: 'SugarCRM',
    type: 'CRM',
    description:
      'Complete your CRM customer profiles by adding information from your Olark chats.',
    isPro: false,
  },
  {
    name: 'Zendesk',
    type: 'Help Desk',
    description: 'Create tickets from Olark chats with Zendesk help desk.',
    isPro: false,
  },
];

export function IntegrationsPage() {
  const { isPreviewOpen } = usePreview();
  const [editModalOpen, setEditModalOpen] = useState(false);
  const [selectedIntegration, setSelectedIntegration] = useState<string | null>(
    null
  );
  const [instanceUrl, setInstanceUrl] = useState('');

  const handleEditClick = (integration: string, currentUrl: string) => {
    setSelectedIntegration(integration);
    setInstanceUrl(currentUrl);
    setEditModalOpen(true);
  };

  const handleEditSave = () => {
    // Handle saving the new instance URL
    setEditModalOpen(false);
    setSelectedIntegration(null);
    setInstanceUrl('');
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
        Integrations
      </Typography>

      {/* Connected Integrations */}

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Connected Integrations</Typography>
        <Typography variant="body2" color="text.secondary">
          Once authenticated, you can define how your{' '}
          <Link href="#">AI Variant</Link> or <Link href="#">Ground Rules</Link>{' '}
          should interact with your third party services.
        </Typography>
      </Box>

      <TableContainer component={Paper} variant="outlined" sx={{ mb: 6 }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Integration</TableCell>
              <TableCell>Type</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {connectedIntegrations.map((integration) => (
              <TableRow key={integration.name}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Tooltip title="Connected">
                      <CheckCircle2 size={16} color="#22c55e" />
                    </Tooltip>
                    {integration.name}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="text.secondary">
                    {integration.type}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Box
                    sx={{ display: 'flex', gap: 1, justifyContent: 'flex-end' }}
                  >
                    <Tooltip title="Edit integration">
                      <IconButton
                        size="small"
                        onClick={() =>
                          handleEditClick(
                            integration.name,
                            integration.instanceUrl
                          )
                        }
                      >
                        <Edit2 size={18} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Disable integration">
                      <IconButton size="small" color="error">
                        <PowerOff size={18} />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Remove integration">
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

      {/* Available Integrations */}

      <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Available Integrations</Typography>
        <Typography variant="body2" color="text.secondary">
          Don't see your integration listed here?{' '}
          <Link href="#">Talk to us</Link>. Our team is happy to help with
          industry-specific or custom third party integrations.
        </Typography>
      </Box>

      <TableContainer component={Paper} variant="outlined">
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Integration</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Description</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {availableIntegrations.map((integration) => (
              <TableRow key={integration.name}>
                <TableCell>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {integration.isPro && (
                      <Tooltip title="Pro plan required">
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Lock size={16} />
                        </Box>
                      </Tooltip>
                    )}
                    {integration.name}
                  </Box>
                </TableCell>
                <TableCell>
                  <Typography color="text.secondary">
                    {integration.type}
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography color="text.secondary">
                    {integration.description}
                  </Typography>
                </TableCell>
                <TableCell align="right">
                  <Tooltip
                    title={
                      integration.isPro
                        ? 'Pro plan required'
                        : 'Set up integration'
                    }
                  >
                    <span>
                      <IconButton size="small" disabled={integration.isPro}>
                        <Plus size={18} />
                      </IconButton>
                    </span>
                  </Tooltip>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Edit Integration Modal */}
      <Dialog
        open={editModalOpen}
        onClose={() => setEditModalOpen(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Edit {selectedIntegration} Integration</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <TextField
              label="Instance URL"
              fullWidth
              value={instanceUrl}
              onChange={(e) => setInstanceUrl(e.target.value)}
              placeholder="https://your-instance.example.com"
              helperText="Enter the URL of your instance"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditModalOpen(false)}>Cancel</Button>
          <Button
            variant="contained"
            onClick={handleEditSave}
            disabled={!instanceUrl}
          >
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
