const express = require('express');
const { dbQueryWithData } = require('../helper');
const petsRoutes = express.Router();

// ROUTES

const tableName = 'pets';
// get / - grazina visus gyvunus
petsRoutes.get('/', async (req, res) => {
  const sql = `SELECT * FROM ${tableName} WHERE isArchived=0`;
  const [petsARR, error] = await dbQueryWithData(sql);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(petsARR);
});

// POST įrašo vieną augintinį į 'pets' db;
petsRoutes.post('/', async (req, res) => {
  const { pets_name, pets_dob, client_email } = req.body;
  const newPets = [pets_name, pets_dob, client_email];
  const sql = `INSERT INTO ${tableName} (pets_name, pets_dob, client_email) VALUES (?, ?, ?)`;
  const [rezObj, error] = await dbQueryWithData(sql, newPets);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  if (rezObj.affectedRows === 0) {
    res.status(400).json({ msg: 'Something went wrong' });
    return;
  }
  if (rezObj.affectedRows === 1) {
    res.status(200).json({ msg: 'New pet was added' });
    return;
  }
  res.json(rezObj);
});

// DELETE pakoreguoja augintinį pagal ID, kuriam 'isArchived' tampa '1' (t.y. true).
petsRoutes.delete('/:id', async (req, res) => {
  const id = +req.params.id;
  const sql = `UPDATE ${tableName} SET isArchived=1 WHERE pets_id=? LIMIT 1`;
  const [rows, error] = await dbQueryWithData(sql, [id]);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  if (rows.affectedRows === 0) {
    res.status(404).json({ msg: 'This id does not exist' });
    return;
  }
  if (rows.affectedRows === 1) {
    res.json({ msg: 'Book deleted' });
    return;
  }
  res.json(rows);
});

// export
module.exports = petsRoutes;
