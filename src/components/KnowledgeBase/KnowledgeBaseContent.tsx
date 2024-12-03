import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Stack,
  Alert,
  TextField,
  InputAdornment,
  Tooltip,
  Link,
  Grid,
} from '@mui/material';
import {
  Plus,
  Edit2,
  Trash2,
  CheckCircle2,
  AlertCircle,
  Clock,
  HelpCircle,
  Search,
  Zap,
} from 'lucide-react';
import { useConfig } from '../../context/ConfigContext';
import { KnowledgeSourceModal } from '../KnowledgeSourceModal';
import { AddSourceModal } from '../AddSourceModal';
import { StockAnswerModal } from '../StockAnswerModal';
import { BotPersona } from '../BotPersona';
import { HelpDialog } from '../common/HelpDialog';
import { ScenariosSection } from '../Scenarios/ScenariosSection';
import { FieldsSection } from '../Fields/FieldsSection';
import { EmptyFeatureCard } from './EmptyFeatureCard';
import { LoadingSkeleton } from './LoadingSkeleton';
import { mockData } from '../../config/mockData';

const features = {
  knowledgeSources: {
    title: 'Knowledge Sources',
    description:
      'Train your AI with your documentation, websites, and databases to provide accurate, contextual responses.',
    benefits: [
      'Automatic knowledge extraction',
      'Real-time updates',
      'Contextual understanding',
    ],
  },
  stockPhrases: {
    title: 'Stock Phrases',
    description:
      'Define exact responses for common questions, ensuring consistency and accuracy in AI responses.',
    benefits: ['Consistent messaging', 'Quick responses', 'Quality control'],
  },
  scenarios: {
    title: 'Scenarios',
    description:
      'Set up intelligent routing and tagging based on conversation context and customer needs.',
    benefits: [
      'Automated routing',
      'Smart categorization',
      'Priority handling',
    ],
  },
  fields: {
    title: 'Fields',
    description:
      'Let AI naturally collect important information during conversations without interrupting flow.',
    benefits: [
      'Natural data collection',
      'Flexible requirements',
      'Integration ready',
    ],
  },
  botPersona: {
    title: 'Bot Persona',
    description:
      'Customize how your AI presents itself to match your brand voice and style.',
    benefits: [
      'Brand consistency',
      'Customizable personality',
      'Professional appearance',
    ],
  },
};

interface KnowledgeBaseContentProps {
  isLoading: boolean;
}

export function KnowledgeBaseContent({ isLoading }: KnowledgeBaseContentProps) {
  const { currentPreset } = useConfig();
  const variantData = mockData[currentPreset];

  const [knowledgeSources, setKnowledgeSources] = useState(
    variantData.knowledgeSources
  );
  const [stockAnswers, setStockAnswers] = useState(variantData.stockAnswers);
  const [sourceSearchQuery, setSourceSearchQuery] = useState('');
  const [answerSearchQuery, setAnswerSearchQuery] = useState('');
  const [isSourceModalOpen, setIsSourceModalOpen] = useState(false);
  const [isAddSourceModalOpen, setIsAddSourceModalOpen] = useState(false);
  const [isStockAnswerModalOpen, setIsStockAnswerModalOpen] = useState(false);
  const [editingAnswer, setEditingAnswer] = useState<any | null>(null);
  const [helpDialogOpen, setHelpDialogOpen] = useState(false);
  const [currentFeature, setCurrentFeature] = useState<
    keyof typeof features | null
  >(null);

  const isClassicOlark = currentPreset === 'Classic Olark';
  const showBotPersona =
    currentPreset !== 'Bespoke without Aiden' && !isClassicOlark;

  // Update state when variant changes
  React.useEffect(() => {
    setKnowledgeSources(variantData.knowledgeSources);
    setStockAnswers(variantData.stockAnswers);
  }, [currentPreset, variantData]);

  const handleHelpClick = (feature: keyof typeof features) => {
    setCurrentFeature(feature);
    setHelpDialogOpen(true);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Ready':
        return (
          <Tooltip title="Ready">
            <Box sx={{ color: 'success.main' }}>
              <CheckCircle2 size={20} />
            </Box>
          </Tooltip>
        );
      case 'Processing':
        return (
          <Tooltip title="Processing">
            <Box sx={{ color: 'warning.main' }}>
              <Clock size={20} />
            </Box>
          </Tooltip>
        );
      case 'Error':
        return (
          <Tooltip title="Error">
            <Box sx={{ color: 'error.main' }}>
              <AlertCircle size={20} />
            </Box>
          </Tooltip>
        );
      default:
        return null;
    }
  };

  const handleSaveStockAnswer = (data: any) => {
    if (editingAnswer) {
      setStockAnswers((prev) =>
        prev.map((a) => (a.id === editingAnswer.id ? { ...a, ...data } : a))
      );
    } else {
      setStockAnswers((prev) => [
        ...prev,
        { id: crypto.randomUUID(), ...data },
      ]);
    }
    setEditingAnswer(null);
    setIsStockAnswerModalOpen(false);
  };

  const handleEditAnswer = (answer: any) => {
    setEditingAnswer(answer);
    setIsStockAnswerModalOpen(true);
  };

  const handleDeleteAnswer = (id: string) => {
    setStockAnswers((prev) => prev.filter((a) => a.id !== id));
  };

  if (isLoading) {
    return (
      <>
        <LoadingSkeleton title="Knowledge Sources" />
        <LoadingSkeleton title="Stock Phrases" />
        <LoadingSkeleton title="Scenarios" />
        <LoadingSkeleton title="Fields" />
        {showBotPersona && <LoadingSkeleton title="Bot Persona" />}
      </>
    );
  }

  if (isClassicOlark) {
    return (
      <Box>
        {/* <Typography variant="h5" sx={{ mb: 3 }}>
          {currentPreset}
        </Typography> */}

        <Paper
          sx={{
            p: 4,
            mb: 6,
            bgcolor: 'primary.main',
            color: 'primary.contrastText',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            gap: 2,
          }}
        >
          <Stack direction="row" spacing={2} alignItems="center">
            <Zap size={24} />
            <Typography variant="h5">Upgrade to AI-Powered Support</Typography>
          </Stack>
          <Typography variant="body1" sx={{ maxWidth: 600 }}>
            Transform your customer support with AI capabilities. Get instant
            responses, intelligent routing, and automated information collection
            - all while maintaining the personal touch your customers love.
          </Typography>
          <Button
            variant="contained"
            color="inherit"
            size="large"
            component={Link}
            href="/billing"
            sx={{
              color: 'primary.main',
              bgcolor: 'primary.contrastText',
              '&:hover': {
                bgcolor: 'primary.contrastText',
                opacity: 0.9,
              },
            }}
          >
            Upgrade Now
          </Button>
        </Paper>

        {/* <Typography variant="h6" sx={{ mb: 3 }}>
          Available Features with AI Upgrade:
        </Typography> */}

        <Grid container spacing={3}>
          {Object.entries(features).map(([key, feature]) => (
            <Grid item xs={12} md={6} key={key}>
              <Box>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    mb: 0.5,
                  }}
                >
                  <Typography variant="h6">{feature.title}</Typography>
                  <IconButton
                    size="small"
                    onClick={() =>
                      handleHelpClick(key as keyof typeof features)
                    }
                  >
                    <HelpCircle size={20} />
                  </IconButton>
                </Box>
                <EmptyFeatureCard
                  title={feature.title}
                  description={feature.description}
                  benefits={feature.benefits}
                />
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    );
  }

  return (
    <Box>
      {/* <Typography variant="h5" sx={{ mb: 3 }}>
        {currentPreset}
      </Typography> */}

      <Box sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="h6">Knowledge Sources</Typography>
          <IconButton
            size="small"
            onClick={() => handleHelpClick('knowledgeSources')}
          >
            <HelpCircle size={20} />
          </IconButton>
        </Box>

        {knowledgeSources.length === 0 ? (
          <EmptyFeatureCard
            {...features.knowledgeSources}
            onAdd={() => setIsAddSourceModalOpen(true)}
            addButtonText="Add Source"
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
                onClick={() => setIsAddSourceModalOpen(true)}
              >
                Add Source
              </Button>
              <TextField
                size="small"
                placeholder="Search sources..."
                value={sourceSearchQuery}
                onChange={(e) => setSourceSearchQuery(e.target.value)}
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
                    <TableCell>Status</TableCell>
                    <TableCell>Source</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Last Updated</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {knowledgeSources.map((source) => (
                    <TableRow key={source.id}>
                      <TableCell>{getStatusIcon(source.status)}</TableCell>
                      <TableCell>{source.name}</TableCell>
                      <TableCell>
                        <Typography color="text.secondary">
                          {source.type}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography color="text.secondary">
                          {source.lastUpdated.toLocaleDateString()}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <IconButton size="small" color="error">
                          <Trash2 size={18} />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>

      <Box sx={{ mb: 8 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Typography variant="h6">Stock Phrases</Typography>
          <IconButton
            size="small"
            onClick={() => handleHelpClick('stockPhrases')}
          >
            <HelpCircle size={20} />
          </IconButton>
        </Box>

        {stockAnswers.length === 0 ? (
          <EmptyFeatureCard
            {...features.stockPhrases}
            onAdd={() => setIsStockAnswerModalOpen(true)}
            addButtonText="Add Stock Phrase"
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
                onClick={() => setIsStockAnswerModalOpen(true)}
              >
                Add Stock Phrase
              </Button>
              <TextField
                size="small"
                placeholder="Search phrases..."
                value={answerSearchQuery}
                onChange={(e) => setAnswerSearchQuery(e.target.value)}
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
                    <TableCell>Answer</TableCell>
                    <TableCell>Questions</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {stockAnswers.map((answer) => (
                    <TableRow key={answer.id}>
                      <TableCell>{answer.answer}</TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          &#8220;{answer.questions[0]}&#8221;
                          {answer.questions.length > 1 &&
                            ` and ${answer.questions.length - 1} more`}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Stack
                          direction="row"
                          spacing={1}
                          justifyContent="flex-end"
                        >
                          <IconButton
                            size="small"
                            onClick={() => handleEditAnswer(answer)}
                          >
                            <Edit2 size={18} />
                          </IconButton>
                          <IconButton
                            size="small"
                            color="error"
                            onClick={() => handleDeleteAnswer(answer.id)}
                          >
                            <Trash2 size={18} />
                          </IconButton>
                        </Stack>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </>
        )}
      </Box>

      <ScenariosSection scenarios={variantData.scenarios} />
      <FieldsSection fields={variantData.fields} />

      {showBotPersona && (
        <Box sx={{ mb: 6 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Typography variant="h6">Chatbot Persona</Typography>
            <IconButton
              size="small"
              onClick={() => handleHelpClick('botPersona')}
            >
              <HelpCircle size={20} />
            </IconButton>
          </Box>
          <BotPersona
            initialName="AI Assistant"
            initialAvatar={null}
            initialTone="Professional, courteous, and helpful. Responds with clear and concise answers while maintaining a friendly demeanor."
            onSave={(data) => {
              console.log('Saving bot persona:', data);
            }}
          />
        </Box>
      )}

      <HelpDialog
        open={helpDialogOpen}
        onClose={() => setHelpDialogOpen(false)}
        title={currentFeature ? features[currentFeature].title : ''}
        description={currentFeature ? features[currentFeature].description : ''}
        benefits={currentFeature ? features[currentFeature].benefits : []}
      />

      <KnowledgeSourceModal
        open={isSourceModalOpen}
        onClose={() => setIsSourceModalOpen(false)}
        onSave={() => {}}
        initialSources={knowledgeSources}
      />

      <AddSourceModal
        open={isAddSourceModalOpen}
        onClose={() => setIsAddSourceModalOpen(false)}
        onAdd={() => {}}
      />

      <StockAnswerModal
        open={isStockAnswerModalOpen}
        onClose={() => setIsStockAnswerModalOpen(false)}
        onSave={handleSaveStockAnswer}
        initialData={editingAnswer}
      />
    </Box>
  );
}
