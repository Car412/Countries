const Router = require ('express');
const {getById, getByName} = require ('../controllers/country.js');

const router = Router();

router.get('/', getByName);
router.get('/:id', getById);

module.exports = router;