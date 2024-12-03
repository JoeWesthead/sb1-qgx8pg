import { useMemo } from 'react';
import { useConfig } from '../context/ConfigContext';
import { settingsConfig } from '../config/settingsConfig';

export function useSettingVisibility(settingId: string): boolean {
  const { currentPreset } = useConfig();

  return useMemo(() => {
    const config = settingsConfig.find(cfg => cfg.name === currentPreset);
    if (!config) return false;

    // Special handling for Bespoke configurations
    if (config.type === 'bespoke') {
      // Show all sections except routing rules for bespoke configurations
      if (settingId === 'routingMethod') {
        return false;
      }
      return true;
    }

    return config.allowedSettingComponents.includes(settingId);
  }, [currentPreset, settingId]);
}