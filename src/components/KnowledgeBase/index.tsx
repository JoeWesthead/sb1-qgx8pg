import React from 'react';
import { Box, Typography, Alert, AlertTitle, Link } from '@mui/material';
import { Zap } from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { usePreview } from '../../context/PreviewContext';
import { KnowledgeBaseContent } from './KnowledgeBaseContent';
import { Preview } from '../Preview';

export function KnowledgeBase() {
  const { currentPreset, isLoading } = useConfig();
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
      {currentPreset === 'Classic Olark' ? (
        <Alert severity="info" sx={{ mb: 4 }}>
          <AlertTitle>
            <Typography component="span" sx={{ fontWeight: 400 }}>
              <Typography component="span" sx={{ fontWeight: 600 }}>
                {currentPreset}
              </Typography>{' '}
              was last active on February 15, 2024. You can test this variant in
              the{' '}
              <Typography component="span" sx={{ fontWeight: 600 }}>
                Preview
              </Typography>
              .
            </Typography>
          </AlertTitle>
        </Alert>
      ) : currentPreset === 'Aiden' ? (
        <Alert severity="success" sx={{ mb: 4 }}>
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
        </Alert>
      ) : (
        <Alert severity="info" sx={{ mb: 4 }}>
          <AlertTitle>
            <Typography component="span" sx={{ fontWeight: 400 }}>
              <Typography component="span" sx={{ fontWeight: 600 }}>
                {currentPreset}
              </Typography>{' '}
              has never been deployed. You can test it in the{' '}
              <Typography component="span" sx={{ fontWeight: 600 }}>
                Preview
              </Typography>{' '}
              before enabling it on the{' '}
              <Link color="inherit" href="#">
                Deploy page
              </Link>
              .
            </Typography>
          </AlertTitle>
        </Alert>
      )}

      <KnowledgeBaseContent isLoading={isLoading} />

      <Preview />
    </Box>
  );
}
