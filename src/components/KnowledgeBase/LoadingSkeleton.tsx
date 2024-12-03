import React from 'react';
import {
  Box,
  Typography,
  Skeleton,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
} from '@mui/material';
import { HelpCircle } from 'lucide-react';

interface LoadingSkeletonProps {
  title: string;
}

export function LoadingSkeleton({ title }: LoadingSkeletonProps) {
  return (
    <Box sx={{ mb: 8 }}>
      {/* Section Header */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="h6">{title}</Typography>
        <IconButton size="small">
          <HelpCircle size={20} />
        </IconButton>
      </Box>

      {/* Search and Button Bar */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Skeleton variant="rectangular" width={120} height={36} sx={{ borderRadius: 1 }} />
        <Skeleton variant="rectangular" width={300} height={36} sx={{ borderRadius: 1 }} />
      </Box>

      {/* Table */}
      <TableContainer component={Paper} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              {[...Array(4)].map((_, i) => (
                <TableCell key={i}>
                  <Skeleton variant="text" width={100} />
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {[...Array(3)].map((_, rowIndex) => (
              <TableRow key={rowIndex}>
                {[...Array(4)].map((_, cellIndex) => (
                  <TableCell key={cellIndex}>
                    <Skeleton variant="text" width={cellIndex === 3 ? 80 : 150} />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}