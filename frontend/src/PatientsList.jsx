import { useState, useEffect } from 'react';
import axios from 'axios';

function PatientsList() {
  const [patients, setPatients] = useState([]);

  const loadPatients = () => {
    axios.get('https://hospital-management-system-wwpo.onrender.com/api/patients')
      .then((res) => setPatients(res.data));
  };

  useEffect(() => {
    loadPatients();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this patient?')) {
      axios.delete(`https://hospital-management-system-wwpo.onrender.com/api/patients/${id}`)
        .then(() => {
          loadPatients();
        });
    }
  };

  return (
    <div style={{ maxWidth: '650px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Patients List</h1>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>Name</th><th>Phone</th><th>Gender</th><th></th></tr>
        </thead>
        <tbody>
          {patients.map((p) => (
            <tr key={p.patient_id}>
              <td>{p.full_name}</td>
              <td>{p.phone}</td>
              <td>{p.gender}</td>
              <td>
                <button onClick={() => handleDelete(p.patient_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default PatientsList;