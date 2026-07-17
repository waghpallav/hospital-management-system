import { useState, useEffect } from 'react';
import axios from 'axios';

function AppointmentsList() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    axios.get('https://hospital-management-system-wwpo.onrender.com/api/appointments')
      .then((res) => setAppointments(res.data));
  }, []);

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Appointments List</h1>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>Date</th><th>Time</th><th>Patient</th><th>Doctor</th><th>Reason</th></tr>
        </thead>
        <tbody>
          {appointments.map((a) => (
            <tr key={a.appointment_id}>
              <td>{a.appointment_date?.slice(0, 10)}</td>
              <td>{a.appointment_time}</td>
              <td>{a.patient_name}</td>
              <td>{a.doctor_name}</td>
              <td>{a.reason}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default AppointmentsList;