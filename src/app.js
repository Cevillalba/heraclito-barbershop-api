const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/authRoutes');
const citaRoutes = require('./routes/citaRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/citas', citaRoutes);

module.exports = app;