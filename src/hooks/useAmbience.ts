import { useContext } from 'react';
import { AmbienceContext } from '../context/AmbienceContext';

export function useAmbience() {
  const ctx = useContext(AmbienceContext);
  if (!ctx) {
    throw new Error('useAmbience must be used within AmbienceProvider');
  }
  return ctx;
}
