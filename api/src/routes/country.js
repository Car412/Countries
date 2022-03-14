const {Router}= require ('express');
const axios = require ('axios');
const {Country, Activity}= require ('../db');
const Sequelize = require ('sequelize');
const router = Router();

/* GET /countries
En una primera instancia deberán traer todos los países desde restcountries y guardarlos
en su propia base de datos y luego ya utilizarlos desde allí */

router.get('/', async (req, res)=>{
    try {
        const apiInfo = await axios.get('https://restcountries.com/v3/all');
        await apiInfo.data.forEach(el=>{
            Country.findOrCreate({
                where:{
                    id: el.cca3,
                    name: el.name,
                    flags: el.flags,
                    continent: el.continent,
                    capital: country.hasOwnProperty('capital')? country.capital[0] :'none',
                    subregion: el.subregion,
                    area: el.area,
                    population: el.population,
                }
            })
        })
    } catch (error) {
        res.status(404).json({error})
    }    
})

/* GET /countries/{idPais}:
Obtener el detalle de un país en particular
Debe traer solo los datos pedidos en la ruta de detalle de país
Incluir los datos de las actividades turísticas correspondientes */

router.get('/countries/:id', async (req, res)=>{
    const {id}= req.params;
    const countryDetail = await Country.findByPk(id, {
        include: Activity,
    });
    res.json(countryDetail);
});

/* GET /countries?name="...":
Obtener los países que coincidan con el nombre pasado como query parameter 
(No necesariamente tiene que ser una matcheo exacto)
Si no existe ningún país mostrar un mensaje adecuado */

router.get('/countries', async (req, res)=>{
    const {name} = req.query;
    
    if(name){
        let country = allCountries.filter(el=> el.name.toLowerCase().includes(name.toLocaleLowerCase()))
        country.length?
        res.status(200).send(country) : 
        res.status(404).send('Country not found')
    } else{
        res.status(200).send(countryName)
    }
})

module.exports  = router;









