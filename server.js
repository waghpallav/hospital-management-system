const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  connectionString: process.env.DATABASE_URL || 'postgresql://neondb_owner:npg_4VkI2LWQZcKh@ep-late-fire-awgaiu2v-pooler.c-12.us-east-1.aws.neon.tech/neondb?sslmode=require&channel_binding=require',
  ssl: { rejectUnauthorized: false },
});
app.get('/api/patients', async (req, res) => {
  const result = await pool.query('SELECT * FROM patients ORDER BY patient_id DESC');
  res.json(result.rows);
});
// आजच्या तारखेचा पुढचा token number काढणारं function
async function getNextToken() {
  const result = await pool.query(
    `SELECT COALESCE(MAX(token_number), 0) + 1 AS next_token
     FROM opd_visits WHERE visit_date = CURRENT_DATE`
  );
  return result.rows[0].next_token;
}

// आजच्या सगळ्या OPD visits ची यादी (रांग) — नाव सह
app.get('/api/opd', async (req, res) => {
  const result = await pool.query(`
    SELECT o.opd_id, o.token_number, o.visit_type, o.status, o.consultation_fee,
           p.full_name AS patient_name, p.phone, d.full_name AS doctor_name
    FROM opd_visits o
    JOIN patients p ON o.patient_id = p.patient_id
    LEFT JOIN doctors d ON o.doctor_id = d.doctor_id
    WHERE o.visit_date = CURRENT_DATE
    ORDER BY o.token_number
  `);
  res.json(result.rows);
});

// नवीन OPD visit नोंदवणे — token आपोआप मिळतो
app.post('/api/opd', async (req, res) => {
  const { patient_id, doctor_id, visit_type, consultation_fee } = req.body;
  const token_number = await getNextToken();
  const result = await pool.query(
    `INSERT INTO opd_visits (patient_id, doctor_id, token_number, visit_type, consultation_fee)
     VALUES ($1, $2, $3, $4, $5) RETURNING *`,
    [patient_id, doctor_id || null, token_number, visit_type || 'New', consultation_fee || 0]
  );
  res.json(result.rows[0]);
});

// Status बदलणे (Waiting → In Consultation → Completed)
app.put('/api/opd/:id/status', async (req, res) => {
  const { status } = req.body;
  const result = await pool.query(
    'UPDATE opd_visits SET status = $1 WHERE opd_id = $2 RETURNING *',
    [status, req.params.id]
  );
  res.json(result.rows[0]);
});
app.post('/api/patients', async (req, res) => {
  app.delete('/api/patients/:id', async (req, res) => {
  await pool.query('DELETE FROM patients WHERE patient_id = $1', [req.params.id]);
  res.json({ message: 'Patient deleted' });
});
  const { full_name, phone, gender } = req.body;
  const result = await pool.query(
    'INSERT INTO patients (full_name, phone, gender) VALUES ($1, $2, $3) RETURNING *',
    [full_name, phone, gender]
  );
  res.json(result.rows[0]);
});
app.get('/api/doctors', async (req, res) => {
  
  const result = await pool.query('SELECT * FROM doctors ORDER BY doctor_id DESC');
  res.json(result.rows);
});

app.post('/api/doctors', async (req, res) => {
  app.delete('/api/doctors/:id', async (req, res) => {
  await pool.query('DELETE FROM doctors WHERE doctor_id = $1', [req.params.id]);
  res.json({ message: 'Doctor deleted' });
});
  const { full_name, specialization, phone, consultation_fee } = req.body;
  const result = await pool.query(
    'INSERT INTO doctors (full_name, specialization, phone, consultation_fee) VALUES ($1, $2, $3, $4) RETURNING *',
    [full_name, specialization, phone, consultation_fee]
  );
  res.json(result.rows[0]);
});
app.get('/api/appointments', async (req, res) => {
  const result = await pool.query(`
    SELECT a.appointment_id, a.appointment_date, a.appointment_time, a.reason,
           p.full_name AS patient_name, d.full_name AS doctor_name
    FROM appointments a
    JOIN patients p ON a.patient_id = p.patient_id
    JOIN doctors d ON a.doctor_id = d.doctor_id
    ORDER BY a.appointment_date, a.appointment_time
  `);
  res.json(result.rows);
});

app.post('/api/appointments', async (req, res) => {
  const { patient_id, doctor_id, appointment_date, appointment_time, reason } = req.body;
  const result = await pool.query(
    'INSERT INTO appointments (patient_id, doctor_id, appointment_date, appointment_time, reason) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [patient_id, doctor_id, appointment_date, appointment_time, reason]
  );
  res.json(result.rows[0]);
});
app.get('/api/records', async (req, res) => {
  const result = await pool.query(`
    SELECT r.record_id, r.visit_date, r.symptoms, r.diagnosis, r.treatment_notes,
           p.full_name AS patient_name, d.full_name AS doctor_name
    FROM medical_records r
    JOIN patients p ON r.patient_id = p.patient_id
    JOIN doctors d ON r.doctor_id = d.doctor_id
    ORDER BY r.visit_date DESC
  `);
  res.json(result.rows);
});

app.post('/api/records', async (req, res) => {
  const { patient_id, doctor_id, symptoms, diagnosis, treatment_notes } = req.body;
  const result = await pool.query(
    'INSERT INTO medical_records (patient_id, doctor_id, symptoms, diagnosis, treatment_notes) VALUES ($1, $2, $3, $4, $5) RETURNING *',
    [patient_id, doctor_id, symptoms, diagnosis, treatment_notes]
  );
  res.json(result.rows[0]);
});
app.get('/api/bills', async (req, res) => {
  const result = await pool.query(`
    SELECT b.bill_id, b.description, b.amount, b.bill_date, b.status,
           p.full_name AS patient_name
    FROM bills b
    JOIN patients p ON b.patient_id = p.patient_id
    ORDER BY b.bill_date DESC
  `);
  res.json(result.rows);
});

app.post('/api/bills', async (req, res) => {
  const { patient_id, description, amount } = req.body;
  const result = await pool.query(
    'INSERT INTO bills (patient_id, description, amount) VALUES ($1, $2, $3) RETURNING *',
    [patient_id, description, amount]
  );
  res.json(result.rows[0]);
});

app.put('/api/bills/:id/pay', async (req, res) => {
  const result = await pool.query(
    "UPDATE bills SET status = 'Paid' WHERE bill_id = $1 RETURNING *",
    [req.params.id]
  );
  res.json(result.rows[0]);
});

app.listen(5000, () => console.log('Server running on https://hospital-management-system-wwpo.onrender.com'));