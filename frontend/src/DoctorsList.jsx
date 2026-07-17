import { useState, useEffect } from 'react';
import axios from 'axios';

function DoctorsList() {
  const [doctors, setDoctors] = useState([]);

  const loadDoctors = () => {
    axios.get('https://hospital-management-system-wwpo.onrender.com/api/doctors')
      .then((res) => setDoctors(res.data));
  };

  useEffect(() => {
    loadDoctors();
  }, []);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      axios.delete(`https://hospital-management-system-wwpo.onrender.com/api/doctors/${id}`)
        .then(() => {
          loadDoctors();
        });
    }
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Doctors List</h1>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>Name</th><th>Specialization</th><th>Phone</th><th>Fee</th><th></th></tr>
        </thead>
        <tbody>
          {doctors.map((d) => (
            <tr key={d.doctor_id}>
              <td>{d.full_name}</td>
              <td>{d.specialization}</td>
              <td>{d.phone}</td>
              <td>₹{d.consultation_fee}</td>
              <td>
                <button onClick={() => handleDelete(d.doctor_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default DoctorsList;