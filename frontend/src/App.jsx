import { Routes, Route, Link } from 'react-router-dom';
import AddPatient from './AddPatient';
import PatientsList from './PatientsList';
import AddDoctor from './AddDoctor';
import DoctorsList from './DoctorsList';
import AddAppointment from './AddAppointment';
import AppointmentsList from './AppointmentsList';
import AddRecord from './AddRecord';
import RecordsList from './RecordsList';
import AddBill from './AddBill';
import BillsList from './BillsList';

const linkStyle = {
  display: 'block',
  color: '#e8f2f0',
  padding: '9px 12px',
  textDecoration: 'none',
  fontSize: '14px',
  borderRadius: '6px',
  marginBottom: '2px',
};

const headingStyle = {
  marginBottom: '8px',
  fontSize: '11px',
  color: '#8fb8b0',
  textTransform: 'uppercase',
  letterSpacing: '0.08em',
  fontWeight: '600',
  paddingLeft: '12px',
};

function App() {
  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      <nav style={{ width: '220px', background: '#10262b', minHeight: '100vh' }}>
        <div style={{ padding: '20px', borderBottom: '2px solid #2f7a6d' }}>
          <h2 style={{ fontSize: '19px', color: 'white' }}>HIMS</h2>
        </div>

        <div style={{ padding: '18px 20px', borderBottom: '1px solid #2a4a47' }}>
          <div style={headingStyle}>Patients</div>
          <Link to="/add" style={linkStyle}>+ Add Patient</Link>
          <Link to="/list" style={linkStyle}>View List</Link>
        </div>

        <div style={{ padding: '18px 20px', borderBottom: '1px solid #2a4a47' }}>
          <div style={headingStyle}>Doctors</div>
          <Link to="/add-doctor" style={linkStyle}>+ Add Doctors</Link>
          <Link to="/doctors-list" style={linkStyle}>View List</Link>
        </div>

        <div style={{ padding: '18px 20px', borderBottom: '1px solid #2a4a47' }}>
          <div style={headingStyle}>Appointments</div>
          <Link to="/add-appointment" style={linkStyle}>+ Book Appointment</Link>
          <Link to="/appointments-list" style={linkStyle}>View List</Link>
        </div>

        <div style={{ padding: '18px 20px', borderBottom: '1px solid #2a4a47' }}>
          <div style={headingStyle}>Records</div>
          <Link to="/add-record" style={linkStyle}>+ Add Records</Link>
          <Link to="/records-list" style={linkStyle}>View List</Link>
        </div>

        <div style={{ padding: '18px 20px' }}>
          <div style={headingStyle}>Bills</div>
          <Link to="/add-bill" style={linkStyle}>+ Add Bill</Link>
          <Link to="/bills-list" style={linkStyle}>View List</Link>
        </div>
      </nav>

      <main style={{ flex: 1, padding: '40px' }}>
        <Routes>
          <Route path="/add" element={<AddPatient />} />
          <Route path="/list" element={<PatientsList />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctors-list" element={<DoctorsList />} />
          <Route path="/add-appointment" element={<AddAppointment />} />
          <Route path="/appointments-list" element={<AppointmentsList />} />
          <Route path="/add-record" element={<AddRecord />} />
          <Route path="/records-list" element={<RecordsList />} />
          <Route path="/add-bill" element={<AddBill />} />
          <Route path="/bills-list" element={<BillsList />} />
          <Route path="/" element={<AddPatient />} />
        </Routes>
      </main>

    </div>
  );
}

export default App;