import React, { useState } from 'react';
import { Box, Typography, Button, Paper } from '@mui/material';
import { Preview } from './Preview';
import { SettingSection } from './SettingSection';
import { Banner } from './Banner';
import { useConfig } from '../context/ConfigContext';
import { SkeletonLoader } from './SkeletonLoader';
import { AgentName } from './BotPersona/AgentName';
import { AgentAvatar } from './BotPersona/AgentAvatar';
import { AgentTone } from './BotPersona/AgentTone';
import { PreviewMessage } from './BotPersona/PreviewMessage';
import { usePreview } from '../context/PreviewContext';

export function AISettings() {
  const { currentPreset, isLoading } = useConfig();
  const { isPreviewOpen } = usePreview();
  const [agentName, setAgentName] = useState('AI Assistant');
  const [tone, setTone] = useState(
    'Professional, courteous, and helpful. Responds with clear and concise answers while maintaining a friendly demeanor.'
  );
  const [avatar, setAvatar] = useState<string | null>(null);

  if (isLoading) {
    return <SkeletonLoader />;
  }

  if (currentPreset === 'Classic Olark') {
    return (
      <Box sx={{ p: 4, bgcolor: 'background.default' }}>
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
          Robots
        </Typography>
        <Banner
          title="Your current chatbot doesn't use AI."
          description="Switch to the Aiden AI Variant and try it out before turning it live on your site."
          action={
            <Button variant="contained" size="small" sx={{ mt: 2 }}>
              Try Aiden
            </Button>
          }
        />
      </Box>
    );
  }

  const handleAvatarUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      <Box
        sx={{
          flex: 1,
          p: 4,
          overflow: 'auto',
          // transition: 'margin 225ms cubic-bezier(0, 0, 0.2, 1) 0ms',
          marginRight: isPreviewOpen ? '400px' : 0,
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
          Bot Persona
        </Typography>

        <Paper sx={{ p: 4, mb: 4 }}>
          <SettingSection id="botDisplayName">
            <AgentName value={agentName} onChange={setAgentName} />
          </SettingSection>

          <SettingSection id="botAvatar">
            <AgentAvatar
              avatar={avatar}
              agentName={agentName}
              onUpload={handleAvatarUpload}
              onRemove={() => setAvatar(null)}
            />
          </SettingSection>

          {currentPreset !== 'Bespoke without Aiden' && (
            <SettingSection id="botToneInstructions">
              <AgentTone value={tone} onChange={setTone} />
            </SettingSection>
          )}
        </Paper>
      </Box>

      <Preview
        chatContent={<PreviewMessage avatar={avatar} agentName={agentName} />}
      />
    </Box>
  );
}
