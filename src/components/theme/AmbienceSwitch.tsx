import React from 'react';
import { Moon, Sparkles, Sun } from 'lucide-react';
import { useAmbience } from '../../hooks/useAmbience';
import { AmbiencePreference } from '../../utils/solarTime';
import './AmbienceSwitch.css';

interface AmbienceSwitchProps {
  compact?: boolean;
}

const OPTIONS: { id: AmbiencePreference; label: string; icon: React.ReactNode }[] = [
  { id: 'auto', label: 'Auto', icon: <Sparkles size={13} aria-hidden="true" /> },
  { id: 'day', label: 'Day', icon: <Sun size={13} aria-hidden="true" /> },
  { id: 'night', label: 'Night', icon: <Moon size={13} aria-hidden="true" /> },
];

export const AmbienceSwitch: React.FC<AmbienceSwitchProps> = ({ compact = false }) => {
  const { preference, activeTheme, solar, setPreference } = useAmbience();

  const statusText =
    preference === 'auto'
      ? `Siliguri ${activeTheme === 'day' ? 'Daylight' : 'Evening'} · ${solar.localTimeFormatted}`
      : `Manual ${preference === 'day' ? 'Day' : 'Night'} Ambience`;

  return (
    <div className={`ambience-control ${compact ? 'is-compact' : ''}`}>
      <div
        className="ambience-segmented"
        role="group"
        aria-label="MIM Living Ambience mode"
      >
        {OPTIONS.map((opt) => {
          const isSelected = preference === opt.id;
          return (
            <button
              key={opt.id}
              type="button"
              onClick={() => setPreference(opt.id)}
              aria-pressed={isSelected}
              className={`ambience-option ${isSelected ? 'is-active' : ''}`}
              title={
                opt.id === 'auto'
                  ? `Follow Siliguri sunrise (${solar.sunriseFormatted}) and sunset (${solar.sunsetFormatted})`
                  : `Switch to MIM by ${opt.label}`
              }
            >
              {opt.icon}
              <span>{opt.label}</span>
            </button>
          );
        })}
      </div>
      {!compact && (
        <span className="ambience-status" aria-live="polite">
          {statusText}
        </span>
      )}
    </div>
  );
};
