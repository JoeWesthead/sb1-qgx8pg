import React from 'react';
import { Box, Stack, TextField, InputProps } from '@mui/material';

interface EditableFieldProps {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  placeholder?: string;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  size?: 'small' | 'medium';
  maxWidth?: number | string;
  InputProps?: Partial<InputProps>;
}

export function EditableField({
  value,
  onChange,
  label,
  placeholder,
  helperText,
  multiline = false,
  rows = 4,
  size = 'small',
  maxWidth = 400,
  InputProps,
}: EditableFieldProps) {
  return (
    <Stack direction="row" spacing={1} alignItems="flex-start">
      <TextField
        fullWidth
        size={size}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        label={label}
        placeholder={placeholder}
        helperText={helperText}
        multiline={multiline}
        rows={multiline ? rows : undefined}
        sx={{ maxWidth }}
        InputProps={InputProps}
      />
    </Stack>
  );
}