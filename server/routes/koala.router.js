
const express = require('express');
const router = express.Router();

// DB CONNECTION
const pool = require('../modules/pool');

// GET
router.get('/', (req, res) => {
    let sqlText = `SELECT * FROM koala;`;
    pool.query(sqlText)
        .then(result => {
            res.send(result.rows);
        }).catch(error => {
            console.log('error getting books', error);
            res.sendStatus(500);
        });
})

// POST


// PUT


// DELETE

module.exports = router;