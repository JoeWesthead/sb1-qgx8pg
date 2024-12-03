import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  IconButton,
  Alert,
  Drawer,
  Button,
  Stack,
  Switch,
  FormControlLabel,
  CircularProgress,
  TextField,
  InputAdornment,
} from '@mui/material';
import { PanelRightClose, PanelRight, RotateCcw, Send } from 'lucide-react';
import { usePreview } from '../context/PreviewContext';
import { useConfig } from '../context/ConfigContext';
import { useLocation } from 'react-router-dom';

const DRAWER_WIDTH = 400;

export function Preview() {
  const { isPreviewOpen, togglePreview, previewContent } = usePreview();
  const { currentPreset } = useConfig();
  const [humansAvailable, setHumansAvailable] = useState(true);
  const [message, setMessage] = useState('');
  const location = useLocation();
  const [isLoading, setIsLoading] = useState(false);

  const isAppearancePage = location.pathname === '/chat-appearance';
  const isAIVariantPage = location.pathname === '/';
  const showPreview = isAppearancePage || isAIVariantPage;

  // Auto-collapse preview on non-preview pages
  useEffect(() => {
    if (!showPreview && isPreviewOpen) {
      togglePreview();
    }
  }, [location.pathname]);

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle message sending logic here
      setMessage('');
    }
  };

  if (!showPreview) {
    return null;
  }

  return (
    <>
      <Box
        onClick={togglePreview}
        sx={{
          position: 'fixed',
          right: isPreviewOpen ? DRAWER_WIDTH : 0,
          top: 72,
          height: 120,
          width: 40,
          bgcolor: 'primary.main',
          color: 'primary.contrastText',
          boxShadow: 1,
          // borderRadius: '4px 0 0 4px',
          cursor: 'pointer',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
          // transition: 'right 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
          zIndex: (theme) => theme.zIndex.drawer + 1,
          '&:hover': {
            bgcolor: 'primary.dark',
          },
        }}
      >
        {isPreviewOpen ? (
          <PanelRightClose size={20} />
        ) : (
          <PanelRight size={20} />
        )}
        <Typography
          sx={{
            writingMode: 'vertical-rl',
            textOrientation: 'mixed',
            transform: 'rotate(180deg)',
            textTransform: 'uppercase',
            letterSpacing: '0.1em',
            fontSize: '0.75rem',
            fontWeight: 600,
          }}
        >
          Preview
        </Typography>
      </Box>

      <Drawer
        variant="persistent"
        anchor="right"
        open={isPreviewOpen}
        transitionDuration={0}
        sx={{
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: DRAWER_WIDTH,
            boxSizing: 'border-box',
            borderColor: 'divider',
            bgcolor: 'action.hover',
            borderRadius: 0,
          },
        }}
      >
        <Stack sx={{ position: 'relative', height: '100%' }}>
          <Paper
            variant="outlined"
            sx={{
              p: 2,
              borderBottom: '1px solid',
              borderColor: 'divider',
              bgcolor: 'background.paper',
              mx: 2,
              my: 2,
            }}
          >
            <Typography variant="h6">Preview</Typography>
            <Typography variant="body2" sx={{ mb: 3 }}>
              {isAppearancePage
                ? 'Preview how your chat widget will appear on your website.'
                : isAIVariantPage
                ? 'Test your AI Variant knowledge and behavior.'
                : 'Preview your chat widget.'}
            </Typography>

            {!isAppearancePage && (
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Currently previewing
                </Typography>
                <Typography>{currentPreset}</Typography>
              </Box>
            )}

            <Box>
              <Typography variant="subtitle2" gutterBottom>
                Preview controls
              </Typography>

              <Stack
                justifyContent="space-between"
                alignItems="center"
                direction="row"
                spacing={2}
              >
                <FormControlLabel
                  control={
                    <Switch
                      checked={humansAvailable}
                      onChange={(e) => setHumansAvailable(e.target.checked)}
                      size="small"
                    />
                  }
                  label={
                    <Typography variant="body2">
                      {humansAvailable
                        ? 'Humans Available'
                        : 'Humans Unavailable'}
                    </Typography>
                  }
                />
                {isAIVariantPage && (
                  <Button
                    size="small"
                    variant="soft"
                    startIcon={<RotateCcw size={14} />}
                  >
                    Restart
                  </Button>
                )}
              </Stack>
            </Box>
          </Paper>

          <Paper
            variant="outlined"
            sx={{
              flex: 1,
              mx: 2,
              mb: 2,
              position: 'relative',
              bgcolor: 'background.paper',
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {isLoading ? (
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  height: '100%',
                }}
              >
                <CircularProgress />
              </Box>
            ) : (
              <>
                <Box
                  sx={{
                    bgcolor: 'primary.main',
                    color: 'primary.contrastText',
                    p: 2,
                    position: 'relative',
                    mb: 2,
                    borderRadius: 1,
                  }}
                >
                  <Typography variant="h6">Chat with us</Typography>
                  <Typography>How can we help?</Typography>
                </Box>

                <Box sx={{ p: 2, flex: 1, overflowY: 'auto' }}>
                  <Box
                    sx={{
                      bgcolor: 'action.hover',
                      p: 2,
                      width: 'fit-content',
                      mb: 2,
                      borderRadius: 1,
                    }}
                  >
                    <Typography>Hello</Typography>
                  </Box>

                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 2,
                    }}
                  >
                    <Typography color="text.secondary">
                      How can we help?
                    </Typography>
                  </Box>

                  {previewContent}
                </Box>

                {isAIVariantPage && (
                  <Box sx={{ p: 2, borderTop: 1, borderColor: 'divider' }}>
                    <TextField
                      fullWidth
                      size="small"
                      placeholder="Type your message..."
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleSendMessage();
                        }
                      }}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleSendMessage}
                              disabled={!message.trim()}
                              size="small"
                            >
                              <Send size={16} />
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Box>
                )}
              </>
            )}
          </Paper>

          {isAIVariantPage && (
            <Alert severity="info" sx={{ mb: 2, mx: 2 }}>
              This variant has pending{' '}
              <Typography component="span" sx={{ fontWeight: 600 }}>
                Knowledge Sources
              </Typography>
              . Once they're ready, your AI will use them in responses.
            </Alert>
          )}
        </Stack>
      </Drawer>
    </>
  );
}
