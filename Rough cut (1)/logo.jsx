// Rough Cut — Logo variations
// Concept: the "cut" — a clean diagonal slash through heavy type.
// Less busy, more confident. Letterforms do the heavy lifting.

// The mark: a bold diagonal bar — evokes a cut, an edge, a controlled swipe.
// Works at any size, reproduces cleanly, doesn't compete with the wordmark.
const CutMark = ({ size = 48, color = '#ff5a1f', ink = '#0a0a0a' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" style={{ display: 'block' }}>
    <rect x="0" y="0" width="64" height="64" fill={ink} />
    {/* Diagonal cut — offset, heavy */}
    <polygon points="8,48 40,8 56,8 24,48" fill={color} />
    {/* Small notch — the "rough" part */}
    <polygon points="40,8 48,8 44,14" fill={ink} />
    <polygon points="16,48 24,48 20,42" fill={ink} />
  </svg>
);

// LOGO 1 — Primary wordmark. Clean, confident, no drop shadows.
const LogoPrimary = ({ color = '#ff5a1f', ink = '#f2ece1', size = 1 }) => (
  <div style={{ display: 'inline-flex', alignItems: 'baseline', gap: 0, lineHeight: 0.85 }}>
    <div className="display" style={{
      fontSize: 64 * size, color: ink, letterSpacing: '-0.02em',
    }}>
      ROUGH
    </div>
    <div style={{
      display: 'inline-block',
      width: 4 * size, height: 56 * size,
      background: color,
      margin: `0 ${8 * size}px`,
      transform: 'skewX(-18deg)',
      alignSelf: 'center',
    }} />
    <div className="display" style={{
      fontSize: 64 * size, color, letterSpacing: '-0.02em',
    }}>
      CUT
    </div>
  </div>
);

// LOGO 2 — Stacked. Big block, one sharp accent line.
const LogoStacked = ({ color = '#ff5a1f', ink = '#0a0a0a', size = 1 }) => (
  <div style={{ display: 'inline-block', position: 'relative' }}>
    <div className="display" style={{
      fontSize: 80 * size, color: ink, lineHeight: 0.82, letterSpacing: '-0.025em',
    }}>
      ROUGH
    </div>
    <div style={{
      height: 5 * size, background: color,
      margin: `${6 * size}px 0`,
      width: '100%',
    }} />
    <div className="display" style={{
      fontSize: 80 * size, color, lineHeight: 0.82, letterSpacing: '-0.025em',
      textAlign: 'right',
    }}>
      CUT
    </div>
  </div>
);

// LOGO 3 — Inline nav. Compact, single color block trick.
const LogoInline = ({ color = '#ff5a1f', ink = '#f2ece1', size = 1 }) => (
  <div className="display" style={{
    display: 'inline-flex', alignItems: 'center',
    fontSize: 26 * size, letterSpacing: '-0.01em', lineHeight: 1,
  }}>
    <span style={{ color: ink }}>ROUGH</span>
    <span style={{
      display: 'inline-block',
      width: 2 * size, height: 20 * size,
      background: color,
      margin: `0 ${8 * size}px`,
      transform: 'skewX(-20deg)',
    }} />
    <span style={{ color }}>CUT</span>
  </div>
);

// LOGO 4 — Monogram. Single letter with the cut.
const LogoMark = ({ color = '#ff5a1f', ink = '#0a0a0a', size = 80 }) => (
  <div style={{
    width: size, height: size, position: 'relative',
    background: ink, display: 'flex', alignItems: 'center', justifyContent: 'center',
    overflow: 'hidden',
  }}>
    <div className="display" style={{
      fontSize: size * 0.7, color, lineHeight: 0.8, letterSpacing: '-0.04em',
    }}>
      RC
    </div>
    {/* Diagonal cut overlay */}
    <div style={{
      position: 'absolute',
      top: 0, bottom: 0,
      left: '50%',
      width: size * 0.05,
      background: color,
      transform: 'translateX(-50%) rotate(18deg)',
      transformOrigin: 'center',
    }} />
  </div>
);

// Keep Gem export as alias so logoshowcase doesn't break
const Gem = CutMark;

Object.assign(window, { CutMark, Gem, LogoPrimary, LogoStacked, LogoInline, LogoMark });
