import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddAppointment() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [reason, setReason] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://hospital-management-system-wwpo.onrender.com/api/patients').then((res) => setPatients(res.data));
    axios.get('https://hospital-management-system-wwpo.onrender.com/api/doctors').then((res) => setDoctors(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://hospital-management-system-wwpo.onrender.com/api/appointments', {
      patient_id: patientId,
      doctor_id: doctorId,
      appointment_date: date,
      appointment_time: time,
      reason: reason,
    }).then(() => {
      navigate('/appointments-list');
    });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Book Appointment</h1>
      <form onSubmit={handleSubmit}>
        <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}>
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.patient_id} value={p.patient_id}>{p.full_name}</option>
          ))}
        </select>

        <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}>
          <option value="">Select Doctor</option>
          {doctors.map((d) => (
            <option key={d.doctor_id} value={d.doctor_id}>{d.full_name}</option>
          ))}
        </select>

        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} required
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }} />

        <input type="time" value={time} onChange={(e) => setTime(e.target.value)} required
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }} />

        <input placeholder="Reason for visit" value={reason} onChange={(e) => setReason(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }} />

        <button type="submit" style={{ padding: '10px 20px' }}>Book Appointment</button>
      </form>
    </div>
  );
}

export default AddAppointment;