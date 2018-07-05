var express = require('express');
var router = express.Router();

const environment = process.env.NODE_ENV || "development";
const knexConfig = require("../knexfile.js")[environment];
const knex = require("knex")(knexConfig);

/* GET home page. */
router.get('/', (req, res, next) => {
  knex('todos')
  .then(todos => {
    res.send(todos);
  })
});

router.post("/", (req, res, next) => {
  knex('todos')
    .insert({ ...req.body})
    .then(() => {
      knex('todos')
        .then(todos => res.json(todos))
    })
    .catch(error => { console.error(error); });
});

router.patch('/:id', (req, res, next) => {
  knex('todos')
  .update(req.body)
  .where('id', req.params.id)
  .then(() => {
    knex('todos')
    .then(todos => rers.json(todos))
  })
  .catch(error => { console.error(error); })
})

router.delete('/:id', (req, res, next) => {
  knex('todos').del().where('id', req.params.id)
  .then(() => {
    knex('todos').then(todos => res.json(todos))
  })
  .catch(error => { console.error(error); })
})

module.exports = router;