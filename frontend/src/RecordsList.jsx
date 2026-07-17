import { useState, useEffect } from 'react';
import axios from 'axios';

function RecordsList() {
  const [records, setRecords] = useState([]);

  useEffect(() => {
    axios.get('https://hospital-management-system-wwpo.onrender.com/api/records')
      .then((res) => setRecords(res.data));
  }, []);

  return (
    <div style={{ maxWidth: '750px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Medical Records</h1>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>Date</th><th>Patient</th><th>Doctor</th><th>Symptoms</th><th>Diagnosis</th></tr>
        </thead>
        <tbody>
          {records.map((r) => (
            <tr key={r.record_id}>
              <td>{new Date(r.visit_date).toLocaleDateString()}</td>
              <td>{r.patient_name}</td>
              <td>{r.doctor_name}</td>
              <td>{r.symptoms}</td>
              <td>{r.diagnosis}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default RecordsList;