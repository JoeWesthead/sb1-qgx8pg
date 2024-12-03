import React, { useState } from 'react';
import { Box, Typography, Alert, AlertTitle } from '@mui/material';
import { useConfig } from '../context/ConfigContext';
import { SkeletonLoader } from '../components/SkeletonLoader';
import { WorkloadSection } from './BeforeAfterChat/WorkloadSection';
import { MessagesSection } from './BeforeAfterChat/MessagesSection';
import { FollowUpsSection } from './BeforeAfterChat/FollowUpsSection';
import { TranscriptsSection } from './BeforeAfterChat/TranscriptsSection';
import { InformationCollectionSection } from './BeforeAfterChat/InformationCollectionSection';
import { FollowupFormSection } from './BeforeAfterChat/FollowupFormSection';
import { TagsSection } from './BeforeAfterChat/TagsSection';
import { usePreview } from '../context/PreviewContext';

export function BeforeAfterChat() {
  const { isLoading } = useConfig();
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
  const [informationCollectionData, setInformationCollectionData] = useState({
    fields: [
      {
        id: '1',
        name: 'Name',
        fieldName: 'visitorName',
        required: 'Always required',
      },
      {
        id: '2',
        name: 'Email',
        fieldName: 'visitorEmail',
        required: 'Always required',
      },
    ],
  });
  const [followupFormData, setFollowupFormData] = useState({
    fields: [
      {
        id: '1',
        name: 'Name',
        fieldName: 'visitorName',
        required: 'Always required',
      },
      {
        id: '2',
        name: 'Email',
        fieldName: 'visitorEmail',
        required: 'Always required',
      },
      {
        id: '3',
        name: 'Message',
        fieldName: 'visitorMessage',
        required: 'Always required',
      },
    ],
  });

  if (isLoading) {
    return <SkeletonLoader />;
  }

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

  const handleInformationCollectionSave = (data: any) => {
    setInformationCollectionData(data);
    console.log('Saving information collection:', data);
  };

  const handleFollowupFormSave = (data: any) => {
    setFollowupFormData(data);
    console.log('Saving followup form:', data);
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

      <Alert severity="success" sx={{ mb: 4 }}>
        <AlertTitle>
          <Typography component="span" sx={{ fontWeight: 400 }}>
            <Typography component="span" sx={{ fontWeight: 600 }}>
              Aiden
            </Typography>{' '}
            is currently deployed to{' '}
            <Typography component="span" sx={{ fontWeight: 600 }}>
              the Web
            </Typography>
          </Typography>
        </AlertTitle>
        AI Variants will act according to your instructions, and fall back to
        these Ground Rules when necessary. Use the Preview to test behavior.
      </Alert>

      <WorkloadSection initialData={workloadData} onSave={handleWorkloadSave} />

      <MessagesSection initialData={messagesData} onSave={handleMessagesSave} />

      <InformationCollectionSection
        initialData={informationCollectionData}
        onSave={handleInformationCollectionSave}
        hasAIFields={true}
      />

      <FollowupFormSection
        initialData={followupFormData}
        onSave={handleFollowupFormSave}
        hasAIFields={true}
      />

      <TagsSection />

      <FollowUpsSection
        initialData={followUpsData}
        onSave={handleFollowUpsSave}
      />

      <TranscriptsSection
        initialData={transcriptsData}
        onSave={handleTranscriptsSave}
      />
    </Box>
  );
}
