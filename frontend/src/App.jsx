import { Routes, Route, Link } from 'react-router-dom';
import Dashboard from './Dashboard';
import QuickLinks from './QuickLinks';
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
import AddOPDVisit from './AddOPDVisit';
import OPDQueue from './OPDQueue';

const navItem = {
  color: '#e8f2f0',
  textDecoration: 'none',
  fontSize: '13px',
  padding: '8px 12px',
  borderRadius: '6px',
};

function App() {
  return (
    <div style={{ minHeight: '100vh', background: '#f4f7f6' }}>

      <header style={{
        background: '#10262b',
        padding: '0 30px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: '54px',
      }}>
        <Link to="/" style={{ color: 'white', fontSize: '17px', fontWeight: 'bold', textDecoration: 'none', marginRight: '30px' }}>
          🏥 Aarogya HIMS
        </Link>

        <nav style={{ display: 'flex', gap: '4px', flex: 1 }}>
          <Link to="/" style={navItem}>Home</Link>
          <Link to="/list" style={navItem}>Patients</Link>
          <Link to="/doctors-list" style={navItem}>Doctors</Link>
          <Link to="/appointments-list" style={navItem}>Appointments</Link>
          <Link to="/records-list" style={navItem}>Records</Link>
          <Link to="/bills-list" style={navItem}>Billing</Link>
          <Link to="/opd-queue" style={navItem}>OPD</Link>
        </nav>
      </header>

      <div style={{ display: 'flex' }}>
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Dashboard />} />
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
            <Route path="/add-opd" element={<AddOPDVisit />} />
            <Route path="/opd-queue" element={<OPDQueue />} />
          </Routes>
        </main>
        <QuickLinks />
      </div>

    </div>
  );
}

export default App;