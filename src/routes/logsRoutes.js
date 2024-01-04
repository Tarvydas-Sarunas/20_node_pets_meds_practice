const express = require('express');
const { dbQueryWithData } = require('../helper');
const { checkLogsBody } = require('../middleware');
const logsRoutes = express.Router();

// ROUTES
const table = 'logs';
// GET/POST - /v1/api/logs/
// GET paims vieno augintinio visus įrašus iš 'logs' ir juos apjungs (JOIN) su 'pets' lentele;
logsRoutes.get('/petId/:id', checkLogsBody, async (req, res) => {
  const id = +req.params.id;
  const sql = `
SELECT logs.logs_id, logs.description, logs.status, pets.pets_name, pets.pets_dob
FROM logs
JOIN pets 
ON logs.pet_id = pets.pets_id
WHERE logs.pet_id=?
`;
  const [logObj, error] = await dbQueryWithData(sql, [id]);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  if (logObj.affectedRows === 0) {
    res.status(400).json({ msg: 'Something went wrong' });
    return;
  }
  res.json(logObj);
});

// POST įrašys naują įrašą į 'logs' db.
logsRoutes.post('/', async (req, res) => {
  const { pet_id, description, status } = req.body;
  const newLogs = [pet_id, description, status];
  const sql = `INSERT INTO logs (pet_id, description, status) VALUES (?, ?, ?)`;
  const [newLogsObj, error] = await dbQueryWithData(sql, newLogs);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  if (newLogsObj.affectedRows === 0) {
    res.status(400).json({ msg: 'Something went wrong' });
    return;
  }
  if (newLogsObj.affectedRows === 1) {
    res.status(201).json({ msg: 'New logs was added' });
    return;
  }
  res.json(newLogsObj);
});

// export routes
module.exports = logsRoutes;
