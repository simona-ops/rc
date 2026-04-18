// Rough Cut — Logo exploration page (showcases 4 variants)

const LogoShowcase = ({ accent = '#ff5a1f', onClose }) => (
  <div data-screen-label="Logo Showcase" style={{ background: '#0a0a0a', minHeight: '100vh' }}>
    <SiteHeader onNav={() => {}} accent={accent} />

    <section style={{ padding: '48px 32px' }}>
      <div style={{ maxWidth: 1440, margin: '0 auto' }}>
        <div style={{
          marginBottom: 32, paddingBottom: 12,
          borderBottom: `3px solid ${accent}`,
        }}>
          <div className="mono" style={{
            fontSize: 11, color: accent, letterSpacing: '0.25em',
            textTransform: 'uppercase', marginBottom: 8,
          }}>
            // IDENTITY SYSTEM / FOUR VARIATIONS
          </div>
          <h1 className="display" style={{
            fontSize: 96, color: '#f2ece1', lineHeight: 0.85, letterSpacing: '-0.01em',
          }}>
            THE <span style={{ color: accent }}>MARK</span>
          </h1>
          <p style={{ marginTop: 16, fontSize: 16, color: '#c9bfa8', maxWidth: 680, lineHeight: 1.5 }}>
            A rough-cut gemstone — asymmetric, unpolished, bearing its own cut marks.
            Paired with condensed display type and a quiet monospace tagline. Four variations
            for different contexts: masthead, zine cover, nav, avatar.
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 32,
        }}>
          {/* 01 — Primary */}
          <div style={{
            background: '#1a1715', padding: '60px 40px',
            border: `2px solid ${accent}`, position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: 16, left: 16,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              color: accent, letterSpacing: '0.2em',
            }}>
              01 / PRIMARY WORDMARK
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 220 }}>
              <LogoPrimary color={accent} ink="#f2ece1" size={1.2} />
            </div>
            <div style={{
              position: 'absolute', bottom: 16, left: 16, right: 16,
              display: 'flex', justifyContent: 'space-between',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              color: '#6b6660', letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>
              <span>USE: MASTHEAD, HOMEPAGE HERO</span>
              <span>MIN: 200PX WIDE</span>
            </div>
          </div>

          {/* 02 — Stacked zine cover */}
          <div className="paper" style={{
            padding: '60px 40px', minHeight: 320, position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: 16, left: 16, zIndex: 2,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              color: '#0a0a0a', letterSpacing: '0.2em',
            }}>
              02 / STACKED ZINE COVER
            </div>
            <div style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              minHeight: 220, position: 'relative', zIndex: 2,
            }}>
              <LogoStacked color={accent} ink="#0a0a0a" size={1} />
            </div>
            <div style={{
              position: 'absolute', bottom: 16, left: 16, right: 16, zIndex: 2,
              display: 'flex', justifyContent: 'space-between',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              color: '#6b6660', letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>
              <span>USE: PRINT ZINE, POSTERS, STICKERS</span>
              <span>SQUARE FORMAT</span>
            </div>
          </div>

          {/* 03 — Inline */}
          <div style={{
            background: '#0a0a0a', padding: '60px 40px',
            border: `2px solid #f2ece1`, position: 'relative',
          }}>
            <div style={{
              position: 'absolute', top: 16, left: 16,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              color: accent, letterSpacing: '0.2em',
            }}>
              03 / INLINE · NAV LOCKUP
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 220 }}>
              <LogoInline color={accent} ink="#0a0a0a" size={1.4} />
            </div>
            <div style={{
              position: 'absolute', bottom: 16, left: 16, right: 16,
              display: 'flex', justifyContent: 'space-between',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              color: '#6b6660', letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>
              <span>USE: SITE HEADER, EMAIL FOOTER</span>
              <span>MIN: 120PX WIDE</span>
            </div>
          </div>

          {/* 04 — Monogram */}
          <div style={{
            background: accent, padding: '60px 40px', position: 'relative',
            color: '#0a0a0a',
          }}>
            <div style={{
              position: 'absolute', top: 16, left: 16,
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              color: '#0a0a0a', letterSpacing: '0.2em',
            }}>
              04 / MONOGRAM · AVATAR MARK
            </div>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 220, gap: 24 }}>
              <LogoMark color="#f2ece1" ink="#0a0a0a" size={120} />
              <LogoMark color="#ff5a1f" ink="#0a0a0a" size={80} />
              <LogoMark color="#0a0a0a" ink="#f2ece1" size={56} />
            </div>
            <div style={{
              position: 'absolute', bottom: 16, left: 16, right: 16,
              display: 'flex', justifyContent: 'space-between',
              fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
              color: '#0a0a0a', letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>
              <span>USE: AVATARS, FAVICON, STAMPS</span>
              <span>SCALES 16 – ∞ PX</span>
            </div>
          </div>
        </div>

        {/* Gem mark close-up */}
        <div style={{
          marginTop: 40, padding: '48px 32px',
          background: '#f2ece1', color: '#0a0a0a', position: 'relative',
        }} className="paper">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center', position: 'relative', zIndex: 2 }}>
            <div>
              <div className="mono" style={{
                fontSize: 11, color: '#403c37', letterSpacing: '0.25em',
                textTransform: 'uppercase', marginBottom: 8,
              }}>
                // THE GEM
              </div>
              <h2 className="display" style={{ fontSize: 56, lineHeight: 0.85, marginBottom: 16 }}>
                UNCUT.<br/>UNPOLISHED.<br/><span style={{ background: accent, padding: '0 6px' }}>UNBRANDED.</span>
              </h2>
              <p style={{ fontSize: 16, lineHeight: 1.5, maxWidth: 400 }}>
                The mark is a rough gem: asymmetric facets, no perfect symmetry, drawn with
                visible cut lines. It rejects the smooth vector polish of most indie brands.
                That's the whole point — we're looking for the hidden gems, so our logo is one.
              </p>
            </div>
            <div style={{ display: 'flex', gap: 32, alignItems: 'center', justifyContent: 'center' }}>
              <Gem size={140} color={accent} stroke="#0a0a0a" />
              <Gem size={80} color="#0a0a0a" stroke="#0a0a0a" />
              <Gem size={48} color={accent} stroke="#0a0a0a" />
            </div>
          </div>
        </div>
      </div>
    </section>

    <SiteFooter accent={accent} />
  </div>
);

Object.assign(window, { LogoShowcase });
