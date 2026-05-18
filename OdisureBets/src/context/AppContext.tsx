import React, { createContext, useContext, useState, useEffect } from 'react';
import { Prediction, Referral, UnlockCode } from '../types';
import { getFromStorage, saveToStorage } from '../lib/utils';
import { MOCK_PREDICTIONS } from '../constants';

interface AppContextType {
  predictions: Prediction[];
  setPredictions: (preds: Prediction[]) => void;
  referrals: Referral[];
  activeCode: UnlockCode | null;
  setActiveCode: (code: UnlockCode | null) => void;
  isVip: boolean;
  unlockVip: (code: string) => boolean;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [predictions, setPredictions] = useState<Prediction[]>(() => 
    getFromStorage<Prediction[]>('predictions', MOCK_PREDICTIONS)
  );
  
  const [referrals] = useState<Referral[]>(() => 
    getFromStorage<Referral[]>('referrals', [])
  );

  const [activeCode, setActiveCode] = useState<UnlockCode | null>(() => 
    getFromStorage<UnlockCode | null>('active_code', null)
  );

  const isVip = activeCode !== null && activeCode.isActive;

  useEffect(() => {
    saveToStorage('predictions', predictions);
  }, [predictions]);

  useEffect(() => {
    saveToStorage('active_code', activeCode);
  }, [activeCode]);

  const unlockVip = (codeStr: string) => {
    // In a real app, this would verify with backend
    // For this demo, let's say codes starting with "VIP-" are valid
    // and we also check local storage "valid_codes"
    const validCodes = getFromStorage<string[]>('valid_codes', ['VIP-SURE-2024', 'ODISURE-FREE']);
    
    if (validCodes.includes(codeStr)) {
      const newCode: UnlockCode = {
        code: codeStr,
        plan: 'Premium',
        expiry: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString(),
        isActive: true
      };
      setActiveCode(newCode);
      return true;
    }
    return false;
  };

  return (
    <AppContext.Provider value={{ 
      predictions, 
      setPredictions, 
      referrals, 
      activeCode, 
      setActiveCode,
      isVip,
      unlockVip
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
