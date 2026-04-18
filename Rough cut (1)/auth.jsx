// Rough Cut — Auth + Profile store (localStorage only, no backend)

const STORAGE_KEY = 'roughcut.auth';
const USERS_KEY = 'roughcut.users';

const AVATAR_PALETTE = [
  ['#ff5a1f', '#0a0a0a'],
  ['#0a0a0a', '#f2ece1'],
  ['#f2ece1', '#0a0a0a'],
  ['#ff5a1f', '#f2ece1'],
  ['#e85d04', '#0a0a0a'],
];

const AVATAR_PATTERNS = ['SLASH', 'GRID', 'DOTS', 'BARS', 'HALFTONE'];

// Deterministic avatar for a username
const avatarFor = (username) => {
  if (!username) return { bg: '#ff5a1f', fg: '#0a0a0a', pattern: 'SLASH' };
  let h = 0;
  for (let i = 0; i < username.length; i++) h = (h * 31 + username.charCodeAt(i)) >>> 0;
  const [bg, fg] = AVATAR_PALETTE[h % AVATAR_PALETTE.length];
  const pattern = AVATAR_PATTERNS[(h >> 4) % AVATAR_PATTERNS.length];
  return { bg, fg, pattern };
};

const Avatar = ({ username, size = 40, border = true }) => {
  const { bg, fg, pattern } = avatarFor(username);
  const initials = (username || '??').slice(0, 2).toUpperCase();
  const patternBg = {
    SLASH: `linear-gradient(135deg, ${bg} 0 48%, ${fg} 48% 52%, ${bg} 52% 100%)`,
    GRID: `repeating-linear-gradient(0deg, ${bg} 0 ${size/5}px, ${fg}22 ${size/5}px ${size/5 + 1}px), ${bg}`,
    DOTS: `radial-gradient(circle at ${size/4}px ${size/4}px, ${fg} ${size/10}px, transparent ${size/10 + 1}px), ${bg}`,
    BARS: `repeating-linear-gradient(90deg, ${bg} 0 ${size/6}px, ${fg}22 ${size/6}px ${size/6 + 2}px), ${bg}`,
    HALFTONE: `radial-gradient(circle at 2px 2px, ${fg} 1px, transparent 1.5px) 0 0 / 5px 5px, ${bg}`,
  }[pattern];
  return (
    <div style={{
      width: size, height: size, flexShrink: 0,
      background: patternBg,
      border: border ? `2px solid #0a0a0a` : 'none',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        fontFamily: 'Archivo Black, sans-serif',
        fontSize: size * 0.38, color: fg,
        letterSpacing: '-0.02em', lineHeight: 1,
        textShadow: `1px 1px 0 ${bg}`,
        mixBlendMode: 'difference',
        filter: 'contrast(1.5)',
      }}>
        {initials}
      </div>
    </div>
  );
};

// Auth hook — localStorage-backed
const useAuth = () => {
  const [user, setUser] = React.useState(() => {
    try {
      const s = localStorage.getItem(STORAGE_KEY);
      return s ? JSON.parse(s) : null;
    } catch { return null; }
  });

  const persist = (u) => {
    if (u) localStorage.setItem(STORAGE_KEY, JSON.stringify(u));
    else localStorage.removeItem(STORAGE_KEY);
    setUser(u);
  };

  const readUsers = () => {
    try { return JSON.parse(localStorage.getItem(USERS_KEY) || '{}'); }
    catch { return {}; }
  };
  const writeUsers = (db) => localStorage.setItem(USERS_KEY, JSON.stringify(db));

  const signUp = ({ username, email, password, bio }) => {
    const users = readUsers();
    const key = username.toLowerCase().trim();
    if (!key) return { error: 'Pick a username.' };
    if (users[key]) return { error: 'Username already taken.' };
    if (!password || password.length < 4) return { error: 'Password too short (4+ chars).' };
    const newUser = {
      username: username.trim(),
      email: email?.trim() || '',
      password, // ⚠ demo only
      bio: bio || 'New here. Opinions incoming.',
      joined: new Date().toISOString(),
    };
    users[key] = newUser;
    writeUsers(users);
    const { password: _, ...publicUser } = newUser;
    persist(publicUser);
    return { ok: true };
  };

  const signIn = ({ username, password }) => {
    const users = readUsers();
    const key = (username || '').toLowerCase().trim();
    const u = users[key];
    if (!u || u.password !== password) return { error: 'Wrong username or password.' };
    const { password: _, ...publicUser } = u;
    persist(publicUser);
    return { ok: true };
  };

  const signOut = () => persist(null);

  return { user, signUp, signIn, signOut };
};

// Sign-in modal
const AuthModal = ({ mode: initialMode = 'signin', onClose, onAuth, accent = '#ff5a1f' }) => {
  const [mode, setMode] = React.useState(initialMode);
  const [form, setForm] = React.useState({ username: '', email: '', password: '', bio: '' });
  const [error, setError] = React.useState('');
  const { signIn, signUp } = onAuth;

  const submit = (e) => {
    e.preventDefault();
    setError('');
    const result = mode === 'signup' ? signUp(form) : signIn(form);
    if (result.error) setError(result.error);
    else onClose();
  };

  const upd = (k) => (e) => setForm({ ...form, [k]: e.target.value });

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 500,
      background: 'rgba(10,10,10,0.85)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: 20,
      backdropFilter: 'blur(4px)',
    }} onClick={onClose}>
      <form
        onClick={(e) => e.stopPropagation()}
        onSubmit={submit}
        style={{
          background: '#0a0a0a', color: '#f2ece1',
          border: `3px solid ${accent}`,
          padding: 32,
          width: '100%', maxWidth: 440,
          boxShadow: '8px 8px 0 rgba(255,90,31,0.3)',
          position: 'relative',
        }}
      >
        <button type="button" onClick={onClose} style={{
          position: 'absolute', top: 12, right: 12,
          background: 'transparent', border: 'none', color: accent,
          fontSize: 22, cursor: 'pointer', lineHeight: 1,
          fontFamily: 'Archivo Black, sans-serif',
        }}>✕</button>

        <div className="mono" style={{
          fontSize: 11, color: accent, letterSpacing: '0.25em',
          textTransform: 'uppercase', marginBottom: 10,
        }}>
          // {mode === 'signup' ? 'NEW_CONTRIBUTOR' : 'IDENTIFY_YOURSELF'}
        </div>
        <h2 className="display" style={{
          fontSize: 44, color: '#f2ece1', lineHeight: 0.9,
          letterSpacing: '-0.02em', marginBottom: 6,
        }}>
          {mode === 'signup' ? (
            <>JOIN THE <span style={{ color: accent }}>ZINE</span></>
          ) : (
            <>SIGN <span style={{ color: accent }}>IN</span></>
          )}
        </h2>
        <p style={{ fontSize: 14, color: '#c9bfa8', marginBottom: 22, lineHeight: 1.5 }}>
          {mode === 'signup'
            ? 'No email required. Just a handle and a password. We run a zine, not a surveillance op.'
            : 'Welcome back. Opinions await.'}
        </p>

        <AuthField label="USERNAME" value={form.username} onChange={upd('username')} placeholder="crit_goblin" accent={accent} required />

        {mode === 'signup' && (
          <AuthField label="EMAIL (OPTIONAL)" type="email" value={form.email} onChange={upd('email')} placeholder="you@somewhere.net" accent={accent} />
        )}

        <AuthField label="PASSWORD" type="password" value={form.password} onChange={upd('password')} placeholder="••••••••" accent={accent} required />

        {mode === 'signup' && (
          <AuthField
            label="BIO (ONE LINE)" value={form.bio} onChange={upd('bio')}
            placeholder="I still defend No Man's Sky." accent={accent}
          />
        )}

        {error && (
          <div style={{
            padding: '10px 12px', marginBottom: 14,
            background: accent, color: '#0a0a0a',
            fontFamily: 'JetBrains Mono, monospace', fontSize: 12,
            letterSpacing: '0.08em', textTransform: 'uppercase',
            border: '2px solid #0a0a0a',
          }}>
            ✕ {error}
          </div>
        )}

        <button
          type="submit"
          className="btn btn-solid"
          style={{ width: '100%', justifyContent: 'center', fontSize: 14, padding: 14, marginBottom: 14 }}
        >
          {mode === 'signup' ? 'CREATE ACCOUNT ↗' : 'SIGN IN ↗'}
        </button>

        <div style={{
          textAlign: 'center', paddingTop: 12,
          borderTop: '1px dashed #403c37',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 11,
          color: '#c9bfa8', letterSpacing: '0.1em', textTransform: 'uppercase',
        }}>
          {mode === 'signup' ? 'ALREADY A CONTRIBUTOR?' : 'NEW AROUND HERE?'}{' '}
          <button
            type="button"
            onClick={() => { setMode(mode === 'signup' ? 'signin' : 'signup'); setError(''); }}
            style={{
              background: 'transparent', border: 'none',
              color: accent, fontFamily: 'inherit', fontSize: 'inherit',
              textDecoration: 'underline', cursor: 'pointer',
              textTransform: 'uppercase', letterSpacing: '0.1em',
            }}
          >
            {mode === 'signup' ? 'SIGN IN' : 'CREATE ACCOUNT'}
          </button>
        </div>

        <div style={{
          marginTop: 14, padding: 10,
          background: '#1a1715', border: '1px dashed #403c37',
          fontFamily: 'JetBrains Mono, monospace', fontSize: 10,
          color: '#6b6660', letterSpacing: '0.08em', lineHeight: 1.5,
        }}>
          // DEMO: profiles stored in this browser only. No server. No magic.
        </div>
      </form>
    </div>
  );
};

const AuthField = ({ label, value, onChange, type = 'text', placeholder, accent, required }) => (
  <div style={{ marginBottom: 14 }}>
    <label className="mono" style={{
      display: 'block', fontSize: 10, color: accent,
      letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: 6,
    }}>
      &gt; {label}{required && <span style={{ opacity: 0.6 }}> *</span>}
    </label>
    <input
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
      style={{
        width: '100%', padding: '12px 14px',
        background: '#1a1715', color: '#f2ece1',
        border: `2px solid ${accent}`,
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: 15, outline: 'none',
      }}
    />
  </div>
);

// Header profile button (signed-out or signed-in)
const ProfileButton = ({ auth, onSignInClick, onProfileClick, accent = '#ff5a1f' }) => {
  const { user, signOut } = auth;
  const [open, setOpen] = React.useState(false);

  if (!user) {
    return (
      <button
        onClick={onSignInClick}
        className="btn btn-solid"
        style={{ fontSize: 12 }}
      >
        SIGN IN ↗
      </button>
    );
  }

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: 'flex', alignItems: 'center', gap: 10,
          background: 'transparent', border: `2px solid ${accent}`,
          padding: '6px 10px 6px 6px', cursor: 'pointer',
          color: '#f2ece1',
        }}
      >
        <Avatar username={user.username} size={28} border={false} />
        <span className="slab" style={{
          fontSize: 13, letterSpacing: '0.05em',
        }}>
          {user.username.toUpperCase()}
        </span>
        <span style={{ color: accent, fontSize: 10, marginLeft: 2 }}>▾</span>
      </button>
      {open && (
        <>
          <div onClick={() => setOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 90 }} />
          <div style={{
            position: 'absolute', top: 'calc(100% + 6px)', right: 0,
            background: '#0a0a0a', border: `2px solid ${accent}`,
            minWidth: 220, padding: 6, zIndex: 100,
            boxShadow: '4px 4px 0 rgba(0,0,0,0.5)',
          }}>
            <div style={{
              padding: '10px 12px',
              borderBottom: '1px dashed #403c37', marginBottom: 4,
            }}>
              <div className="slab" style={{ fontSize: 14, color: '#f2ece1' }}>@{user.username}</div>
              <div style={{ fontSize: 11, color: '#6b6660', marginTop: 2, lineHeight: 1.4 }}>
                {user.bio}
              </div>
            </div>
            {[
              { label: 'MY PROFILE', action: () => { onProfileClick(); setOpen(false); } },
              { label: 'SIGN OUT', action: () => { signOut(); setOpen(false); }, danger: true },
            ].map(it => (
              <button key={it.label} onClick={it.action} style={{
                display: 'block', width: '100%', textAlign: 'left',
                padding: '10px 12px', background: 'transparent', border: 'none',
                color: it.danger ? accent : '#f2ece1', cursor: 'pointer',
                fontFamily: 'Archivo Black, sans-serif',
                fontSize: 12, letterSpacing: '0.1em', textTransform: 'uppercase',
              }}
              onMouseEnter={(e) => e.currentTarget.style.background = '#1a1715'}
              onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                {it.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

Object.assign(window, { useAuth, AuthModal, ProfileButton, Avatar, avatarFor });
