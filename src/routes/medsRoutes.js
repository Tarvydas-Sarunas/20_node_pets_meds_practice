const express = require('express');
const { dbQueryWithData } = require('../helper');
const medsRoutes = express.Router();

// ROUTES
// GET/POST - /v1/meds/api/

const tableName = 'medications';
// GET paduos visus vaistus iš 'medications' db;
medsRoutes.get('/', async (req, res) => {
  const sql = `SELECT * FROM ${tableName} `;
  const [medicARR, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(medicARR);
});

// POST įrašys vieną vaistą į 'medications' db.

// export routes
module.exports = medsRoutes;
