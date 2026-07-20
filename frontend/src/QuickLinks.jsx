import { useState } from 'react';
import { Link } from 'react-router-dom';

const links = [
  { icon: '🧑‍🤝‍🧑', label: 'New Patient', to: '/add' },
  { icon: '📅', label: 'New Appointment', to: '/add-appointment' },
  { icon: '🩺', label: 'New Doctor', to: '/add-doctor' },
  { icon: '📋', label: 'Add Record', to: '/add-record' },
  { icon: '💰', label: 'New Bill', to: '/add-bill' },
  { icon: '🏥', label: 'OPD Check-in', to: '/add-opd' },
  { icon: '🛏️', label: 'Admit Patient', to: '/add-ipd' },
];

const VISIBLE_COUNT = 5;

function QuickLinks() {
  const [showAll, setShowAll] = useState(false);
  const visibleLinks = showAll ? links : links.slice(0, VISIBLE_COUNT);
  const hasMore = links.length > VISIBLE_COUNT;

  const linkItemStyle = {
    display: 'flex', alignItems: 'center', gap: '10px',
    padding: '9px 8px', borderRadius: '6px', textDecoration: 'none',
    color: '#16302c', fontSize: '13px', marginBottom: '4px',
  };

  return (
    <aside style={{
      width: '220px',
      background: 'white',
      borderLeft: '1px solid #dde5e3',
      padding: '20px 16px',
      minHeight: 'calc(100vh - 54px)',
    }}>
      <div style={{
        fontSize: '11px', fontWeight: 'bold', color: '#8a8a8a',
        textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '12px',
      }}>
        Quick Links
      </div>

      {visibleLinks.map((l) => (
        <Link key={l.label} to={l.to} style={linkItemStyle}>
          <span style={{ fontSize: '18px' }}>{l.icon}</span>
          {l.label}
        </Link>
      ))}

      {hasMore && (
        <button
          onClick={() => setShowAll(!showAll)}
          style={{
            background: 'none', border: 'none', color: '#2f7a6d',
            fontSize: '12px', fontWeight: 'bold', cursor: 'pointer',
            padding: '9px 8px', marginTop: '4px',
          }}
        >
          {showAll ? 'See Less ▴' : `See More (${links.length - VISIBLE_COUNT}) ▾`}
        </button>
      )}
    </aside>
  );
}

export default QuickLinks;