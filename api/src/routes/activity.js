const {Router} = require('express');
const {Country, Activity} = require ('../db');

const router = Router();

router.get('/', async (req, res)=>{
    try {
        let getActivities = await Activity.findAll({
            include: Country,
        });
        return res.status(200).json(getActivities)
    } catch (error) {
       console.log(error) 
    }
});

router.post('/', async (req, res)=>{
    try {
        const {name, difficulty, duration, season, countries} = req.body;
        let createActivity = await Activity.create({
            name,
            difficulty,
            duration,
            season,
        })
        countries.forEach(async (c)=>{
            let countryAct= await Country.findOne({
                where:{
                    name: c,
                }
            })
            await createActivity.addCountry(countryAct)
        });
        res.status(200).send('Activity created')
    } catch (error) {
        console.log(error)
    }
});


module.exports = router;