// Rough Cut — Comments section

const COMMENTS_KEY = 'roughcut.comments';

// Seed comments for demo flavor
const SEED_COMMENTS = {
  'ember-hollow': [
    {
      id: 'c1', username: 'wyrm_fan', bio: 'I still defend No Man\'s Sky.',
      text: 'Finally a deckbuilder that doesn\'t ask for my firstborn. The Monk rules.',
      ts: '2026-04-17T14:23:00Z', likes: 12,
    },
    {
      id: 'c2', username: 'crit_goblin', bio: 'opinions for hire',
      text: 'The narrator grew on me by run 4. Or I developed Stockholm syndrome. Either way: hooked.',
      ts: '2026-04-17T09:14:00Z', likes: 8, replyTo: 'c1',
    },
    {
      id: 'c3', username: 'mara_plays', bio: 'contributor',
      text: 'Thanks for reading! The Hound build is busted in the best way — burn stacking with the third relic goes crazy.',
      ts: '2026-04-16T22:40:00Z', likes: 21, staff: true,
    },
    {
      id: 'c4', username: 'pixel_pilgrim', bio: 'chiptune enjoyer',
      text: 'Hot take: the four-track soundtrack is good, actually. Track 2 is a banger.',
      ts: '2026-04-16T18:05:00Z', likes: 3,
    },
  ],
  'neon-dispatch': [
    {
      id: 'c5', username: 'dispatch_hater', bio: 'I played one game once',
      text: 'Stressful is underselling it. I had a nightmare about surge pricing.',
      ts: '2026-04-13T11:30:00Z', likes: 15,
    },
    {
      id: 'c6', username: 'ui_nerd', bio: 'I read UX case studies for fun',
      text: 'The split-screen radar + route planner is the best UI work I\'ve seen this year. Full stop.',
      ts: '2026-04-13T08:12:00Z', likes: 9,
    },
  ],
};

// Time ago formatter
const timeAgo = (iso) => {
  const diff = (Date.now() - new Date(iso).getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
};

const loadComments = (slug) => {
  try {
    const all = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '{}');
    if (all[slug]) return all[slug];
  } catch {}
  // Seed on first access
  const seeded = SEED_COMMENTS[slug] || [];
  try {
    const all = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '{}');
    all[slug] = seeded;
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(all));
  } catch {}
  return seeded;
};

const saveComments = (slug, list) => {
  try {
    const all = JSON.parse(localStorage.getItem(COMMENTS_KEY) || '{}');
    all[slug] = list;
    localStorage.setItem(COMMENTS_KEY, JSON.stringify(all));
  } catch {}
};

const LIKES_KEY = 'roughcut.likes';
const loadLikedSet = () => {
  try { return new Set(JSON.parse(localStorage.getItem(LIKES_KEY) || '[]')); }
  catch { return new Set(); }
};
const saveLikedSet = (set) => {
  localStorage.setItem(LIKES_KEY, JSON.stringify([...set]));
};

const CommentItem = ({ c, liked, onLike, accent, depth = 0 }) => (
  <div style={{
    display: 'flex', gap: 14,
    paddingLeft: depth * 28,
    marginBottom: 20,
  }}>
    <Avatar username={c.username} size={44} />
    <div style={{ flex: 1, minWidth: 0 }}>
      <div style={{
        background: '#1a1715',
        border: `2px solid ${c.staff ? accent : '#403c37'}`,
        padding: '12px 16px',
      }}>
        <div style={{
          display: 'flex', alignItems: 'center', gap: 8,
          marginBottom: 6, flexWrap: 'wrap',
        }}>
          <span className="slab" style={{
            fontSize: 14, color: '#f2ece1', letterSpacing: '0.02em',
          }}>
            @{c.username}
          </span>
          {c.staff && (
            <span style={{
              fontFamily: 'Archivo Black, sans-serif', fontSize: 9,
              background: accent, color: '#0a0a0a',
              padding: '2px 6px', letterSpacing: '0.15em',
            }}>
              ◆ STAFF
            </span>
          )}
          <span className="mono" style={{
            fontSize: 10, color: '#6b6660', letterSpacing: '0.1em',
            textTransform: 'uppercase', marginLeft: 'auto',
          }}>
            {timeAgo(c.ts)}
          </span>
        </div>
        <p style={{
          fontSize: 14, lineHeight: 1.55, color: '#f2ece1',
          wordBreak: 'break-word',
        }}>
          {c.text}
        </p>
      </div>
      <div style={{
        display: 'flex', gap: 16, marginTop: 8,
        fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
        letterSpacing: '0.1em', textTransform: 'uppercase',
      }}>
        <button onClick={() => onLike(c.id)} style={{
          background: 'transparent', border: 'none', cursor: 'pointer',
          color: liked ? accent : '#6b6660',
          fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit',
          textTransform: 'inherit', padding: 0,
          display: 'flex', alignItems: 'center', gap: 5,
        }}>
          <span>{liked ? '▲' : '△'}</span>
          <span>{c.likes || 0} {c.likes === 1 ? 'LIKE' : 'LIKES'}</span>
        </button>
      </div>
    </div>
  </div>
);

const Comments = ({ slug, auth, onSignInClick, accent = '#ff5a1f' }) => {
  const [list, setList] = React.useState(() => loadComments(slug));
  const [draft, setDraft] = React.useState('');
  const [liked, setLiked] = React.useState(() => loadLikedSet());
  const { user } = auth;

  React.useEffect(() => {
    setList(loadComments(slug));
    setDraft('');
  }, [slug]);

  const submit = (e) => {
    e.preventDefault();
    if (!user || !draft.trim()) return;
    const newComment = {
      id: 'c' + Date.now(),
      username: user.username,
      bio: user.bio,
      text: draft.trim(),
      ts: new Date().toISOString(),
      likes: 0,
    };
    const next = [newComment, ...list];
    setList(next);
    saveComments(slug, next);
    setDraft('');
  };

  const toggleLike = (id) => {
    const key = `${slug}:${id}`;
    const next = new Set(liked);
    let updated;
    if (next.has(key)) {
      next.delete(key);
      updated = list.map(c => c.id === id ? { ...c, likes: Math.max(0, (c.likes || 0) - 1) } : c);
    } else {
      next.add(key);
      updated = list.map(c => c.id === id ? { ...c, likes: (c.likes || 0) + 1 } : c);
    }
    setLiked(next); saveLikedSet(next);
    setList(updated); saveComments(slug, updated);
  };

  return (
    <section style={{ background: '#0a0a0a', padding: '56px 32px' }}>
      <div style={{ maxWidth: 860, margin: '0 auto' }}>
        <div style={{
          display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
          marginBottom: 28, paddingBottom: 12,
          borderBottom: `3px solid ${accent}`,
        }}>
          <h2 className="display" style={{
            fontSize: 48, color: '#f2ece1', letterSpacing: '-0.01em',
          }}>
            THE <span style={{ color: accent }}>DISCOURSE</span>
          </h2>
          <span className="mono" style={{
            fontSize: 12, color: accent, letterSpacing: '0.15em', textTransform: 'uppercase',
          }}>
            {list.length} {list.length === 1 ? 'COMMENT' : 'COMMENTS'}
          </span>
        </div>

        {/* Composer */}
        {user ? (
          <form onSubmit={submit} style={{
            display: 'flex', gap: 14, marginBottom: 36,
            padding: 16, border: `2px solid ${accent}`, background: '#1a1715',
          }}>
            <Avatar username={user.username} size={44} />
            <div style={{ flex: 1 }}>
              <div className="mono" style={{
                fontSize: 11, color: accent, letterSpacing: '0.2em',
                textTransform: 'uppercase', marginBottom: 6,
              }}>
                &gt; POSTING AS @{user.username.toUpperCase()}
              </div>
              <textarea
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder="Hot take, cold take, whatever. Keep it spicy."
                rows={3}
                style={{
                  width: '100%', padding: 12,
                  background: '#0a0a0a', color: '#f2ece1',
                  border: `1px dashed #403c37`,
                  fontFamily: 'Inter, sans-serif', fontSize: 15,
                  resize: 'vertical', outline: 'none',
                }}
                onFocus={(e) => e.currentTarget.style.borderColor = accent}
                onBlur={(e) => e.currentTarget.style.borderColor = '#403c37'}
              />
              <div style={{
                display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                marginTop: 10,
              }}>
                <div className="mono" style={{
                  fontSize: 10, color: '#6b6660', letterSpacing: '0.1em', textTransform: 'uppercase',
                }}>
                  BE NICE. OR DON'T. CAN'T STOP YOU.
                </div>
                <button
                  type="submit"
                  disabled={!draft.trim()}
                  className="btn btn-solid"
                  style={{
                    fontSize: 12,
                    opacity: draft.trim() ? 1 : 0.4,
                    cursor: draft.trim() ? 'pointer' : 'not-allowed',
                  }}
                >
                  POST ↗
                </button>
              </div>
            </div>
          </form>
        ) : (
          <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            padding: '20px 24px', marginBottom: 36,
            border: `2px dashed ${accent}`, background: '#1a1715',
            flexWrap: 'wrap', gap: 16,
          }}>
            <div>
              <div className="slab" style={{ fontSize: 18, color: '#f2ece1', marginBottom: 4 }}>
                GOT SOMETHING TO SAY?
              </div>
              <div style={{ fontSize: 13, color: '#c9bfa8' }}>
                Sign in to post. Takes 30 seconds. We're not collecting anything.
              </div>
            </div>
            <button onClick={onSignInClick} className="btn btn-solid" style={{ fontSize: 12 }}>
              SIGN IN TO COMMENT ↗
            </button>
          </div>
        )}

        {/* Comment list */}
        {list.length === 0 ? (
          <div style={{
            padding: 40, textAlign: 'center',
            border: '1px dashed #403c37',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 13,
            color: '#6b6660', letterSpacing: '0.1em', textTransform: 'uppercase',
          }}>
            // NO COMMENTS YET. BE FIRST.
          </div>
        ) : (
          <div>
            {list.map(c => (
              <CommentItem
                key={c.id}
                c={c}
                liked={liked.has(`${slug}:${c.id}`)}
                onLike={toggleLike}
                accent={accent}
                depth={c.replyTo ? 1 : 0}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

Object.assign(window, { Comments });
