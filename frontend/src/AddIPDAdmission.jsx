import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddIPDAdmission() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [wardType, setWardType] = useState('General');
  const [bedNumber, setBedNumber] = useState('');
  const [reason, setReason] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/patients').then((res) => setPatients(res.data));
    axios.get('http://localhost:5000/api/doctors').then((res) => setDoctors(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/ipd', {
      patient_id: patientId,
      doctor_id: doctorId || null,
      ward_type: wardType,
      bed_number: bedNumber,
      admission_reason: reason,
      diagnosis: diagnosis,
    }).then(() => {
      navigate('/ipd-list');
    });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Admit Patient (IPD)</h1>
      <form onSubmit={handleSubmit}>
        <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}>
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.patient_id} value={p.patient_id}>{p.full_name}</option>
          ))}
        </select>

        <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}>
          <option value="">Select Doctor (optional)</option>
          {doctors.map((d) => (
            <option key={d.doctor_id} value={d.doctor_id}>{d.full_name}</option>
          ))}
        </select>

        <select value={wardType} onChange={(e) => setWardType(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}>
          <option>General</option>
          <option>ICU</option>
          <option>Private</option>
          <option>Semi-Private</option>
        </select>

        <input placeholder="Bed Number (e.g. A-12)" value={bedNumber}
          onChange={(e) => setBedNumber(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }} />

        <textarea placeholder="Reason for Admission" value={reason}
          onChange={(e) => setReason(e.target.value)} rows={2}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }} />

        <textarea placeholder="Diagnosis" value={diagnosis}
          onChange={(e) => setDiagnosis(e.target.value)} rows={2}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }} />

        <button type="submit" style={{ padding: '10px 20px' }}>Admit Patient</button>
      </form>
    </div>
  );
}

export default AddIPDAdmission;