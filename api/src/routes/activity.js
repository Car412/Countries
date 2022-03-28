const {Router} = require('express');
const {Country, Activity} = require ('../db');
const {Sequelize} = require ('sequelize');
const router = Router();

router.post("/activity", async (req, res)=>{
    try {
        const {name, difficulty, duration, season, countries} = req.body;
        if(name && difficulty && duration && season) {
            const newActivity = await Activity.create({
                name,
                difficulty,
                duration,
                season,
            });
            countries.forEach(async (c)=>{
                const dbCountry = await Country.findOne({
                    where:{
                        id:c,
                    }
                });
                await newActivity.addCountry(dbCountry);
            });
            res.status(200).send(newActivity);
        }
    } catch (error) {
        console.log(error)
    }
});

router.get("/", async (req, res) => {
    let activities = [];
    return Activity.findAll()
      .then((act) => {
        act.forEach((a) => activities.push(a.name));
        res.send(activities);
      })
      .catch((error) => {
        res.status(404).send(error);
      });
  });
  
  module.exports = router;

