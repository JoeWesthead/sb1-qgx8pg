import React from 'react';
import { Alert, AlertProps, Box, Link } from '@mui/material';
import { Info } from 'lucide-react';

interface InfoAlertProps extends Omit<AlertProps, 'severity'> {
  action?: React.ReactNode;
  linkText?: string;
  linkHref?: string;
}

export function InfoAlert({ children, action, linkText, linkHref, sx, ...props }: InfoAlertProps) {
  return (
    <Alert 
      severity="info"
      icon={<Info size={20} />}
      sx={{ 
        mb: 3,
        '& .MuiAlert-icon': {
          alignItems: 'center',
        },
        ...sx 
      }}
      {...props}
    >
      <Box component="span" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {children}
        {linkText && linkHref && (
          <Link href={linkHref} underline="hover">
            {linkText}
          </Link>
        )}
      </Box>
      {action}
    </Alert>
  );
}