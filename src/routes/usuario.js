const express = require('express');
const router = express.Router();

const mysqlConnection  = require('../database.js');

// GET all usuarios
router.get('/', (req, res) => {
  mysqlConnection.query('SELECT * FROM usuario', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

// GET An usuario
router.get('/:id', (req, res) => {
  const { id } = req.params; 
  mysqlConnection.query('SELECT * FROM usuario WHERE id = ?', [id], (err, rows, fields) => {
    if (!err) {
      res.json(rows[0]);
    } else {
      console.log(err);
    }
  });
});

// DELETE An usuario
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  mysqlConnection.query('DELETE FROM usuario WHERE id = ?', [id], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'usuario Deleted'});
    } else {
      console.log(err);
    }
  });
});

// INSERT An usuario
router.post('/', (req, res) => {
  const {id, name, correo} = req.body;
  console.log(id, name, correo);
  const query = `
    SET @id = ?;
    SET @nombre = ?;
    SET @correo = ?;
    CALL usuarioAddOrEdit(@id, @name, @correo);
  `;
  mysqlConnection.query(query, [id, name, correo], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'usuariod Saved'});
    } else {
      console.log(err);
    }
  });

});

router.put('/:id', (req, res) => {
  const { name, correo } = req.body;
  const { id } = req.params;
  const query = `
    SET @id = ?;
    SET @name = ?;
    SET @correo = ?;
    CALL usuarioAddOrEdit(@id, @name, @correo);
  `;
  mysqlConnection.query(query, [id, name, correo], (err, rows, fields) => {
    if(!err) {
      res.json({status: 'usuario Updated'});
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
