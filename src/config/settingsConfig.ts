import { ConfigType } from '../types';

export const configOptions = [
  'Aiden',
  'Aiden (Empty)',
  'Bespoke with Aiden',
  'Bespoke without Aiden',
  'Classic Olark'
] as const;

export interface SettingComponent {
  id: string;
  name: string;
  description?: string;
}

export interface ConfigTemplate {
  name: ConfigType;
  type: 'classic' | 'template' | 'bespoke';
  description: string;
  allowedSettingComponents: string[];
  lastActive?: string;
}

export const settingsConfig: ConfigTemplate[] = [
  {
    name: 'Aiden',
    type: 'template',
    description: 'Human agents assisted by AI',
    allowedSettingComponents: [
      'trancriptsEmail',
      'routingMethod',
      'chatLimit',
      'welcomeMessage',
      'prechatForm',
      'offlineForm',
      'followupEmail',
      'teamShortcuts',
      'cobrowsing',
      'integrationSpecificLogic',
      'botDisplayName',
      'botAvatar',
      'botToneInstructions',
      'knowledgeSources',
      'stockAnswers'
    ]
  },
  {
    name: 'Aiden (Empty)',
    type: 'template',
    description: 'Fresh AI variant ready for configuration',
    allowedSettingComponents: [
      'trancriptsEmail',
      'routingMethod',
      'chatLimit',
      'welcomeMessage',
      'prechatForm',
      'offlineForm',
      'followupEmail',
      'teamShortcuts',
      'cobrowsing',
      'integrationSpecificLogic',
      'botDisplayName',
      'botAvatar',
      'botToneInstructions',
      'knowledgeSources',
      'stockAnswers'
    ]
  },
  {
    name: 'Bespoke with Aiden',
    type: 'bespoke',
    description: 'Your bespoke bot with AI',
    allowedSettingComponents: [
      'trancriptsEmail',
      'welcomeMessage',
      'prechatForm',
      'followupEmail',
      'teamShortcuts',
      'cobrowsing',
      'botDisplayName',
      'botAvatar',
      'botToneInstructions',
      'knowledgeSources',
      'stockAnswers'
    ]
  },
  {
    name: 'Bespoke without Aiden',
    type: 'bespoke',
    description: 'Your bespoke bot without AI',
    allowedSettingComponents: [
      'trancriptsEmail',
      'welcomeMessage',
      'prechatForm',
      'followupEmail',
      'teamShortcuts',
      'cobrowsing',
      'botDisplayName',
      'botAvatar'
    ]
  },
  {
    name: 'Classic Olark',
    type: 'classic',
    description: 'Traditional live chat without AI',
    allowedSettingComponents: [
      'trancriptsEmail',
      'routingMethod',
      'chatLimit',
      'welcomeMessage',
      'prechatForm',
      'offlineForm',
      'followupEmail',
      'teamShortcuts',
      'cobrowsing'
    ],
    lastActive: '2024-02-15'
  }
];