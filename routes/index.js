const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

router.get('/', (req, res) =>
  res.render('casino')
);

router.get('/login', (req, res) =>{
  const db = mongoose.connection;
  db.collection('casino').find().toArray((err, result) => {
    res.render('login', {
      stats: result
    })
  })
});


router.put('/win', (req, res) => {
  const db = mongoose.connection;
  db.collection('casino').find().toArray((err, result) => {
    var inc
    inc = result[0].wins + 1;
    let newMoney = result[0].totalMoney + req.body.money;
    db.collection('casino').findOneAndUpdate({name: 'game'}, {
      $set: {
        wins: inc,
        totalMoney: newMoney
      }
    }, {
      sort: {_id: -1},
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })
})

router.put('/loss', (req, res) => {
  const db = mongoose.connection;
  db.collection('casino').find().toArray((err, result) => {
    var dec
    dec = result[0].losses + 1;
    let newMoney = result[0].totalMoney + req.body.money;
    db.collection('casino').findOneAndUpdate({name: 'game'}, {
      $set: {
        losses: dec,
        totalMoney: newMoney
      }
    }, {
      sort: {_id: -1},
    }, (err, result) => {
      if (err) return res.send(err)
      res.send(result)
    })
  })
})

module.exports = router;
