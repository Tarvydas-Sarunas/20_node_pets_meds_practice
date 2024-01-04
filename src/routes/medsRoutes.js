const express = require('express');
const { dbQueryWithData } = require('../helper');
const { checkMedsBody } = require('../middleware');
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

medsRoutes.post('/', checkMedsBody, async (req, res) => {
  const { name, description } = req.body;
  const newMedoc = [name, description];
  const sql = `INSERT INTO ${tableName} (name, description) VALUES (?, ?)`;
  const [newMedicObj, error] = await dbQueryWithData(sql, newMedoc);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  if (newMedicObj.affectedRows === 0) {
    res.status(400).json({ msg: 'Something went wrong' });
    return;
  }
  if (newMedicObj.affectedRows === 1) {
    res.status(201).json({ msg: 'New medication was added' });
    return;
  }
  res.json(newMedicObj);
});

// export routes
module.exports = medsRoutes;
