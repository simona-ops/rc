// Rough Cut — Profile page

const ProfilePage = ({ auth, onBack, accent = '#ff5a1f' }) => {
  const { user, signOut } = auth;

  if (!user) {
    return (
      <div data-screen-label="Profile (signed out)" style={{ minHeight: '100vh', background: '#0a0a0a' }}>
        <div style={{
          maxWidth: 600, margin: '0 auto', padding: '120px 32px', textAlign: 'center',
        }}>
          <h1 className="display" style={{ fontSize: 72, color: '#f2ece1', marginBottom: 20 }}>
            NOT <span style={{ color: accent }}>SIGNED IN</span>
          </h1>
          <p style={{ color: '#c9bfa8', fontSize: 16, marginBottom: 24 }}>
            Sign in or create an account to see your profile.
          </p>
          <button onClick={onBack} className="btn btn-solid">← BACK</button>
        </div>
      </div>
    );
  }

  const joined = new Date(user.joined).toLocaleDateString('en-US', {
    month: 'long', day: 'numeric', year: 'numeric',
  });

  // Count user's comments across all reviews
  let commentCount = 0;
  let likesGiven = 0;
  try {
    const all = JSON.parse(localStorage.getItem('roughcut.comments') || '{}');
    for (const slug in all) {
      commentCount += all[slug].filter(c => c.username === user.username).length;
    }
    likesGiven = (JSON.parse(localStorage.getItem('roughcut.likes') || '[]')).length;
  } catch {}

  return (
    <div data-screen-label={`Profile: ${user.username}`}>
      <section style={{
        background: '#0a0a0a', padding: '60px 32px',
        borderBottom: `3px solid ${accent}`,
      }}>
        <div style={{ maxWidth: 900, margin: '0 auto' }}>
          <button onClick={onBack} style={{
            background: 'transparent', border: 'none', color: accent, cursor: 'pointer',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
            letterSpacing: '0.15em', textTransform: 'uppercase', marginBottom: 24, padding: 0,
          }}>
            ← BACK
          </button>

          <div style={{ display: 'flex', gap: 32, alignItems: 'flex-start', flexWrap: 'wrap' }}>
            <Avatar username={user.username} size={140} />
            <div style={{ flex: 1, minWidth: 280 }}>
              <div className="mono" style={{
                fontSize: 11, color: accent, letterSpacing: '0.25em',
                textTransform: 'uppercase', marginBottom: 8,
              }}>
                // CONTRIBUTOR
              </div>
              <h1 className="display" style={{
                fontSize: 88, color: '#f2ece1', lineHeight: 0.85,
                letterSpacing: '-0.02em', marginBottom: 12,
              }}>
                @{user.username}
              </h1>
              <p style={{
                fontSize: 18, color: '#c9bfa8', maxWidth: 560,
                lineHeight: 1.5, marginBottom: 20,
                fontStyle: 'italic',
              }}>
                "{user.bio}"
              </p>
              <div style={{
                display: 'flex', gap: 32, padding: '14px 0',
                borderTop: '1px dashed #403c37', borderBottom: '1px dashed #403c37',
                fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
                color: '#c9bfa8', letterSpacing: '0.1em', textTransform: 'uppercase',
                flexWrap: 'wrap',
              }}>
                <div><span style={{ color: '#6b6660' }}>JOINED /</span> {joined}</div>
                <div><span style={{ color: '#6b6660' }}>COMMENTS /</span> {commentCount}</div>
                <div><span style={{ color: '#6b6660' }}>LIKES GIVEN /</span> {likesGiven}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="paper" style={{ padding: '56px 32px' }}>
        <div style={{ maxWidth: 900, margin: '0 auto', position: 'relative', zIndex: 2 }}>
          <h2 className="display" style={{
            fontSize: 48, color: '#0a0a0a', marginBottom: 24,
            borderBottom: '3px solid #0a0a0a', paddingBottom: 10,
          }}>
            ACCOUNT
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: 20 }}>
            <InfoCard label="USERNAME" value={`@${user.username}`} accent={accent} />
            <InfoCard label="EMAIL" value={user.email || '— not provided —'} accent={accent} />
            <InfoCard label="MEMBER SINCE" value={joined} accent={accent} />
          </div>
          <div style={{ marginTop: 32 }}>
            <button
              onClick={() => { signOut(); onBack(); }}
              className="btn"
              style={{ color: '#0a0a0a' }}
            >
              SIGN OUT ↗
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const InfoCard = ({ label, value, accent }) => (
  <div style={{
    background: '#0a0a0a', color: '#f2ece1',
    padding: '18px 20px',
    border: `2px solid #0a0a0a`,
  }}>
    <div className="mono" style={{
      fontSize: 10, color: accent, letterSpacing: '0.2em',
      textTransform: 'uppercase', marginBottom: 6,
    }}>
      {label}
    </div>
    <div className="slab" style={{ fontSize: 18, letterSpacing: '-0.01em' }}>
      {value}
    </div>
  </div>
);

Object.assign(window, { ProfilePage });
