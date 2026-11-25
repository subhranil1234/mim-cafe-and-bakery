import React from 'react';

interface ChapterHeaderProps {
  number: string;
  label: string;
  title: string;
  subtitle?: string;
  headingId: string;
}

export const ChapterHeader: React.FC<ChapterHeaderProps> = ({
  number,
  label,
  title,
  subtitle,
  headingId,
}) => (
  <header className="reveal" style={{ marginBottom: 'clamp(2rem, 4vw, 3.5rem)' }}>
    <div style={{ display: 'flex', alignItems: 'baseline', gap: '1.25rem', flexWrap: 'wrap' }}>
      <span className="chapter-number" aria-hidden="true">
        {number}
      </span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        <span className="chapter-label">{label}</span>
        <h2 id={headingId} className="title headline-chapter" style={{ margin: 0 }}>
          {title}
        </h2>
      </div>
    </div>
    {subtitle && (
      <p className="headline-sub" style={{ marginTop: '1rem', marginBottom: 0, maxWidth: '40rem' }}>
        {subtitle}
      </p>
    )}
  </header>
);
