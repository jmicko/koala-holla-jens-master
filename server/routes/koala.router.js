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
router.post('/', (req, res) => {
    let newKoala = req.body;
    console.log('Adding new Koala to table...', newKoala);
    let sqlText = `INSERT INTO koala (name, gender, age, transfer, notes)
                    VALUES ($1, $2, $3, $4,	$5);`;
    pool.query(sqlText, [newKoala.name, newKoala.gender, newKoala.age, newKoala.transfer, newKoala.notes])
        .then(result => {
            res.sendStatus(200);
        }).catch(error => {
            console.log(`Error adding new koala`, error);
            res.sendStatus(500);
        });
})

// PUT
router.put('/:koalaId', (req, res) => {
    let id = req.params.koalaId;
    let transfer = req.body.transfer;
    console.log(transfer);
    // if (transfer.toLowerCase() != 'true' || transfer.toLowerCase() != 'false') {
    // };
    console.log(`Updating koala with id=${id} transfer status to ${transfer}`);
    let sqlText = ``;
    if (transfer.toLowerCase() === 'true') {
        sqlText = `UPDATE koala SET transfer='false' WHERE id=$1;`;

    } else {
        sqlText = `UPDATE koala SET transfer='true' WHERE id=$1;`;
    }
    pool.query(sqlText, [id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.log('Error from db:', error);
            res.sendStatus(500);
        })
});

// DELETE
router.delete('/:koalaId', (req, res) => {
    let id = req.params.koalaId;
    let sqlText = `DELETE FROM koala WHERE id=$1;`;
    pool.query(sqlText, [id])
        .then((result) => {
            res.sendStatus(200);
        })
        .catch((error) => {
            console.error('Error from db: ', error);
            res.sendStatus(500);
        })
})

module.exports = router;