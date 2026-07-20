import { Link } from 'react-router-dom';

const links = [
  { icon: '🧑‍🤝‍🧑', label: 'New Patient', to: '/add' },
  { icon: '📅', label: 'New Appointment', to: '/add-appointment' },
  { icon: '🩺', label: 'New Doctor', to: '/add-doctor' },
  { icon: '📋', label: 'Add Record', to: '/add-record' },
  { icon: '💰', label: 'New Bill', to: '/add-bill' },
  { icon: '🏥', label: 'OPD Check-in', to: '/add-opd' },
];

function QuickLinks() {
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
      {links.map((l) => (
        <Link key={l.label} to={l.to} style={{
          display: 'flex', alignItems: 'center', gap: '10px',
          padding: '9px 8px', borderRadius: '6px', textDecoration: 'none',
          color: '#16302c', fontSize: '13px', marginBottom: '4px',
        }}>
          <span style={{ fontSize: '18px' }}>{l.icon}</span>
          {l.label}
        </Link>
      ))}
    </aside>
  );
}

export default QuickLinks;