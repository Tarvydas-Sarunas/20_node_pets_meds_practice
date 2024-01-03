const express = require('express');
const { dbQueryWithData } = require('../helper');
const petsRoutes = express.Router();

// get / - grazina visus gyvunus
petsRoutes.get('/', async (req, res) => {
  const sql = 'SELECT * FROM `pets`';
  const [rows, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json('cia bus visi pets');
});

// export
module.exports = petsRoutes;
