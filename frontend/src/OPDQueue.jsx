import { useState, useEffect } from 'react';
import axios from 'axios';

function OPDQueue() {
  const [visits, setVisits] = useState([]);

  const loadQueue = () => {
    axios.get('http://localhost:5000/api/opd')
      .then((res) => setVisits(res.data));
  };

  useEffect(() => {
    loadQueue();
  }, []);

  const updateStatus = (id, status) => {
    axios.put(`http://localhost:5000/api/opd/${id}/status`, { status })
      .then(() => loadQueue());
  };

  const statusColor = (status) => {
    if (status === 'Completed') return '#2f7a6d';
    if (status === 'In Consultation') return '#c7594c';
    return '#8a8a8a';
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Today's OPD Queue</h1>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th>Token</th><th>Patient</th><th>Phone</th><th>Doctor</th>
            <th>Type</th><th>Status</th><th></th>
          </tr>
        </thead>
        <tbody>
          {visits.length === 0 && (
            <tr><td colSpan={7} style={{ textAlign: 'center', padding: '20px' }}>No patients checked in today yet.</td></tr>
          )}
          {visits.map((v) => (
            <tr key={v.opd_id}>
              <td style={{ fontWeight: 'bold', fontSize: '18px' }}>#{v.token_number}</td>
              <td>{v.patient_name}</td>
              <td>{v.phone}</td>
              <td>{v.doctor_name || '—'}</td>
              <td>{v.visit_type}</td>
              <td style={{ color: statusColor(v.status), fontWeight: 'bold' }}>{v.status}</td>
              <td>
                {v.status === 'Waiting' && (
                  <button onClick={() => updateStatus(v.opd_id, 'In Consultation')}>Start Consultation</button>
                )}
                {v.status === 'In Consultation' && (
                  <button onClick={() => updateStatus(v.opd_id, 'Completed')}>Mark Completed</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OPDQueue;