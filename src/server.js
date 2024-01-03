require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const testConnection = require('./routes/testRoutes');

const app = express();

const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// ROUTES
app.get('/', (req, res) => {
  res.send('Hello World');
});

// inportuoju routes
const petsRoutes = require('./routes/petsRoutes');
const logsRoutes = require('./routes/logsRoutes');
const medsRoutes = require('./routes/medsRoutes');
const prescRoutes = require('./routes/prescRoutes');

// panaudoju routes
app.use('/v1/api/pets', petsRoutes);
app.use('/v1/api/logs', logsRoutes);
app.use('/v1/api/meds', medsRoutes);
app.use('/', prescRoutes);

// testConnection();

// app.listen(PORT);
app.listen(PORT, () => {
  console.log(`Server runing on http://localhost:${PORT}`);
});
