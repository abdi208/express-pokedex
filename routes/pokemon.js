var express = require('express');
var router = express.Router();
const axios = require('axios');

const db = require('../models')
// GET /pokemon - return a page with favorited Pokemon
router.get('/', function(req, res) {
  // TODO: Get all records from the DB and render to view
  db.pokemon.findAll()
  .then(function(pokemonfaves){
    // console.log('Found:', pokemon.name)
    res.render('faves', {faves: pokemonfaves})
  })
});

// POST /pokemon - receive the name of a pokemon and add it to the database
router.post('/', function(req, res) {
  // TODO: Get form data and add a new record to DB
  db.pokemon.findOrCreate({
    where: {
      name: req.body.name
    }
  }).then(function([pokemon, created]){
    console.log(`${pokemon.name}  is ${created ? 'now in my faves':'already a fave'}`)
    res.redirect('/pokemon')
  })
  
});

router.get('/:id', function(req, res) {
  db.pokemon.findOrCreate({
    where: {
      id : req.params.id
    }
  })
  .then(function(foundpokeid) {
      res.render('show', {favesid: foundpokeid})
    
  })
})
module.exports = router;
