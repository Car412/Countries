const {Activity, Country} =  require ('../db');

async function createActivity(req, res, next){
    const {id, name, difficulty, duration, season} = req.body;
    try {
       const newActivity= await Activity.create({
            id,
            name,
            difficulty,
            duration,
            season,
       }) 

       const country = await  Country.findAll({
        where:{id: id,}
       })
       newActivity.addCountries(country);
       res.send({message: 'Activity created'})
    } catch (error) {
        next(error);
    }

};

module.exports ={
    createActivity,
}