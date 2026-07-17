import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function AddDoctor() {
  const [fullName, setFullName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [phone, setPhone] = useState('');
  const [fee, setFee] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('https://hospital-management-system-wwpo.onrender.com/api/doctors', {
      full_name: fullName,
      specialization: specialization,
      phone: phone,
      consultation_fee: fee,
    }).then(() => {
      navigate('/doctors-list');
    });
  };

  return (
    <div style={{ maxWidth: '500px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Add Doctor</h1>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <input
          placeholder="Consultation Fee"
          type="number"
          value={fee}
          onChange={(e) => setFee(e.target.value)}
          style={{ display: 'block', width: '100%', padding: '8px', marginBottom: '10px' }}
        />
        <button type="submit" style={{ padding: '10px 20px' }}>Add Doctor</button>
      </form>
    </div>
  );
}

export default AddDoctor;