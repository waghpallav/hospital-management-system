import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddOPDVisit() {
  const [patients, setPatients] = useState([]);
  const [doctors, setDoctors] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [visitType, setVisitType] = useState('New');
  const [fee, setFee] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/patients').then((res) => setPatients(res.data));
    axios.get('http://localhost:5000/api/doctors').then((res) => setDoctors(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/opd', {
      patient_id: patientId,
      doctor_id: doctorId || null,
      visit_type: visitType,
      consultation_fee: fee || 0,
    }).then(() => {
      navigate('/opd-queue');
    });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>OPD Walk-in Registration</h1>
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

        <select value={visitType} onChange={(e) => setVisitType(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}>
          <option>New</option>
          <option>Follow-up</option>
        </select>

        <input placeholder="Consultation Fee" type="number" value={fee}
          onChange={(e) => setFee(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }} />

        <button type="submit" style={{ padding: '10px 20px' }}>Generate Token (Check-in)</button>
      </form>
    </div>
  );
}

export default AddOPDVisit;