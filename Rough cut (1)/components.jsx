// Rough Cut — shared building blocks

// Rough placeholder image (gritty, not bad)
const RoughImage = ({ label = 'screenshot', w = 400, h = 260, variant = 0, style = {} }) => {
  const patterns = [
    // scanline variant
    { bg: '#1a1715', stripe: 'rgba(255,90,31,0.12)' },
    { bg: '#2a2420', stripe: 'rgba(242,236,225,0.08)' },
    { bg: '#0a0a0a', stripe: 'rgba(255,90,31,0.2)' },
    { bg: '#1f1a16', stripe: 'rgba(242,236,225,0.05)' },
  ];
  const p = patterns[variant % patterns.length];
  return (
    <div style={{
      width: w === 'full' ? '100%' : w,
      height: h,
      background: `
        repeating-linear-gradient(135deg, transparent 0 18px, ${p.stripe} 18px 19px),
        ${p.bg}
      `,
      border: '2px solid #0a0a0a',
      position: 'relative',
      overflow: 'hidden',
      ...style,
    }}>
      {/* Xerox noise */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(0,0,0,0.5) 0.5px, transparent 0)',
        backgroundSize: '4px 4px',
        opacity: 0.4,
        mixBlendMode: 'multiply',
      }} />
      {/* Corner registration */}
      <div style={{
        position: 'absolute', top: 8, left: 8,
        width: 12, height: 12, border: '1px solid rgba(255,90,31,0.6)',
        borderRadius: '50%',
      }} />
      <div style={{
        position: 'absolute', top: 8, right: 8,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 9,
        color: 'rgba(242,236,225,0.5)', letterSpacing: '0.15em',
      }}>
        IMG_{String(variant).padStart(3, '0')}
      </div>
      {/* Label */}
      <div style={{
        position: 'absolute', bottom: 10, left: 10,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
        color: '#ff5a1f', letterSpacing: '0.1em',
        background: 'rgba(10,10,10,0.7)', padding: '3px 6px',
        textTransform: 'uppercase',
      }}>
        [ {label} ]
      </div>
    </div>
  );
};

// Verdict chip (no scores — just verdicts)
const VERDICTS = {
  'HIDDEN GEM': { bg: '#ff5a1f', fg: '#0a0a0a', stamp: '◆ HIDDEN GEM' },
  'BANGER': { bg: '#ff5a1f', fg: '#0a0a0a', stamp: '★ BANGER' },
  'ROUGH': { bg: '#0a0a0a', fg: '#ff5a1f', stamp: '▲ ROUGH' },
  'SKIP IT': { bg: '#0a0a0a', fg: '#f2ece1', stamp: '✕ SKIP IT' },
  'WAIT & SEE': { bg: '#f2ece1', fg: '#0a0a0a', stamp: '? WAIT & SEE' },
  'CULT CLASSIC': { bg: '#ff5a1f', fg: '#0a0a0a', stamp: '☗ CULT CLASSIC' },
};

const Verdict = ({ type = 'HIDDEN GEM', size = 'md', rotate = -4 }) => {
  const v = VERDICTS[type] || VERDICTS['HIDDEN GEM'];
  const sizes = {
    sm: { pad: '3px 8px', font: 11, border: 2 },
    md: { pad: '5px 12px', font: 13, border: 3 },
    lg: { pad: '10px 18px', font: 20, border: 4 },
    xl: { pad: '14px 24px', font: 28, border: 5 },
  };
  const s = sizes[size];
  return (
    <div style={{
      display: 'inline-block',
      padding: s.pad,
      background: v.bg,
      color: v.fg,
      border: `${s.border}px solid ${v.fg}`,
      fontFamily: 'Archivo Black, sans-serif',
      fontSize: s.font,
      textTransform: 'uppercase',
      letterSpacing: '0.05em',
      transform: `rotate(${rotate}deg)`,
      boxShadow: `3px 3px 0 ${v.fg}`,
      whiteSpace: 'nowrap',
    }}>
      {v.stamp}
    </div>
  );
};

// Small tag
const Tag = ({ children, invert = false }) => (
  <span style={{
    display: 'inline-block',
    padding: '2px 7px',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: 10,
    textTransform: 'uppercase',
    letterSpacing: '0.1em',
    border: `1.5px solid ${invert ? '#f2ece1' : '#0a0a0a'}`,
    background: invert ? 'transparent' : 'transparent',
    color: invert ? '#f2ece1' : '#0a0a0a',
  }}>
    #{children}
  </span>
);

// Marquee bar
const Marquee = ({ items, speed = 40 }) => {
  const content = [...items, ...items, ...items];
  return (
    <div style={{
      overflow: 'hidden', background: '#ff5a1f', color: '#0a0a0a',
      borderTop: '3px solid #0a0a0a', borderBottom: '3px solid #0a0a0a',
      padding: '10px 0',
    }}>
      <div className="marquee-track" style={{ animationDuration: `${speed}s` }}>
        {content.map((it, i) => (
          <span key={i} style={{
            fontFamily: 'Archivo Black, sans-serif',
            fontSize: 18, letterSpacing: '0.05em',
            textTransform: 'uppercase', margin: '0 24px',
          }}>
            {it} <span style={{ color: '#0a0a0a', opacity: 0.6 }}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { RoughImage, Verdict, VERDICTS, Tag, Marquee });
