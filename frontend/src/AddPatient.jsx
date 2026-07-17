import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddPatient() {
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [gender, setGender] = useState('Male');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://hospital-management-system-wwpo.onrender.com/api/patients', {
      full_name: fullName,
      phone: phone,
      gender: gender,
    }).then(() => {
      navigate('/list');
    });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Patient Registration</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <select
          value={gender}
          onChange={(e) => setGender(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>
        <button type="submit" style={{ padding: '10px 20px' }}>Add Patient</button>
      </form>
    </div>
  );
}

export default AddPatient;