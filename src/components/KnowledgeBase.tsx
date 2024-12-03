import React from 'react';
import { Box, Typography, Alert, AlertTitle, Link } from '@mui/material';
import { Zap } from 'lucide-react';
import { useConfig } from '../context/ConfigContext';
import { usePreview } from '../context/PreviewContext';
import { KnowledgeBaseContent } from './KnowledgeBase/KnowledgeBaseContent';
import { ConfigurationSelector } from './KnowledgeBase/ConfigurationSelector';
import { Preview } from './Preview';

export function KnowledgeBase() {
  const { currentPreset, setCurrentPreset, isLoading } = useConfig();
  const { isPreviewOpen } = usePreview();

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
      <Typography variant="h5" sx={{}}>
        {currentPreset}
      </Typography>

      {/* <ConfigurationSelector
        currentPreset={currentPreset}
        onConfigChange={setCurrentPreset}
      /> */}
      <Box
        sx={{
          width: '100%',
          position: 'sticky',
          top: 0,
          backgroundColor: 'background.default',
          zIndex: 10,
          py: 4,
          pb: 4,
        }}
      >
        <Box sx={{}}>
          {currentPreset === 'Aiden' ? (
            <Alert
              severity="success"
              icon={
                <Box sx={{ mt: 0.25 }}>
                  <Zap size={14} fill="currentColor" />
                </Box>
              }
            >
              <AlertTitle>
                <Typography component="span" sx={{ fontWeight: 400 }}>
                  <Typography component="span" sx={{ fontWeight: 600 }}>
                    {currentPreset}
                  </Typography>{' '}
                  is currently deployed to{' '}
                  <Typography component="span" sx={{ fontWeight: 600 }}>
                    the Web
                  </Typography>
                </Typography>
              </AlertTitle>
              Changes to this AI Variant will be automatically applied, which is
              great for minor changes. If you want to make major changes, add a
              new AI Variant and test safely before deploying.
            </Alert>
          ) : (
            <Alert severity="info">
              <AlertTitle>
                <Typography component="span" sx={{ fontWeight: 400 }}>
                  <Typography component="span" sx={{ fontWeight: 600 }}>
                    {currentPreset}
                  </Typography>{' '}
                  {currentPreset === 'Classic Olark'
                    ? 'was last active on February 15, 2024'
                    : 'has never been deployed'}
                </Typography>
              </AlertTitle>
              You can test different AI Variants safely in the{' '}
              <Typography component="span" sx={{ fontWeight: 600 }}>
                Preview
              </Typography>{' '}
              before enabling them on the{' '}
              <Link color="inherit" href="#">
                Deploy page
              </Link>
              .
            </Alert>
          )}
        </Box>
      </Box>

      <KnowledgeBaseContent isLoading={isLoading} />

      <Preview />
    </Box>
  );
}
