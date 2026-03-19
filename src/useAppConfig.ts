import { useState, useEffect } from 'react';

export interface AppConfig {
  goldCommPerGram: number;
  silverCommPerGram: number;
  itemCommissions: Record<string, number>;
  itemVisibility: Record<string, boolean>;
}

export const defaultConfig: AppConfig = {
  goldCommPerGram: 0,
  silverCommPerGram: 0,
  itemCommissions: {},
  itemVisibility: {},
};

export function useAppConfig() {
  const [config, setConfig] = useState<AppConfig>(defaultConfig);

  useEffect(() => {
    const saved = localStorage.getItem('eliteGoldConfig');
    if (saved) {
      try {
        setConfig({ ...defaultConfig, ...JSON.parse(saved) });
      } catch (e) {
        console.error('Failed to parse config', e);
      }
    }
  }, []);

  const updateConfig = (updates: Partial<AppConfig>) => {
    const newConfig = { ...config, ...updates };
    setConfig(newConfig);
    localStorage.setItem('eliteGoldConfig', JSON.stringify(newConfig));
  };

  return { config, updateConfig };
}
