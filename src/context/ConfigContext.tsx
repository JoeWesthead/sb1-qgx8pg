import React, { createContext, useContext, useState } from 'react';
import { Snackbar, Alert } from '@mui/material';
import { configOptions } from '../config/settingsConfig';

type ConfigType = (typeof configOptions)[number];

interface ConfigContextType {
  currentPreset: ConfigType;
  activeConfig: ConfigType;
  setCurrentPreset: (config: ConfigType) => void;
  setActiveConfig: (config: ConfigType) => void;
  isLoading: boolean;
}

const ConfigContext = createContext<ConfigContextType | undefined>(undefined);

export function ConfigProvider({ children }: { children: React.ReactNode }) {
  const [currentPreset, setCurrentPreset] = useState<ConfigType>('Aiden');
  const [activeConfig, setActiveConfig] = useState<ConfigType>('Aiden');
  const [isLoading, setIsLoading] = useState(false);
  const [switchSnackbar, setSwitchSnackbar] = useState(false);

  const handlePresetChange = (newPreset: ConfigType) => {
    setIsLoading(true);
    setCurrentPreset(newPreset);
    setTimeout(() => setIsLoading(false), 500);
  };

  const handleActiveConfigChange = (newConfig: ConfigType) => {
    setSwitchSnackbar(true);
    setIsLoading(true);
    setTimeout(() => {
      setActiveConfig(newConfig);
      setIsLoading(false);
    }, 1000);
  };

  return (
    <ConfigContext.Provider
      value={{
        currentPreset,
        activeConfig,
        setCurrentPreset: handlePresetChange,
        setActiveConfig: handleActiveConfigChange,
        isLoading,
      }}
    >
      {children}
      <Snackbar
        open={switchSnackbar}
        autoHideDuration={3000}
        onClose={() => setSwitchSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert severity="info" onClose={() => setSwitchSnackbar(false)}>
          Loading AI Variant...
        </Alert>
      </Snackbar>
    </ConfigContext.Provider>
  );
}

export function useConfig() {
  const context = useContext(ConfigContext);
  if (context === undefined) {
    throw new Error('useConfig must be used within a ConfigProvider');
  }
  return context;
}
