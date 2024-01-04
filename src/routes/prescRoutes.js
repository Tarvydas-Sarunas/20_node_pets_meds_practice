const express = require('express');
const { dbQueryWithData } = require('../helper');
const prescRoutes = express.Router();

// Routes
// GET paims vieno augintinio visus įrašus iš 'prescriptions' db ir apjungs juos su pets ir med lentelėmis.

prescRoutes.get('/petId/:id', async (req, res) => {
  const petId = +req.params.id;
  const sql = `
    SELECT prescriptions.presc_id, prescriptions.comment, prescriptions.timestamp, pets.pets_name, medications.name 
    FROM prescriptions 
    JOIN pets ON pets.pets_id=prescriptions.pet_id 
    JOIN medications ON medications.med_id=prescriptions.med_id 
    WHERE pets.pets_id=?;
  `;

  const [prescriptionsArr, error] = await dbQueryWithData(sql, [petId]);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  res.json(prescriptionsArr);
});

// POST įrašys naują įrašą į 'prescriptions' db.
prescRoutes.post('/', async (req, res) => {
  const { med_id, pet_id, comment } = req.body;
  const newPresc = [med_id, pet_id, comment];
  const sql = `INSERT INTO prescriptions (med_id, pet_id, comment) VALUES (?, ?, ?)`;
  const [prescObj, error] = await dbQueryWithData(sql, newPresc);
  if (error) {
    res.status(500).json({ error: 'Internal server error' });
    return;
  }
  if (prescObj.affectedRows === 0) {
    res.status(400).json({ msg: 'Something went wrong' });
    return;
  }
  if (prescObj.affectedRows === 1) {
    res.status(201).json({ msg: 'New prescription was added' });
    return;
  }
  res.json(prescObj);
});

// export routes
module.exports = prescRoutes;
