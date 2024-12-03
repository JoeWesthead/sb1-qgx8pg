import React, { useState } from 'react';
import { Box, Typography, Paper } from '@mui/material';
import { AgentName } from './AgentName';
import { AgentAvatar } from './AgentAvatar';
import { AgentTone } from './AgentTone';
import { CompanyName } from './CompanyName';
import { SectionFooter } from '../common/SectionFooter';

interface BotPersonaProps {
  initialName: string;
  initialAvatar: string | null;
  initialTone: string;
  initialCompanyName?: string;
  onSave: (data: { 
    name: string; 
    avatar: string | null; 
    tone: string;
    companyName: string;
  }) => void;
}

export function BotPersona({
  initialName,
  initialAvatar,
  initialTone,
  initialCompanyName = '',
  onSave,
}: BotPersonaProps) {
  const [name, setName] = useState(initialName);
  const [avatar, setAvatar] = useState<string | null>(initialAvatar);
  const [tone, setTone] = useState(initialTone);
  const [companyName, setCompanyName] = useState(initialCompanyName);

  const hasNameChanges = name !== initialName;
  const hasAvatarChanges = avatar !== initialAvatar;
  const hasToneChanges = tone !== initialTone;
  const hasCompanyNameChanges = companyName !== initialCompanyName;
  const hasChanges = hasNameChanges || hasAvatarChanges || hasToneChanges || hasCompanyNameChanges;

  const handleSave = () => {
    onSave({ name, avatar, tone, companyName });
  };

  const handleCancel = () => {
    setName(initialName);
    setAvatar(initialAvatar);
    setTone(initialTone);
    setCompanyName(initialCompanyName);
  };

  const handleAvatarUpload = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setAvatar(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  return (
    <>
      {/* <Box sx={{ mb: 2 }}>
        <Typography variant="h6">Chatbot Persona</Typography>
        <Typography variant="body2" color="text.secondary">
          Control how your artificial intelligence will present itself to your
          customers.
        </Typography>
      </Box> */}

      <Paper sx={{ p: 3, mb: 6, position: 'relative' }} variant="outlined">
        <AgentName
          value={name}
          onChange={setName}
          hasChanges={hasNameChanges}
        />

        <AgentAvatar
          avatar={avatar}
          agentName={name}
          onUpload={handleAvatarUpload}
          onRemove={() => setAvatar(null)}
          hasChanges={hasAvatarChanges}
        />

        <CompanyName
          value={companyName}
          onChange={setCompanyName}
          hasChanges={hasCompanyNameChanges}
        />

        <AgentTone
          value={tone}
          onChange={setTone}
          hasChanges={hasToneChanges}
        />

        <SectionFooter
          hasChanges={hasChanges}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </Paper>
    </>
  );
}