const {Activity, Country} =  require ('../db');

const createActivity = async (req, res)=>{
    const {name, difficulty, duration, season, countries} = req.body;
    try {
       const newActivity= await Activity.create({
            name,
            difficulty,
            duration,
            season,
       }) 
       countries?.forEach(async (c)=>{
           const country = await Country.findOne({
               where:{
                   name:c,
               }
           })
           await newActivity.addCountry(country)
       });
       res.status(200).send('Activity created')
    } catch (error) {
        res.send(error)
    }

};

const getActivity = async (req, res)=>{
    try {
        const db = await Activity.findAll({
            attributes: ['name'],
            include: Country,
        }) 
        res.send(db)
    } catch (error) {
        res.send(error)
    }
}

module.exports ={
    createActivity,
    getActivity,
}