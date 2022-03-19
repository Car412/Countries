const {Router} = require('express');
const {Country, Activity} = require ('../db');
const axios = require ('axios');

const router = Router();

// 1ero: Agrego la info de la api a la bd
const getApi = async()=>{
try {
    const url = await axios.get('https://restcountries.com/v3/all')
    const apiInfo = url.data.map(el=>{
        return{
            id: el.cca3,
            name: el.name.common,
            flags: el.flags[0],
            continents : el.continents[0],
            capital: el.capital? el.capital[0] : 'capital not found',
            subregion: el.subregion? el.subregion : 'subregion not found',
            area: el.area,
            population: el.population,
        }
    })
    return apiInfo;
} catch (error) {
    console.log(error)
}
}
// busco, sino, creo:

router.get('/', async (req, res)=>{
    const {name} = req.query
    const countriesBD = await Country.findAll()

    try {
        if(!countriesBD.length) {
            let infoCountries = await getApi()
            await Country.bulkCreate(infoCountries)
            const countriesBD = await Country.findAll()

            if (name) {
                let countriesName = countriesBD.filter(c => c.name.toLowerCase().includes(name.toLowerCase()));
                if(countriesName === undefined) {
                    return res.status(404).send('Country not found')
                } else {
                    return res.json(countriesName) 
                }
            } else {
                return res.json(countriesBD) 
            }
        } 
    } catch (error) {
        console.log(error)
    }
})

router.get('/:id', async (req, res)=>{
    const {id} = req.params;
    const countryBD = await Country.findAll({
        include:{
            model: Activity
        }
    })
    try {
        if(id){
            let countryId = countryBD.find(c=> c.id === id);
            if(countryId === undefined){
                return res.status(404).send('Country not found')
            }else{
                return res.json(countryId)
            }
        }
    } catch (error) {
        console.log(error)
    }
})

module.exports = router;

