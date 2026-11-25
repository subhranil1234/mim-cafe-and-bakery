import React from 'react';

interface MotifProps {
  className?: string;
}

/** Signature MIM red heart (#D52648) */
export const MimHeart: React.FC<MotifProps & { size?: number }> = ({ className = '', size = 16 }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 22"
    fill="none"
    aria-hidden="true"
    className={className}
  >
    <path
      d="M12 20.4C11.6 20.4 11.2 20.25 10.9 19.98C6.02 15.63 2.5 12.14 2.5 7.75C2.5 4.42 5.04 2 8.2 2C10.02 2 11.62 2.9 12 4.15C12.38 2.9 13.98 2 15.8 2C18.96 2 21.5 4.42 21.5 7.75C21.5 12.14 17.98 15.63 13.1 19.98C12.8 20.25 12.4 20.4 12 20.4Z"
      fill="#D52648"
    />
  </svg>
);

/** Botanical meadow sprig inspired by the MIM Soul Food / Pasta menu */
export const BotanicalSprig: React.FC<MotifProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 180 240"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M28 228C54 180 86 128 134 32" />
    {/* Lower leaves */}
    <path d="M56 184C36 168 24 146 32 126C52 132 66 154 56 184Z" />
    <path d="M56 184C46 162 40 144 33 128" opacity="0.65" />
    <path d="M72 162C94 148 118 152 132 168C110 180 86 178 72 162Z" />
    <path d="M74 162C96 162 114 164 129 168" opacity="0.65" />
    <path d="M84 134C62 116 56 90 68 72C88 86 96 112 84 134Z" />
    <path d="M84 134C78 112 73 94 69 76" opacity="0.65" />
    <path d="M102 108C124 98 148 106 160 124C138 134 114 126 102 108Z" />
    {/* Delicate blossom clusters */}
    <circle cx="118" cy="72" r="2.2" fill="currentColor" />
    <circle cx="128" cy="60" r="1.8" fill="currentColor" />
    <circle cx="110" cy="54" r="1.8" fill="currentColor" />
    <circle cx="136" cy="46" r="2.1" fill="currentColor" />
    <circle cx="144" cy="34" r="1.7" fill="currentColor" />
    <circle cx="124" cy="36" r="1.6" fill="currentColor" />
    <circle cx="132" cy="24" r="1.9" fill="currentColor" />
    <circle cx="146" cy="62" r="1.6" fill="currentColor" />
    <circle cx="152" cy="48" r="1.5" fill="currentColor" />
  </svg>
);

/** Cosmos daisy bloom inspired by the MIM Creative Experiences card */
export const CosmosFlower: React.FC<MotifProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 180 180"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.25"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M106 104C122 128 138 152 152 174" />
    <ellipse cx="90" cy="78" rx="14" ry="10" transform="rotate(-24 90 78)" />
    <path d="M82 70C62 52 46 66 64 82" />
    <path d="M76 80C46 76 42 98 68 96" />
    <path d="M80 90C54 106 66 126 88 102" />
    <path d="M92 92C90 122 114 120 106 94" />
    <path d="M104 86C132 100 138 74 110 74" />
    <path d="M104 72C128 54 108 36 96 64" />
    <path d="M92 66C92 34 66 42 80 68" />
    <circle cx="88" cy="77" r="1.6" fill="currentColor" />
    <circle cx="94" cy="80" r="1.4" fill="currentColor" />
    <circle cx="86" cy="82" r="1.4" fill="currentColor" />
  </svg>
);

/** Vintage floral stem border inspired by the Mains/Burgers menu */
export const FloralStemPanel: React.FC<MotifProps> = ({ className = '' }) => (
  <svg
    viewBox="0 0 220 340"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.15"
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    className={className}
  >
    <path d="M110 326C108 242 114 148 112 24" />
    <path d="M111 262C84 246 60 220 52 190C76 196 98 220 111 262Z" />
    <path d="M111 218C144 204 166 176 174 144C148 152 124 178 111 218Z" />
    <path d="M112 162C80 148 56 122 48 92C74 98 98 124 112 162Z" />
    <path d="M112 116C142 102 164 78 170 48C146 56 124 80 112 116Z" />
    {/* Blooms */}
    <circle cx="52" cy="184" r="12" />
    <circle cx="52" cy="184" r="4" />
    <circle cx="174" cy="138" r="14" />
    <circle cx="174" cy="138" r="5" />
    <circle cx="48" cy="86" r="11" />
    <circle cx="112" cy="24" r="15" />
    <circle cx="112" cy="24" r="5" />
  </svg>
);

/** Creative Studio activity illustrations */
export const StudioIllustration: React.FC<{
  type: 'cake' | 'clay' | 'canvas';
  className?: string;
}> = ({ type, className = '' }) => {
  if (type === 'cake') {
    return (
      <svg
        viewBox="0 0 220 220"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
      >
        {/* Pedestal cake stand */}
        <path d="M44 168H176" />
        <path d="M98 168V190" />
        <path d="M122 168V190" />
        <path d="M74 196C92 188 128 188 146 196H74Z" />
        {/* Cake tiers & scalloped frosting */}
        <rect x="62" y="102" width="96" height="66" rx="4" />
        <path d="M62 120C74 132 86 132 94 120C102 132 118 132 126 120C134 132 146 132 158 120" />
        {/* Piped rosettes */}
        <circle cx="82" cy="96" r="6" />
        <circle cx="110" cy="94" r="7" />
        <circle cx="138" cy="96" r="6" />
        {/* Piping bag & delicate heart */}
        <path d="M150 42L186 24L172 62L144 76L150 42Z" />
        <path
          d="M110 72C104 65 94 67 94 74C94 82 110 90 110 90C110 90 126 82 126 74C126 67 116 65 110 72Z"
          fill="#D52648"
          stroke="none"
        />
      </svg>
    );
  }

  if (type === 'clay') {
    return (
      <svg
        viewBox="0 0 220 220"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        className={className}
      >
        {/* Handcrafted clay trinket dish & sculpted mug (NOT wheel pottery) */}
        <ellipse cx="96" cy="156" rx="56" ry="18" />
        <path d="M40 156C44 176 70 188 96 188C122 188 148 176 152 156" />
        {/* Mini hand-pinched vessel */}
        <path d="M74 96C72 124 78 144 96 144C114 144 120 124 118 96" />
        <ellipse cx="96" cy="96" rx="22" ry="7" />
        {/* Sculpting wooden ribbon tool & fine brush */}
        <path d="M148 148L178 44" />
        <circle cx="180" cy="38" r="6" />
        <path d="M160 156L194 72" />
        <path d="M194 72C198 62 204 58 202 52C196 52 190 60 188 70Z" />
        {/* Tiny painted heart detail on keepsake */}
        <path
          d="M96 116C92 112 86 113 86 118C86 123 96 128 96 128C96 128 106 123 106 118C106 113 100 112 96 116Z"
          fill="#D52648"
          stroke="none"
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 220 220"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      {/* Tabletop canvas & easel */}
      <path d="M56 188L84 52" />
      <path d="M164 188L136 52" />
      <path d="M110 34V182" />
      <rect x="64" y="64" width="92" height="100" rx="2" fill="var(--background)" />
      {/* Expressive brushstroke & floral sketch on canvas */}
      <path d="M82 132C94 112 108 122 120 102C130 86 138 96 144 88" />
      <circle cx="96" cy="94" r="10" />
      <path
        d="M126 126C122 121 114 123 114 129C114 135 126 142 126 142C126 142 138 135 138 129C138 123 130 121 126 126Z"
        fill="#D52648"
        stroke="none"
      />
      {/* Resting paintbrush */}
      <path d="M40 164H180" />
    </svg>
  );
};
