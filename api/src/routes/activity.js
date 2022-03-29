const {Router} = require('express');
const {Country, Activity} = require ('../db');
const {Sequelize} = require ('sequelize');
const router = Router();

router.post("/", async (req, res)=>{
    try {
        const {name, difficulty, duration, season, countries} = req.body;
        if(name && difficulty && duration && season) {
            const newActivity = await Activity.create({ // creo la act
                name,
                difficulty,
                duration,
                season,
            });
            countries.forEach(async (c)=>{
                const countryActivity = await Country.findOne({ //reviso el arr de countries para ver en cuál se crea la actividad
                    where:{
                        name:c,
                    }
                });
                await newActivity.addCountry(countryActivity);
            });
            res.status(200).send(newActivity);
        }
    } catch (error) {
        console.log(error)
    }
});

router.get('/', async (req,res) => {
    try {
        let activities = await Activity.findAll()
        res.status(200).send(activities)
    } catch (error) {
        console.log(error)
    }
})
  
  module.exports = router;

