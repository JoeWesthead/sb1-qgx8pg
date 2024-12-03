import React from 'react';
import { Alert, AlertTitle, Typography, Button, Link } from '@mui/material';

interface VariantAlertProps {
  variant: string;
}

export function VariantAlert({ variant }: VariantAlertProps) {
  if (variant === 'Classic Olark') {
    return (
      <Alert
        severity="info"
        sx={{ mb: 4 }}
        action={
          <Button color="inherit" size="small" component={Link} href="/billing">
            Upgrade Now
          </Button>
        }
      >
        <AlertTitle>Upgrade to AI-Powered Support</AlertTitle>
        Enhance your customer support with AI capabilities. Get instant
        responses, intelligent routing, and automated information collection.
      </Alert>
    );
  }

  return (
    <Alert severity="success" sx={{ mb: 4 }}>
      <AlertTitle>
        <Typography component="span" sx={{ fontWeight: 400 }}>
          <Typography component="span" sx={{ fontWeight: 600 }}>
            {variant}
          </Typography>{' '}
          is currently deployed to{' '}
          <Typography component="span" sx={{ fontWeight: 600 }}>
            the Web
          </Typography>
        </Typography>
      </AlertTitle>
      AI Variants will act according to your instructions, and fall back to
      these Ground Rules when necessary. Click on an AI Variant To test
      behavior.
    </Alert>
  );
}
