import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { useConfig } from '../context/ConfigContext';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { WorkloadSection } from './BeforeAfterChat/WorkloadSection';
import { MessagesSection } from './BeforeAfterChat/MessagesSection';
import { FollowUpsSection } from './BeforeAfterChat/FollowUpsSection';
import { TranscriptsSection } from './BeforeAfterChat/TranscriptsSection';
import { TagsSection } from './BeforeAfterChat/TagsSection';
import { usePreview } from '../context/PreviewContext';
import { SectionHeader } from './BeforeAfterChat/SectionHeader';
import { VariantAlert } from './BeforeAfterChat/VariantAlert';

export function BeforeAfterChat() {
  const { currentPreset, isLoading } = useConfig();
  const { isPreviewOpen } = usePreview();
  const [workloadData, setWorkloadData] = useState({
    routingGroup: 'Customer Support',
    distributionMethod: 'all',
    chatLimit: 3,
  });
  const [messagesData, setMessagesData] = useState({
    welcomeMessage: 'Hi there! How can I help you today?',
    goodbyeMessage: 'Thank you for chatting with us. Have a great day!',
  });
  const [followUpsData, setFollowUpsData] = useState({
    email: 'support@company.com',
    integrationSettings: {},
  });
  const [transcriptsData, setTranscriptsData] = useState({
    email: 'records@company.com',
    integrationSettings: {},
  });

  if (isLoading) {
    return <SkeletonLoader />;
  }

  const showAIChips = currentPreset !== 'Classic Olark';

  const handleWorkloadSave = (data: any) => {
    setWorkloadData(data);
    console.log('Saving workload:', data);
  };

  const handleMessagesSave = (data: any) => {
    setMessagesData(data);
    console.log('Saving messages:', data);
  };

  const handleFollowUpsSave = (data: any) => {
    setFollowUpsData(data);
    console.log('Saving follow ups:', data);
  };

  const handleTranscriptsSave = (data: any) => {
    setTranscriptsData(data);
    console.log('Saving transcripts:', data);
  };

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
      <Typography variant="h5" sx={{ mb: 3 }}>
        Ground Rules
      </Typography>

      <VariantAlert variant={currentPreset} />

      <Box sx={{ mb: 6 }}>
        <SectionHeader
          title="Workload Distribution"
          section="Workload"
          showAIChip={showAIChips}
          description="Control how incoming chats are distributed among your team members"
        />
        <WorkloadSection
          initialData={workloadData}
          onSave={handleWorkloadSave}
        />
      </Box>

      <Box sx={{ mb: 6 }}>
        <SectionHeader
          title="Messages"
          section="Messages"
          showAIChip={showAIChips}
          description="Customize the messages visitors see when starting and ending conversations"
        />
        <MessagesSection
          initialData={messagesData}
          onSave={handleMessagesSave}
        />
      </Box>

      <Box sx={{ mb: 6 }}>
        <SectionHeader
          title="Follow-ups"
          section="Follow-ups"
          showAIChip={showAIChips}
          description="Control where notifications should be sent that a visitor needs follow-up"
        />
        <FollowUpsSection
          initialData={followUpsData}
          onSave={handleFollowUpsSave}
        />
      </Box>

      <Box sx={{ mb: 6 }}>
        <SectionHeader
          title="Transcript Storage"
          section="Transcripts"
          showAIChip={showAIChips}
          description="Control where a record of all your chat transcripts will be sent"
        />
        <TranscriptsSection
          initialData={transcriptsData}
          onSave={handleTranscriptsSave}
        />
      </Box>
    </Box>
  );
}
