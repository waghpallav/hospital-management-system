import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddBill() {
  const [patients, setPatients] = useState([]);
  const [patientId, setPatientId] = useState('');
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://localhost:5000/api/patients').then((res) => setPatients(res.data));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/bills', {
      patient_id: patientId,
      description: description,
      amount: amount,
    }).then(() => {
      navigate('/bills-list');
    });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Create Bill</h1>
      <form onSubmit={handleSubmit}>
        <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}>
          <option value="">Select Patient</option>
          {patients.map((p) => (
            <option key={p.patient_id} value={p.patient_id}>{p.full_name}</option>
          ))}
        </select>

        <input placeholder="Description (e.g. Consultation Fee)" value={description}
          onChange={(e) => setDescription(e.target.value)} required
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }} />

        <input placeholder="Amount" type="number" value={amount}
          onChange={(e) => setAmount(e.target.value)} required
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }} />

        <button type="submit" style={{ padding: '10px 20px' }}>Create Bill</button>
      </form>
    </div>
  );
}

export default AddBill;