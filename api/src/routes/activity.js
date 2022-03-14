const {Router} = require ('express');
const router = Router();
const {Activity, Country} =  require ('../db');

/* POST /activity:
Recibe los datos recolectados desde el formulario controlado de la ruta de creación 
de actividad turística por body
Crea una actividad turística en la base de datos */

router.post('/', async (req, res, next)=>{
    try {
        const {id, name, difficulty, duration, season, countries} = req.body;
        const newActivity = await Activity.create({
            id,
            name,
            difficulty,
            duration,
            season,
        })
        countries.forEach(async (c)=>{
            const activityCountry = await Country.findOne({
                where:{
                    name: c,
                }
            })
            await newActivity.add(activityCountry)
        });
        res.status(200).send('Activity created Successfully')
    } catch (error) {
        next(error);
    }
})

module.exports = router;