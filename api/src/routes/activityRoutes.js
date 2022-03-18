const {Router} = require ('express');
const {createActivity, getActivity} = require ('../controllers/activity.js')

const router = Router();

router.post('/', createActivity);
router.get('/get', getActivity);

module.exports = router;