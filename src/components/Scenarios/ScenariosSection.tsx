import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Button,
  Paper,
  Stack,
  TextField,
  InputAdornment,
  Chip,
} from '@mui/material';
import { HelpCircle, Edit2, Trash2, Plus, Search } from 'lucide-react';
import { ScenarioModal } from './ScenarioModal';
import { HelpDialog } from '../common/HelpDialog';
import { EmptyFeatureCard } from '../KnowledgeBase/EmptyFeatureCard';

interface Scenario {
  id: string;
  name: string;
  whenToApply: string;
  tags?: string[];
  escalationGroup?: string;
  fallbackMessage?: string;
}

interface ScenariosSectionProps {
  scenarios: Scenario[];
}

export function ScenariosSection({ scenarios: initialScenarios }: ScenariosSectionProps) {
  const [scenarios, setScenarios] = useState<Scenario[]>(initialScenarios);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingScenario, setEditingScenario] = useState<Scenario | null>(null);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);

  // Update scenarios when initialScenarios changes
  useEffect(() => {
    setScenarios(initialScenarios);
  }, [initialScenarios]);

  const filteredScenarios = scenarios.filter(scenario =>
    scenario.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scenario.whenToApply.toLowerCase().includes(searchQuery.toLowerCase()) ||
    scenario.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  const handleAddScenario = () => {
    setEditingScenario(null);
    setIsModalOpen(true);
  };

  const handleEditScenario = (scenario: Scenario) => {
    setEditingScenario(scenario);
    setIsModalOpen(true);
  };

  const handleDeleteScenario = (id: string) => {
    setScenarios(prev => prev.filter(s => s.id !== id));
  };

  const handleSaveScenario = (data: Omit<Scenario, 'id'>) => {
    if (editingScenario) {
      setScenarios(prev =>
        prev.map(s => (s.id === editingScenario.id ? { ...data, id: editingScenario.id } : s))
      );
    } else {
      setScenarios(prev => [...prev, { ...data, id: crypto.randomUUID() }]);
    }
    setIsModalOpen(false);
    setEditingScenario(null);
  };

  return (
    <Box sx={{ mb: 8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
        <Typography variant="h6">Scenarios</Typography>
        <IconButton size="small" onClick={() => setHelpDialogOpen(true)}>
          <HelpCircle size={20} />
        </IconButton>
      </Box>

      {scenarios.length === 0 ? (
        <EmptyFeatureCard
          title="Scenarios"
          description="Set up intelligent routing and tagging based on conversation context and customer needs."
          benefits={[
            'Automated routing',
            'Smart categorization',
            'Priority handling',
            'Consistent escalation',
          ]}
          onAdd={handleAddScenario}
          addButtonText="Add Scenario"
        />
      ) : (
        <>
          <Stack
            direction="row"
            sx={{ mb: 1 }}
            spacing={2}
            alignItems="center"
            justifyContent="space-between"
          >
            <Button
              variant="soft"
              startIcon={<Plus size={16} />}
              onClick={handleAddScenario}
            >
              Add Scenario
            </Button>
            <TextField
              size="small"
              placeholder="Search scenarios..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{ width: 300 }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={16} />
                  </InputAdornment>
                ),
              }}
            />
          </Stack>

          <TableContainer component={Paper} variant="outlined">
            <Table size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>When to Apply</TableCell>
                  <TableCell>Tags</TableCell>
                  <TableCell>Escalation Group</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredScenarios.map((scenario) => (
                  <TableRow key={scenario.id}>
                    <TableCell>{scenario.name}</TableCell>
                    <TableCell>
                      <Typography variant="body2" color="text.secondary">
                        {scenario.whenToApply}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Stack direction="row" spacing={1}>
                        {scenario.tags?.map((tag) => (
                          <Chip key={tag} label={tag} size="small" />
                        ))}
                      </Stack>
                    </TableCell>
                    <TableCell>{scenario.escalationGroup}</TableCell>
                    <TableCell align="right">
                      <Stack direction="row" spacing={1} justifyContent="flex-end">
                        <IconButton
                          size="small"
                          onClick={() => handleEditScenario(scenario)}
                        >
                          <Edit2 size={18} />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDeleteScenario(scenario.id)}
                        >
                          <Trash2 size={18} />
                        </IconButton>
                      </Stack>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredScenarios.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <Typography color="text.secondary">
                        No scenarios found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}

      <ScenarioModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveScenario}
        scenario={editingScenario}
      />

      <HelpDialog
        open={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
        title="Scenarios"
        description="Set up intelligent routing and tagging based on conversation context and customer needs."
        benefits={[
          'Automated routing',
          'Smart categorization',
          'Priority handling',
          'Consistent escalation',
        ]}
      />
    </Box>
  );
}