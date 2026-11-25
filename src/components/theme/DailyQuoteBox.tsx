import React from 'react';
import { useAmbience } from '../../hooks/useAmbience';
import { formatSiliguriShortDate, getDailyQuoteForDateKey } from '../../data/dailyQuotes';
import { MimHeart } from '../illustrations/BotanicalMotifs';
import './DailyQuoteBox.css';

interface DailyQuoteBoxProps {
  compact?: boolean;
}

export const DailyQuoteBox: React.FC<DailyQuoteBoxProps> = ({ compact = false }) => {
  const { activeTheme, solar } = useAmbience();
  const quote = getDailyQuoteForDateKey(solar.localDateKey);
  const shortDate = formatSiliguriShortDate(solar.localDateKey);

  return (
    <div className={`daily-quote-wrap ${compact ? 'is-compact' : ''}`}>
      <div className="daily-quote-box" aria-label={`Daily note for ${shortDate}: ${quote}`}>
        <span className="daily-quote-heart" aria-hidden="true">
          <MimHeart size={12} />
        </span>
        <span className="daily-quote-text">“{quote}”</span>
      </div>
      <span className="daily-quote-meta">
        {shortDate} · Siliguri {activeTheme === 'night' ? 'Evening' : 'Daylight'}
      </span>
    </div>
  );
};
