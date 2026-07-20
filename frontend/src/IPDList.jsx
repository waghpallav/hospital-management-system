import { useState, useEffect } from 'react';
import axios from 'axios';

function IPDList() {
  const [admissions, setAdmissions] = useState([]);

  const loadAdmissions = () => {
    axios.get('http://localhost:5000/api/ipd')
      .then((res) => setAdmissions(res.data));
  };

  useEffect(() => {
    loadAdmissions();
  }, []);

  const handleDischarge = (id) => {
    if (window.confirm('Discharge this patient?')) {
      axios.put(`http://localhost:5000/api/ipd/${id}/discharge`)
        .then(() => loadAdmissions());
    }
  };

  return (
    <div style={{ maxWidth: '950px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>IPD — Admitted Patients</h1>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Patient</th><th>Ward</th><th>Bed</th><th>Doctor</th>
            <th>Admitted On</th><th>Status</th><th></th>
          </tr>
        </thead>
        <tbody>
          {admissions.length === 0 && (
            <tr><td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>No admissions yet.</td></tr>
          )}
          {admissions.map((a) => (
            <tr key={a.admission_id}>
              <td>{a.patient_name} <span style={{ color: '#888', fontSize: '12px' }}>({a.phone})</span></td>
              <td>{a.ward_type}</td>
              <td>{a.bed_number || '—'}</td>
              <td>{a.doctor_name || '—'}</td>
              <td>{new Date(a.admission_date).toLocaleDateString()}</td>
              <td style={{
                color: a.status === 'Admitted' ? '#c7594c' : '#2f7a6d',
                fontWeight: 'bold',
              }}>
                {a.status}
              </td>
              <td>
                {a.status === 'Admitted' && (
                  <button onClick={() => handleDischarge(a.admission_id)}>Discharge</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default IPDList;