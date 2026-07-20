import { Link } from 'react-router-dom';

const modules = [
  { name: 'Patients', icon: '🧑‍🤝‍🧑', color: '#2f7a6d', add: '/add', list: '/list' },
  { name: 'Doctors', icon: '🩺', color: '#3c7a9c', add: '/add-doctor', list: '/doctors-list' },
  { name: 'Appointments', icon: '📅', color: '#a8703a', add: '/add-appointment', list: '/appointments-list' },
  { name: 'Medical Records', icon: '📋', color: '#7a5ca8', add: '/add-record', list: '/records-list' },
  { name: 'Billing', icon: '💰', color: '#a8453a', add: '/add-bill', list: '/bills-list' },
  { name: 'OPD', icon: '🏥', color: '#2f7a6d', add: '/add-opd', list: '/opd-queue' },
  { name: 'IPD (Admissions)', icon: '🛏️', color: '#3c7a9c', add: '/add-ipd', list: '/ipd-list' },
];

function Dashboard() {
  return (
    <div style={{ maxWidth: '900px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1 style={{ marginBottom: '4px' }}>HIMS</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Hospital Management Dashboard</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: '20px',
      }}>
        {modules.map((m) => (
          <div key={m.name} style={{
            border: '1px solid #ddd',
            borderRadius: '10px',
            padding: '20px',
            textAlign: 'center',
            background: 'white',
            boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
          }}>
            <div style={{
              fontSize: '36px',
              background: `${m.color}15`,
              width: '70px',
              height: '70px',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
            }}>
              {m.icon}
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '15px', marginBottom: '12px' }}>{m.name}</div>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}>
              <Link to={m.add} style={{
                fontSize: '12px', padding: '6px 10px', borderRadius: '6px',
                background: m.color, color: 'white', textDecoration: 'none',
              }}>+ Add</Link>
              <Link to={m.list} style={{
                fontSize: '12px', padding: '6px 10px', borderRadius: '6px',
                border: `1px solid ${m.color}`, color: m.color, textDecoration: 'none',
              }}>View List</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;