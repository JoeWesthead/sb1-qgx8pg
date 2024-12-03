export type ConfigType = 
  | 'Aiden'
  | 'Aiden (Empty)'
  | 'Bespoke with Aiden'
  | 'Bespoke without Aiden'
  | 'Classic Olark';

export interface SettingVisibility {
  id: string;
  isVisible: boolean;
}