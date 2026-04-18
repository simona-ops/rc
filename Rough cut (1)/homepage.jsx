// Rough Cut — Homepage layout

const NAV_ITEMS = ['REVIEWS', 'CRITIC\'S PICKS', 'RADAR', 'ABOUT', 'SUBMIT'];

const SiteHeader = ({ onNav, auth, onSignInClick, onProfileClick, accent = '#ff5a1f' }) => (
  <header style={{
    background: '#0a0a0a',
    borderBottom: `3px solid ${accent}`,
    position: 'sticky', top: 0, zIndex: 100,
  }}>
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      padding: '14px 32px', maxWidth: 1440, margin: '0 auto',
    }}>
      <a href="#home" onClick={(e) => { e.preventDefault(); onNav('home'); }} style={{ textDecoration: 'none' }}>
        <LogoInline color={accent} size={0.9} />
      </a>
      <nav style={{ display: 'flex', gap: 28, alignItems: 'center' }}>
        {NAV_ITEMS.map(n => (
          <a key={n} href="#" onClick={(e) => e.preventDefault()} style={{
            fontFamily: 'Archivo Black, sans-serif',
            fontSize: 13, color: '#f2ece1',
            textTransform: 'uppercase', letterSpacing: '0.1em',
            textDecoration: 'none',
          }}
          onMouseEnter={(e) => e.currentTarget.style.color = accent}
          onMouseLeave={(e) => e.currentTarget.style.color = '#f2ece1'}
          >
            {n}
          </a>
        ))}
        {auth ? (
          <ProfileButton auth={auth} onSignInClick={onSignInClick} onProfileClick={onProfileClick} accent={accent} />
        ) : (
          <button className="btn btn-solid" style={{ fontSize: 12 }}>SIGN IN ↗</button>
        )}
      </nav>
    </div>
  </header>
);

const HeroFeatured = ({ review, onRead, accent = '#ff5a1f' }) => (
  <section style={{ background: '#0a0a0a', padding: '48px 32px 32px', position: 'relative' }}>
    <div style={{ maxWidth: 1440, margin: '0 auto' }}>
      {/* Section header */}
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        marginBottom: 28, paddingBottom: 12,
        borderBottom: '1px dashed rgba(242,236,225,0.2)',
      }}>
        <span className="mono" style={{
          fontSize: 11, letterSpacing: '0.2em', color: accent,
          textTransform: 'uppercase',
        }}>
          FEATURED REVIEW
        </span>
        <span className="mono" style={{ fontSize: 11, color: '#6b6660', letterSpacing: '0.1em' }}>
          {review.date} · BY {review.author.toUpperCase()}
        </span>
      </div>

      {/* Hero layout */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1.1fr 1fr',
        gap: 40,
        alignItems: 'start',
      }}>
        {/* Left — image */}
        <div style={{ position: 'relative' }}>
          <RoughImage w="full" h={440} variant={0} label={`${review.title} · key art`} />
          {/* Verdict stamp */}
          <div style={{
            position: 'absolute', bottom: -20, right: -10, zIndex: 4,
          }}>
            <Verdict type={review.verdict} size="lg" rotate={-4} />
          </div>
        </div>

        {/* Right — text */}
        <div style={{ paddingTop: 20 }}>
          <div style={{ display: 'flex', gap: 6, marginBottom: 16, flexWrap: 'wrap' }}>
            {review.tags.map(t => (
              <span key={t} style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: 10, color: accent, letterSpacing: '0.15em',
                textTransform: 'uppercase',
                border: `1.5px solid ${accent}`, padding: '2px 8px',
              }}>
                {t}
              </span>
            ))}
          </div>
          <h1 className="display" style={{
            fontSize: 104, color: '#f2ece1', lineHeight: 0.85,
            marginBottom: 18,
            letterSpacing: '-0.02em',
          }}>
            {review.title}
          </h1>
          <p style={{
            fontFamily: 'Inter, sans-serif', fontSize: 22, color: '#f2ece1',
            lineHeight: 1.35, marginBottom: 20, fontWeight: 500,
            maxWidth: 520,
          }}>
            {review.hook}
          </p>
          <div style={{
            padding: '14px 0', marginBottom: 24,
            borderTop: '1px dashed rgba(242,236,225,0.3)',
            borderBottom: '1px dashed rgba(242,236,225,0.3)',
            display: 'flex', gap: 32, fontFamily: 'JetBrains Mono, monospace',
            fontSize: 11, color: '#c9bfa8', letterSpacing: '0.1em',
            textTransform: 'uppercase',
          }}>
            <div><span style={{ color: '#6b6660' }}>DEV /</span> {review.dev}</div>
            <div><span style={{ color: '#6b6660' }}>PLAT /</span> {review.platform}</div>
            <div><span style={{ color: '#6b6660' }}>TIME /</span> {review.hours}H</div>
          </div>
          <button
            className="btn btn-solid"
            onClick={() => onRead(review.slug)}
            style={{ fontSize: 15, padding: '14px 24px' }}
          >
            READ THE FULL REVIEW →
          </button>
        </div>
      </div>
    </div>
  </section>
);

const ReviewCard = ({ review, onRead, variant = 0, accent = '#ff5a1f' }) => {
  const isPaper = variant % 2 === 0;
  return (
    <article
      onClick={() => onRead(review.slug)}
      style={{
        background: isPaper ? '#f2ece1' : '#0a0a0a',
        color: isPaper ? '#0a0a0a' : '#f2ece1',
        padding: 20,
        border: `2px solid ${isPaper ? '#0a0a0a' : accent}`,
        position: 'relative',
        cursor: 'pointer',
        transition: 'transform 0.15s, box-shadow 0.15s',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translate(-3px, -3px)';
        e.currentTarget.style.boxShadow = `6px 6px 0 ${accent}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'none';
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <RoughImage w="full" h={180} variant={variant + 1} label={review.title} />
      <div style={{ marginTop: 14, display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 10 }}>
        <h3 className="slab" style={{
          fontSize: 22, lineHeight: 1.05, color: isPaper ? '#0a0a0a' : '#f2ece1',
          flex: 1, letterSpacing: '-0.01em',
        }}>
          {review.title}
        </h3>
        <Verdict type={review.verdict} size="sm" rotate={-3} />
      </div>
      <p style={{
        marginTop: 10, fontSize: 14, lineHeight: 1.4,
        color: isPaper ? '#403c37' : '#c9bfa8',
      }}>
        {review.hook}
      </p>
      <div style={{
        marginTop: 14, paddingTop: 10,
        borderTop: `1px dashed ${isPaper ? '#0a0a0a' : '#403c37'}`,
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
        letterSpacing: '0.12em', textTransform: 'uppercase',
        color: isPaper ? '#6b6660' : '#6b6660',
      }}>
        <span>{review.dev}</span>
        <span>{review.date}</span>
      </div>
    </article>
  );
};

const HomeGrid = ({ reviews, onRead, accent = '#ff5a1f' }) => (
  <section style={{ background: '#0a0a0a', padding: '60px 32px 40px' }}>
    <div style={{ maxWidth: 1440, margin: '0 auto' }}>
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        marginBottom: 32, paddingBottom: 12,
        borderBottom: `3px solid ${accent}`,
      }}>
        <h2 className="display" style={{
          fontSize: 72, color: '#f2ece1', letterSpacing: '-0.01em',
        }}>
          LATEST <span style={{ color: accent }}>CUTS</span>
        </h2>
        <a href="#" onClick={(e) => e.preventDefault()} className="mono" style={{
          color: accent, fontSize: 12, letterSpacing: '0.15em',
          textTransform: 'uppercase', textDecoration: 'none',
        }}>
          VIEW ARCHIVE →
        </a>
      </div>
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
        gap: 24,
      }}>
        {reviews.map((r, i) => (
          <ReviewCard key={r.slug} review={r} onRead={onRead} variant={i} accent={accent} />
        ))}
      </div>
    </div>
  </section>
);

// Side column — Critic's Picks vertical feed
const CriticsPicks = ({ reviews, onRead, accent = '#ff5a1f' }) => (
  <aside style={{
    background: '#f2ece1', color: '#0a0a0a',
    padding: '32px 28px',
    border: `3px solid #0a0a0a`,
    position: 'relative',
  }} className="paper">
    <div style={{ position: 'relative', zIndex: 2 }}>
      <div style={{
        display: 'inline-block',
        background: '#0a0a0a', color: accent,
        padding: '6px 14px',
        fontFamily: 'Archivo Black, sans-serif',
        fontSize: 18, letterSpacing: '0.05em',
        textTransform: 'uppercase',
        transform: 'rotate(-2deg)',
        marginBottom: 20,
      }}>
        ◆ CRITIC'S PICKS
      </div>
      <ol style={{ listStyle: 'none', padding: 0 }}>
        {reviews.slice(0, 5).map((r, i) => (
          <li key={r.slug} onClick={() => onRead(r.slug)} style={{
            display: 'flex', gap: 14, padding: '14px 0',
            borderBottom: i < 4 ? '1px dashed #0a0a0a' : 'none',
            cursor: 'pointer',
          }}>
            <div className="display" style={{
              fontSize: 42, color: accent, lineHeight: 0.8,
              textShadow: '2px 2px 0 #0a0a0a',
              flexShrink: 0,
              width: 44,
            }}>
              {String(i + 1).padStart(2, '0')}
            </div>
            <div>
              <h4 className="slab" style={{ fontSize: 17, lineHeight: 1.05, marginBottom: 4 }}>
                {r.title}
              </h4>
              <div className="mono" style={{ fontSize: 10, color: '#403c37', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                {r.dev} · {r.verdict}
              </div>
            </div>
          </li>
        ))}
      </ol>
    </div>
  </aside>
);

// Mid-page CTA — Newsletter
const Newsletter = ({ accent = '#ff5a1f' }) => (
  <section style={{ background: accent, padding: '48px 32px', position: 'relative', overflow: 'hidden' }}>
    {/* Halftone bg accent */}
    <div style={{
      position: 'absolute', inset: 0,
      background: 'radial-gradient(circle at 2px 2px, rgba(10,10,10,0.15) 1.5px, transparent 2px)',
      backgroundSize: '8px 8px',
      pointerEvents: 'none',
    }} />
    <div style={{
      maxWidth: 1100, margin: '0 auto', position: 'relative',
      display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 40, alignItems: 'center',
    }}>
      <div>
        <div style={{
          display: 'inline-block',
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: 12, letterSpacing: '0.2em',
          textTransform: 'uppercase', background: '#0a0a0a', color: accent,
          padding: '4px 10px', marginBottom: 16,
        }}>
          ROUGH CUT // DISPATCH
        </div>
        <h2 className="display" style={{
          fontSize: 56, color: '#0a0a0a', lineHeight: 1, letterSpacing: '-0.01em',
        }}>
          <div>ONE EMAIL.</div>
          <div style={{ marginTop: 10 }}>
            <span style={{
              display: 'inline-block',
              background: '#0a0a0a', color: accent,
              padding: '4px 12px',
            }}>EVERY</span>{' '}
            <span style={{
              display: 'inline-block',
              background: '#0a0a0a', color: accent,
              padding: '4px 12px',
              marginTop: 6,
            }}>FRIDAY.</span>
          </div>
        </h2>
        <p style={{
          marginTop: 24, fontSize: 17, color: '#0a0a0a', maxWidth: 440,
          fontWeight: 500, lineHeight: 1.6,
        }}>
          Five indie releases you missed this week. One hot take. Zero press releases.
          No <span className="scratch">game of the year</span>{' '}
          <span style={{ fontStyle: 'italic' }}>hidden gem</span> nonsense. Promise.
        </p>
      </div>
      <div style={{
        background: '#0a0a0a', padding: 28,
        border: '3px solid #0a0a0a',
        boxShadow: '8px 8px 0 rgba(10,10,10,0.3)',
        transform: 'rotate(1deg)',
      }}>
        <label className="mono" style={{
          display: 'block', fontSize: 11, color: accent, letterSpacing: '0.2em',
          textTransform: 'uppercase', marginBottom: 8,
        }}>
          &gt; EMAIL_ADDRESS:
        </label>
        <input
          type="email"
          placeholder="you@somewhere.net"
          style={{
            width: '100%', padding: '14px 16px',
            background: '#1a1715', color: '#f2ece1',
            border: `2px solid ${accent}`,
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: 16,
          }}
        />
        <button className="btn btn-solid" style={{
          marginTop: 14, width: '100%', justifyContent: 'center',
          fontSize: 14, padding: '14px',
        }}>
          SIGN ME UP ↗
        </button>
        <div style={{
          marginTop: 12, fontFamily: 'JetBrains Mono, monospace',
          fontSize: 10, color: '#6b6660', letterSpacing: '0.1em',
          textTransform: 'uppercase', textAlign: 'center',
        }}>
          UNSUBSCRIBE WHENEVER · WE'RE NOT HURT
        </div>
      </div>
    </div>
  </section>
);

// Manifesto / about strip
const Manifesto = ({ accent = '#ff5a1f' }) => (
  <section className="paper" style={{
    padding: '72px 32px', position: 'relative',
  }}>
    <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 2, textAlign: 'center' }}>
      <div className="mono" style={{
        fontSize: 11, color: accent, letterSpacing: '0.25em',
        textTransform: 'uppercase', marginBottom: 16,
      }}>
        // THE MANIFESTO
      </div>
      <p style={{ fontSize: 22, lineHeight: 1.5, color: '#1a1715', marginBottom: 20 }}>
        We review <strong>indie games</strong>. No scores. No embargoes.
        No <span className="scratch">sponsored content</span>. Just critics who play the thing,
        write the thing, and move on.
      </p>
      <p style={{
        color: accent, fontFamily: 'Archivo Black, sans-serif', fontSize: 24,
        textTransform: 'uppercase', letterSpacing: '0.02em',
      }}>
        Rough cuts only. Polish is a lie.
      </p>
    </div>
  </section>
);

const SiteFooter = ({ accent = '#ff5a1f' }) => (
  <footer style={{ background: '#0a0a0a', borderTop: `3px solid ${accent}`, padding: '40px 32px 24px' }}>
    <div style={{ maxWidth: 1440, margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: 40 }}>
        <div>
          <LogoInline color={accent} size={0.85} />
          <p style={{ marginTop: 14, fontSize: 13, color: '#6b6660', lineHeight: 1.5, maxWidth: 320 }}>
            An independent indie-game criticism zine. Published whenever we finish something worth talking about.
          </p>
        </div>
        {[
          { title: 'SECTIONS', items: ['Latest', 'Critic\'s Picks', 'Radar', 'Archive'] },
          { title: 'ABOUT', items: ['Masthead', 'Ethics', 'Submit a Game', 'Contact'] },
          { title: 'ELSEWHERE', items: ['RSS Feed', 'Mastodon', 'Bluesky', 'Newsletter'] },
        ].map(col => (
          <div key={col.title}>
            <div className="mono" style={{
              fontSize: 11, color: accent, letterSpacing: '0.2em',
              textTransform: 'uppercase', marginBottom: 12,
            }}>
              {col.title}
            </div>
            {col.items.map(it => (
              <a key={it} href="#" onClick={(e) => e.preventDefault()} style={{
                display: 'block', padding: '4px 0',
                color: '#f2ece1', fontSize: 14, textDecoration: 'none',
              }}
              onMouseEnter={(e) => e.currentTarget.style.color = accent}
              onMouseLeave={(e) => e.currentTarget.style.color = '#f2ece1'}
              >
                {it}
              </a>
            ))}
          </div>
        ))}
      </div>
      <div style={{
        marginTop: 40, paddingTop: 20,
        borderTop: '1px dashed #403c37',
        display: 'flex', justifyContent: 'space-between',
        fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
        color: '#6b6660', letterSpacing: '0.15em', textTransform: 'uppercase',
      }}>
        <span>© 2026 ROUGH CUT ZINE · NO RIGHTS RESERVED</span>
        <span>PRINTED IN SOMEONE'S SPARE BEDROOM</span>
        <span>PAGE 01 / ∞</span>
      </div>
    </div>
  </footer>
);

const HomePage = ({ onRead, auth, onSignInClick, onProfileClick, accent = '#ff5a1f' }) => {
  const featured = REVIEWS[0];
  const rest = REVIEWS.slice(1);
  return (
    <div data-screen-label="Homepage">
      <SiteHeader onNav={() => {}} auth={auth} onSignInClick={onSignInClick} onProfileClick={onProfileClick} accent={accent} />
      <Marquee
        items={REVIEWS.map(r => `${r.title} — ${r.verdict}`)}
        speed={50}
      />
      <HeroFeatured review={featured} onRead={onRead} accent={accent} />

      {/* Two-col — latest + picks */}
      <section style={{ background: '#0a0a0a', padding: '40px 32px 20px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 40 }}>
          <div>
            <div style={{
              display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
              marginBottom: 24, paddingBottom: 12,
              borderBottom: `3px solid ${accent}`,
            }}>
              <h2 className="display" style={{
                fontSize: 56, color: '#f2ece1', letterSpacing: '-0.01em',
              }}>
                LATEST <span style={{ color: accent }}>CUTS</span>
              </h2>
              <span className="mono" style={{ color: '#6b6660', fontSize: 11, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
                THIS MONTH
              </span>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 24,
            }}>
              {rest.slice(0, 4).map((r, i) => (
                <ReviewCard key={r.slug} review={r} onRead={onRead} variant={i} accent={accent} />
              ))}
            </div>
          </div>
          <CriticsPicks reviews={REVIEWS} onRead={onRead} accent={accent} />
        </div>
      </section>

      <Newsletter accent={accent} />

      {/* Radar — upcoming */}
      <section style={{ background: '#0a0a0a', padding: '60px 32px' }}>
        <div style={{ maxWidth: 1440, margin: '0 auto' }}>
          <div style={{
            marginBottom: 32, paddingBottom: 12,
            borderBottom: `3px solid ${accent}`,
            display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          }}>
            <h2 className="display" style={{
              fontSize: 56, color: '#f2ece1',
            }}>
              ON THE <span style={{ color: accent }}>RADAR</span>
            </h2>
            <span className="mono" style={{ color: accent, fontSize: 12, letterSpacing: '0.15em', textTransform: 'uppercase' }}>
              ↗ THREE WEEKS OUT
            </span>
          </div>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 24,
          }}>
            {rest.slice(4, 7).map((r, i) => (
              <ReviewCard key={r.slug} review={r} onRead={onRead} variant={i + 4} accent={accent} />
            ))}
          </div>
        </div>
      </section>

      <Manifesto accent={accent} />
      <SiteFooter accent={accent} />
    </div>
  );
};

Object.assign(window, { HomePage, SiteHeader, SiteFooter, Marquee });
