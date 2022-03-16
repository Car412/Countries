const axios = require ('axios');
const {Country, Activity}= require ('../db');
const {Op}= require ('sequelize');

//1ero: tarigo la info y la guardo 

async function getInfo (req, res){
    try {
        let urlApi = await axios.get('https://restcountries.com/v3/all');
        urlApi.data.forEach( c=>{
            Country.findOrCreate({
                where:{
                id: c.cca3,
                name: c.name.common,
                flags: c.flags[0],
                continent: c.continents[0],
                capital: c.capital? c.capital[0] : 'capital not found',
                subregion: c.subregion? c.subregion : 'subregion not found',
                area: c.area,
                population: c.population,
            }
            })            
        })
        const infoApi = await Country.findAll({
            include:{
                model:Activity,
                attributes: ['name', 'difficulty', 'duration', 'season'],
                through:{
                    attributes:[]
                }
            }
        })
        return infoApi;
    } catch (error) {
        console.log(error)
    }
}

async function getById (req, res, next){
    const {id} = req.params;
    if(!id){
        return res.status(404).json({message: 'Id required'})
    }
    try {
        const country = await Country.findAll({
            where:{
                id: id,
            },
            include:{
                model: Activity,
                attributes: ['name', 'difficulty', 'duration', 'season'],
                through:{
                    attributes:[]
                }
            }
        })
        res.send(country);
    } catch (error) {
        next(error)
    }
};

async function getByName (req, res){
    const {name} = req.query;
    const info = await getInfo();
    
    if(name){
        let countryName = info.filter(el=> el.name.toLowercase().includes(name.toLowercase()))
        countryName.length?
        res.status(200).send(countryName) :
        res.status(404).send("Country doesn't exists");
    }else{
        res.status(200).send(info);
    }
};


module.exports  = {
    getInfo,
    getById,
    getByName,
}









