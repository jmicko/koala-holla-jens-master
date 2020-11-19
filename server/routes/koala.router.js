const express = require('express');
const koalaRouter = express.Router();

// DB CONNECTION


// GET


// POST


// PUT
router.put('/:koalaId', (req, res) => {
    let id = req.params.koalaId;
    let transfer = req.body.transfer;
    console.log(`Updating koala with id=${id} transfer status to ${transfer}`);
    let sqlText = ``;
    if (transfer.toLowerCase() === 'y'){
        sqlText = `UPDATE koala SET transfer='Y' WHERE id=$1;`
    } 
    pool.query( sqlText, [id] )
        .then( (result) => {
            res.sendStatus(200);
        })
        .catch( (error) => {
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
module.exports = koalaRouter;