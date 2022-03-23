const {Router} = require('express');
const {Country, Activity} = require ('../db'); // los requiero desde la db porque es donde se hace la conexion con sequelize
const axios = require ('axios');
const router = Router();
const {Sequelize, Op} = require ('sequelize');

const getApi = async ()=>{
    try {
        const urlApi = await axios.get("https://restcountries.com/v3/all");
        const dataApi = urlApi.data?.map(async (c)=>{
            try {
                await Country.findOrCreate({
                    where:{
                        id: c.cca3,
                    },
                    defaults:{
                        id: c.cca3,
                        name: c.name.common,
                        flags: c.flags[0],
                        continents: c.continents[0],
                        capital: c.capital? c.capital[0] : 'capital not found',
                        subregion: c.subregion? c.subregion : 'subregion not found',
                        area: c.area,
                        population: c.population,
                    }
                });
                return dataApi;
            } catch (error) {
               console.log(error) 
            }
        });
    } catch (error) {
        console.log(error)
    }
};

router.get("/", async (req, res)=>{
    await getApi();
    const {name} = req.query;
    try {
        if(name){
            const countryName = await Country.findAll({
                where:{
                    name: {[Op.iLike] : `%${name}%`},
                },
                include: Activity,
            });
            countryName.length?
            res.status(200).send(countryName) :
            res.status(404).send('Country not found');
        }else{
            const allCountries = await Country.findAll({
                include: [
                    {
                        model: Activity,
                    }
                ]
            });
            return res.status(200).send(allCountries);
        }
    } catch (error) {   
       console.log(error)
       return res.status(404).send(error) 
    }
});

router.get("/:id", async (req, res)=>{
    await getApi();
    const {id} = req.params;
    try {
        const countryId = await Country.findOne({
            where:{
                id: id.toUpperCase()
            },
            include:{
                model: Activity,
            }
        });
        countryId.length?
        res.status(200).send(countryId) :
        res.status(404).send('Country not found')
    } catch (error) {
        console.log(error)
        return res.status(404).send(error) 
    }
})

module.exports = router;