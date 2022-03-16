const express = require ('express');
const router = express.Router();
const {getById, getByName} = require ('../controllers/country.js');

router.get('/', getByName);
router.get('/:id', getById);

module.exports = router;