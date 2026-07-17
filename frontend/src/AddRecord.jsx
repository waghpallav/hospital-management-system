import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddRecord() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [diagnosis, setDiagnosis] = useState('');
  const [treatmentNotes, setTreatmentNotes] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://hospital-management-system-wwpo.onrender.com/api/patients').then((res) => setPatients(res.data));
    axios.get('https://hospital-management-system-wwpo.onrender.com/api/doctors').then((res) => setDoctors(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://hospital-management-system-wwpo.onrender.com/api/records', {
      patient_id: patientId,
      doctor_id: doctorId,
      symptoms: symptoms,
      diagnosis: diagnosis,
      treatment_notes: treatmentNotes,
    }).then(() => {
      navigate('/records-list');
    });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Add Medical Record</h1>
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

        <textarea placeholder="Symptoms" value={symptoms} onChange={(e) => setSymptoms(e.target.value)}
          rows={2} style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }} />

        <textarea placeholder="Diagnosis" value={diagnosis} onChange={(e) => setDiagnosis(e.target.value)}
          rows={2} style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }} />

        <textarea placeholder="Treatment Notes" value={treatmentNotes} onChange={(e) => setTreatmentNotes(e.target.value)}
          rows={2} style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }} />

        <button type="submit" style={{ padding: '10px 20px' }}>Save Record</button>
      </form>
    </div>
  );
}

export default AddRecord;