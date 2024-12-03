import React, { useState } from 'react';
import {
  Box,
  Typography,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  TextField,
  Stack,
  Divider,
  Paper,
} from '@mui/material';
import { SectionFooter } from '../common/SectionFooter';

interface WorkloadData {
  routingGroup: string;
  distributionMethod: string;
  chatLimit: number;
}

interface WorkloadSectionProps {
  initialData: WorkloadData;
  onSave: (data: WorkloadData) => void;
}

export function WorkloadSection({ initialData, onSave }: WorkloadSectionProps) {
  const [data, setData] = useState(initialData);

  const hasChanges = JSON.stringify(data) !== JSON.stringify(initialData);

  const handleSave = () => {
    onSave(data);
  };

  const handleCancel = () => {
    setData(initialData);
  };

  return (
    <>
      <Paper sx={{ p: 3, mb: 6 }} variant="outlined">
        <FormControl fullWidth sx={{ mb: 4 }}>
          <Typography variant="subtitle2" gutterBottom>
            Routing group
          </Typography>
          <Select
            value={data.routingGroup}
            onChange={(e) => setData({ ...data, routingGroup: e.target.value })}
            size="small"
            sx={{ maxWidth: 240 }}
          >
            <MenuItem value="Customer Support">Customer Support</MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Technical Support">Technical Support</MenuItem>
          </Select>
        </FormControl>

        <FormControl fullWidth>
          <Typography variant="subtitle2">Distribution method</Typography>
          <RadioGroup
            value={data.distributionMethod}
            onChange={(e) =>
              setData({ ...data, distributionMethod: e.target.value })
            }
          >
            <FormControlLabel
              value="all"
              control={<Radio />}
              label="All available agents"
            />
            <Box>
              <FormControlLabel
                value="round-robin"
                control={<Radio />}
                label="Round robin"
              />

              <Box sx={{ ml: 4, mt: 1 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Chat limit per agent
                </Typography>
                <TextField
                  type="number"
                  value={data.chatLimit}
                  onChange={(e) =>
                    setData({
                      ...data,
                      chatLimit: parseInt(e.target.value, 10),
                    })
                  }
                  size="small"
                  sx={{ width: 100 }}
                  disabled={data.distributionMethod !== 'round-robin'}
                />
              </Box>
            </Box>
          </RadioGroup>
        </FormControl>

        <SectionFooter
          hasChanges={hasChanges}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Paper>
    </>
  );
}
