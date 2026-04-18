// Rough Cut — Review detail page

const ReviewPage = ({ review, onBack, onRead, auth, onSignInClick, onProfileClick, accent = '#ff5a1f' }) => {
  if (!review) return null;
  return (
    <div data-screen-label={`Review: ${review.title}`}>
      <SiteHeader onNav={onBack} auth={auth} onSignInClick={onSignInClick} onProfileClick={onProfileClick} accent={accent} />

      {/* Back strip */}
      <div style={{
        background: '#0a0a0a', padding: '16px 32px',
        borderBottom: '1px dashed #403c37',
      }}>
        <div style={{ maxWidth: 1100, margin: '0 auto', display: 'flex', justifyContent: 'space-between' }}>
          <a onClick={onBack} href="#" style={{
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            color: accent, letterSpacing: '0.15em', textTransform: 'uppercase',
            textDecoration: 'none',
          }}>
            ← BACK TO ALL CUTS
          </a>
          <span className="mono" style={{ fontSize: 11, color: '#6b6660', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
            REVIEWS / {review.slug}
          </span>
        </div>
      </div>

      {/* Article */}
      <article className="paper" style={{ padding: '64px 32px', position: 'relative' }}>
        <div style={{ maxWidth: 860, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          {/* Kicker */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 20, flexWrap: 'wrap' }}>
            {review.tags.map(t => <Tag key={t}>{t}</Tag>)}
            <span className="mono" style={{
              fontSize: 11, color: '#403c37', letterSpacing: '0.15em',
              textTransform: 'uppercase', marginLeft: 'auto',
            }}>
              {review.date} · BY {review.author.toUpperCase()}
            </span>
          </div>

          {/* Title */}
          <h1 className="display" style={{
            fontSize: 140, color: '#0a0a0a', lineHeight: 0.82,
            letterSpacing: '-0.02em', marginBottom: 16,
          }}>
            {review.title.split(' ').map((w, i) => (
              <span key={i} style={{
                display: 'inline-block', marginRight: 12,
                color: i % 2 === 0 ? '#0a0a0a' : accent,
                textShadow: i % 2 === 0 ? `5px 5px 0 ${accent}` : 'none',
              }}>{w}</span>
            ))}
          </h1>

          {/* Hook */}
          <p style={{
            fontSize: 28, lineHeight: 1.3, color: '#1a1715',
            marginBottom: 32, fontWeight: 500, fontStyle: 'italic',
            maxWidth: 720,
          }}>
            {review.hook}
          </p>

          {/* Meta strip */}
          <div style={{
            display: 'flex', flexWrap: 'wrap', gap: 28,
            padding: '14px 0', marginBottom: 40,
            borderTop: '2px solid #0a0a0a',
            borderBottom: '2px solid #0a0a0a',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
            color: '#1a1715', letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            <div><span style={{ color: '#6b6660' }}>DEV /</span> {review.dev}</div>
            <div><span style={{ color: '#6b6660' }}>PLATFORM /</span> {review.platform}</div>
            <div><span style={{ color: '#6b6660' }}>TIME PLAYED /</span> {review.hours} HOURS</div>
            <div style={{ marginLeft: 'auto' }}>
              <Verdict type={review.verdict} size="sm" rotate={-3} />
            </div>
          </div>

          {/* Hero image */}
          <div style={{ position: 'relative', marginBottom: 40 }}>
            <div style={{
              position: 'absolute', top: -12, left: 60, width: 90, height: 22,
              background: 'rgba(255, 230, 120, 0.55)', transform: 'rotate(-3deg)', zIndex: 3,
            }} />
            <RoughImage w="full" h={420} variant={0} label={`${review.title} · hero`} />
          </div>

          {/* Lede */}
          <p style={{
            fontSize: 22, lineHeight: 1.5, color: '#0a0a0a',
            marginBottom: 28, fontWeight: 500,
          }}>
            <span style={{
              float: 'left', fontFamily: 'Anton, sans-serif',
              fontSize: 96, lineHeight: 0.85, color: accent,
              marginRight: 10, marginTop: 4, textShadow: '3px 3px 0 #0a0a0a',
            }}>
              {review.lede[0]}
            </span>
            {review.lede.slice(1)}
          </p>

          {/* Body paragraphs */}
          {(review.body || [
            'The full review continues here with paragraphs about mechanics, narrative, and general vibes. Each paragraph should feel like part of a conversation — opinionated, specific, unafraid to make a call.',
            'This is a placeholder for the rest of the body copy. In the live blog, critics would go on about the game\'s systems, the art direction, the music, and the weird little moments that made them love or hate it.',
          ]).map((p, i) => {
            // Pullquote after paragraph 1
            if (i === 1 && review.pullquote) {
              return (
                <React.Fragment key={i}>
                  <p style={{
                    fontSize: 17, lineHeight: 1.7, color: '#1a1715', marginBottom: 20,
                  }}>{p}</p>
                  <blockquote style={{
                    margin: '32px -40px',
                    padding: '32px 40px',
                    background: '#0a0a0a', color: accent,
                    borderLeft: `6px solid ${accent}`,
                    position: 'relative',
                  }}>
                    <div style={{
                      position: 'absolute', top: -12, left: 40,
                      fontFamily: 'Anton, sans-serif', fontSize: 80, color: accent,
                      lineHeight: 0.7,
                    }}>"</div>
                    <p className="display" style={{
                      fontSize: 38, lineHeight: 1, color: accent,
                      textTransform: 'none', letterSpacing: '-0.01em',
                    }}>
                      {review.pullquote}
                    </p>
                  </blockquote>
                </React.Fragment>
              );
            }
            return (
              <p key={i} style={{
                fontSize: 17, lineHeight: 1.7, color: '#1a1715', marginBottom: 20,
              }}>{p}</p>
            );
          })}

          {/* Mid-article screenshot row */}
          <div style={{
            display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12,
            margin: '32px 0', transform: 'rotate(-0.5deg)',
          }}>
            <RoughImage h={240} variant={2} label="combat encounter" />
            <RoughImage h={240} variant={3} label="inventory" />
          </div>

          {/* Verdict block */}
          {review.pros && (
            <div style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 2,
              margin: '48px 0',
              border: '3px solid #0a0a0a',
            }}>
              <div style={{ background: accent, color: '#0a0a0a', padding: 24 }}>
                <h3 className="slab" style={{ fontSize: 20, marginBottom: 14, borderBottom: '2px solid #0a0a0a', paddingBottom: 6 }}>
                  ◆ THE GOOD
                </h3>
                {review.pros.map((p, i) => (
                  <div key={i} style={{
                    padding: '8px 0', fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
                    borderBottom: i < review.pros.length - 1 ? '1px dashed rgba(10,10,10,0.3)' : 'none',
                  }}>
                    <span style={{ fontWeight: 700, marginRight: 6 }}>+</span>{p}
                  </div>
                ))}
              </div>
              <div style={{ background: '#0a0a0a', color: accent, padding: 24, borderLeft: '2px solid #0a0a0a' }}>
                <h3 className="slab" style={{ fontSize: 20, marginBottom: 14, borderBottom: `2px solid ${accent}`, paddingBottom: 6 }}>
                  ✕ THE ROUGH
                </h3>
                {review.cons.map((p, i) => (
                  <div key={i} style={{
                    padding: '8px 0', fontFamily: 'JetBrains Mono, monospace', fontSize: 13, color: '#f2ece1',
                    borderBottom: i < review.cons.length - 1 ? '1px dashed rgba(255,90,31,0.3)' : 'none',
                  }}>
                    <span style={{ fontWeight: 700, marginRight: 6, color: accent }}>−</span>{p}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Final verdict stamp */}
          <div style={{
            background: '#0a0a0a', color: '#f2ece1', padding: '36px 32px',
            margin: '48px 0', position: 'relative',
            border: `3px solid ${accent}`,
          }}>
            <div className="mono" style={{
              fontSize: 11, color: accent, letterSpacing: '0.25em',
              textTransform: 'uppercase', marginBottom: 12,
            }}>
              // FINAL VERDICT
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexWrap: 'wrap' }}>
              <Verdict type={review.verdict} size="xl" rotate={-4} />
              <p style={{ fontSize: 20, lineHeight: 1.4, flex: 1, minWidth: 280 }}>
                We don't do scores. {review.verdict === 'HIDDEN GEM' ? 'This one gets the stamp, the newsletter feature, and our sincere recommendation.' :
                review.verdict === 'BANGER' ? 'Buy it. Play it. Tell your friends. We\'ll be over here trying to find its flaws.' :
                review.verdict === 'ROUGH' ? 'Good bones, bad execution. Maybe wait for a patch. Maybe wait for a sequel.' :
                review.verdict === 'SKIP IT' ? 'Life is short. Indie games are infinite. Your time is better spent elsewhere.' :
                review.verdict === 'CULT CLASSIC' ? 'Not for everyone. Absolutely for someone. You\'ll know in the first hour.' :
                'Promising but not there yet. Wishlist it, check back in six months.'}
              </p>
            </div>
          </div>

          {/* Author bio */}
          <div style={{
            display: 'flex', gap: 20, padding: '20px 0',
            borderTop: '1px dashed #0a0a0a', borderBottom: '1px dashed #0a0a0a',
            margin: '32px 0',
          }}>
            <div style={{
              width: 60, height: 60, flexShrink: 0,
              background: `repeating-linear-gradient(45deg, ${accent} 0 4px, #0a0a0a 4px 8px)`,
              border: '2px solid #0a0a0a',
            }} />
            <div>
              <div className="slab" style={{ fontSize: 16, marginBottom: 4 }}>{review.author.toUpperCase()}</div>
              <p style={{ fontSize: 13, color: '#403c37', lineHeight: 1.4 }}>
                Contributing critic. Writes about small games and large opinions. Currently avoiding anyone's
                "game of the year" list.
              </p>
            </div>
          </div>
        </div>
      </article>

      {/* Related */}
      <section style={{ background: '#0a0a0a', padding: '60px 32px' }}>
        <div style={{ maxWidth: 1100, margin: '0 auto' }}>
          <h2 className="display" style={{
            fontSize: 48, color: '#f2ece1', marginBottom: 24,
            borderBottom: `3px solid ${accent}`, paddingBottom: 10,
          }}>
            KEEP <span style={{ color: accent }}>DIGGING</span>
          </h2>
          <div style={{
            display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 24,
          }}>
            {REVIEWS.filter(r => r.slug !== review.slug).slice(0, 3).map((r, i) => (
              <ReviewCard key={r.slug} review={r} onRead={onRead} variant={i + 2} accent={accent} />
            ))}
          </div>
        </div>
      </section>

      <Comments slug={review.slug} auth={auth} onSignInClick={onSignInClick} accent={accent} />

      <SiteFooter accent={accent} />
    </div>
  );
};

Object.assign(window, { ReviewPage });
