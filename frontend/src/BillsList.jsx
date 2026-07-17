import { useState, useEffect } from 'react';
import axios from 'axios';

function BillsList() {
  const [bills, setBills] = useState([]);

  const loadBills = () => {
    axios.get('http://localhost:5000/api/bills')
      .then((res) => setBills(res.data));
  };

  useEffect(() => {
    loadBills();
  }, []);

  const markAsPaid = (id) => {
    axios.put(`http://localhost:5000/api/bills/${id}/pay`)
      .then(() => {
        loadBills();
      });
  };

  return (
    <div style={{ maxWidth: '700px', margin: '40px auto', fontFamily: 'Arial' }}>
      <h1>Bills List</h1>
      <table border="1" cellPadding="8" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr><th>Date</th><th>Patient</th><th>Description</th><th>Amount</th><th>Status</th><th></th></tr>
        </thead>
        <tbody>
          {bills.map((b) => (
            <tr key={b.bill_id}>
              <td>{new Date(b.bill_date).toLocaleDateString()}</td>
              <td>{b.patient_name}</td>
              <td>{b.description}</td>
              <td>₹{b.amount}</td>
              <td>{b.status}</td>
              <td>
                {b.status !== 'Paid' && (
                  <button onClick={() => markAsPaid(b.bill_id)}>Mark as Paid</button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BillsList;