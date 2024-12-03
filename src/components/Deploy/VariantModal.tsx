import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  Stack,
  Chip,
  InputLabel,
  Divider,
  Switch,
  Alert,
  Checkbox,
  Paper,
  Collapse,
} from '@mui/material';
import { X, Plus, Globe, MessageSquare, Mail, Phone } from 'lucide-react';

interface VariantModalProps {
  open: boolean;
  onClose: () => void;
  onSave: (data: any) => void;
  variant: any;
  existingVariants: any[];
}

interface Channel {
  id: string;
  name: string;
  icon: React.ReactNode;
  enabled: boolean;
  requiresSetup: boolean;
}

interface WebDestination {
  type: 'all' | 'specific';
  domains: string[];
}

export function VariantModal({
  open,
  onClose,
  onSave,
  variant,
  existingVariants,
}: VariantModalProps) {
  const [name, setName] = useState('');
  const [importType, setImportType] = useState('blank');
  const [importFrom, setImportFrom] = useState('');
  const [webDestination, setWebDestination] = useState<WebDestination>({
    type: 'all',
    domains: [],
  });
  const [currentDomain, setCurrentDomain] = useState('');
  const [channels, setChannels] = useState<Channel[]>([
    {
      id: 'web',
      name: 'Web',
      icon: <Globe size={16} />,
      enabled: true,
      requiresSetup: false,
    },
    {
      id: 'sms',
      name: 'SMS',
      icon: <MessageSquare size={16} />,
      enabled: false,
      requiresSetup: true,
    },
    {
      id: 'email',
      name: 'Email',
      icon: <Mail size={16} />,
      enabled: false,
      requiresSetup: true,
    },
    {
      id: 'whatsapp',
      name: 'WhatsApp',
      icon: <Phone size={16} />,
      enabled: false,
      requiresSetup: true,
    },
  ]);

  useEffect(() => {
    if (variant) {
      setName(variant.name);
      setWebDestination({
        type: variant.destinations.includes('All domains') ? 'all' : 'specific',
        domains: variant.destinations.filter(
          (d: string) => d !== 'All domains'
        ),
      });
      setChannels((prev) =>
        prev.map((channel) => ({
          ...channel,
          enabled:
            variant.channels?.includes(channel.id) || channel.id === 'web',
        }))
      );
    } else {
      setName('');
      setImportType('blank');
      setImportFrom('');
      setWebDestination({ type: 'all', domains: [] });
      setChannels((prev) =>
        prev.map((channel) => ({
          ...channel,
          enabled: channel.id === 'web',
        }))
      );
    }
  }, [variant]);

  const handleClose = () => {
    onClose();
  };

  const handleAddDomain = () => {
    if (currentDomain && !webDestination.domains.includes(currentDomain)) {
      setWebDestination((prev) => ({
        ...prev,
        domains: [...prev.domains, currentDomain],
      }));
      setCurrentDomain('');
    }
  };

  const handleRemoveDomain = (domain: string) => {
    setWebDestination((prev) => ({
      ...prev,
      domains: prev.domains.filter((d) => d !== domain),
    }));
  };

  const handleChannelToggle = (channelId: string) => {
    if (channelId === 'web') return; // Web channel cannot be disabled
    setChannels((prev) =>
      prev.map((channel) =>
        channel.id === channelId
          ? { ...channel, enabled: !channel.enabled }
          : channel
      )
    );
  };

  const handleSave = () => {
    const destinations =
      webDestination.type === 'all' ? ['All domains'] : webDestination.domains;

    const enabledChannels = channels
      .filter((channel) => channel.enabled)
      .map((channel) => channel.id);

    onSave({
      name,
      importType,
      importFrom: importType === 'import' ? importFrom : undefined,
      destinations,
      channels: enabledChannels,
    });
  };

  const isValid =
    name &&
    (webDestination.type === 'all' || webDestination.domains.length > 0);

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          p: 2,
          pb: 1,
        }}
      >
        <Typography variant="h6">
          {variant ? 'Edit' : 'Add'} AI Variant
        </Typography>
        <IconButton size="small" onClick={handleClose}>
          <X size={20} />
        </IconButton>
      </Box>

      <DialogContent dividers>
        <Stack spacing={3}>
          <TextField
            label="Name of variant"
            fullWidth
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter variant name"
          />

          {!variant && (
            <FormControl>
              <FormLabel>Import AI Variant resources</FormLabel>
              <RadioGroup
                value={importType}
                onChange={(e) => setImportType(e.target.value)}
              >
                <FormControlLabel
                  value="blank"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="body1">Start from blank</Typography>
                      <Typography variant="body2" color="text.secondary">
                        Create a new variant with default settings
                      </Typography>
                    </Box>
                  }
                />
                <FormControlLabel
                  value="import"
                  control={<Radio />}
                  label={
                    <Box>
                      <Typography variant="body1">
                        Import from existing variant
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Start with settings from an existing variant
                      </Typography>
                    </Box>
                  }
                />
              </RadioGroup>

              {importType === 'import' && (
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Select variant</InputLabel>
                  <Select
                    value={importFrom}
                    onChange={(e) => setImportFrom(e.target.value)}
                    label="Select variant"
                  >
                    {existingVariants.map((v) => (
                      <MenuItem key={v.name} value={v.name}>
                        {v.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              )}
            </FormControl>
          )}

          <Divider />

          <FormControl>
            <FormLabel>Communication channels</FormLabel>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Enable channels where this AI Variant will be available
            </Typography>

            <Stack spacing={2}>
              {channels.map((channel) => (
                <Box key={channel.id}>
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}
                  >
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      {channel.icon}
                      <Box>
                        <Typography>{channel.name}</Typography>
                        {channel.requiresSetup && channel.enabled && (
                          <Typography variant="caption" color="text.secondary">
                            Requires additional setup
                          </Typography>
                        )}
                      </Box>
                    </Box>
                    <Checkbox
                      checked={channel.enabled}
                      onChange={() => handleChannelToggle(channel.id)}
                      disabled={channel.id === 'web'} // Web channel is always enabled
                    />
                  </Box>

                  {channel.id === 'web' && (
                    <Box sx={{ ml: 4, mt: 1 }}>
                      <RadioGroup
                        value={webDestination.type}
                        onChange={(e) =>
                          setWebDestination((prev) => ({
                            ...prev,
                            type: e.target.value as 'all' | 'specific',
                          }))
                        }
                      >
                        <FormControlLabel
                          value="all"
                          control={<Radio size="small" />}
                          label={
                            <Typography variant="body2">
                              All domains with Olark code
                            </Typography>
                          }
                        />
                        <FormControlLabel
                          value="specific"
                          control={<Radio size="small" />}
                          label={
                            <Typography variant="body2">
                              Specific domains only
                            </Typography>
                          }
                        />
                      </RadioGroup>

                      <Collapse in={webDestination.type === 'specific'}>
                        <Box sx={{ mt: 2 }}>
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ display: 'block', mb: 1 }}
                          >
                            Use * for wildcards (e.g., *.example.com). Olark
                            code must be installed on these domains.
                          </Typography>
                          <Stack direction="row" spacing={1} sx={{ mb: 1 }}>
                            <TextField
                              fullWidth
                              size="small"
                              value={currentDomain}
                              onChange={(e) => setCurrentDomain(e.target.value)}
                              placeholder="Enter domain (e.g., example.com)"
                              onKeyPress={(e) => {
                                if (e.key === 'Enter') {
                                  e.preventDefault();
                                  handleAddDomain();
                                }
                              }}
                            />
                            <Button
                              variant="outlined"
                              onClick={handleAddDomain}
                              disabled={!currentDomain}
                              startIcon={<Plus size={16} />}
                            >
                              Add
                            </Button>
                          </Stack>

                          <Stack
                            direction="row"
                            spacing={1}
                            flexWrap="wrap"
                            useFlexGap
                          >
                            {webDestination.domains.map((domain) => (
                              <Chip
                                key={domain}
                                label={domain}
                                onDelete={() => handleRemoveDomain(domain)}
                              />
                            ))}
                          </Stack>
                        </Box>
                      </Collapse>
                    </Box>
                  )}
                </Box>
              ))}
            </Stack>

            {channels.some((c) => c.enabled && c.requiresSetup) && (
              <Alert severity="info" sx={{ mt: 2 }}>
                Some enabled channels require additional setup. You'll be guided
                through the setup process after saving.
              </Alert>
            )}
          </FormControl>
        </Stack>
      </DialogContent>

      <DialogActions sx={{ p: 2 }}>
        <Button onClick={handleClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSave} disabled={!isValid}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
}
