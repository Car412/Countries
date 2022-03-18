const axios = require ('axios');
const {Country, Activity}= require ('../db');

const getApi = async()=>{
    const url = await axios.get('https://restcountries.com/v3/all')
    const apiInfo = await url.data.map(el=>{
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

    apiInfo.forEach(c=>{
        Country.findOrCreate({
            where:{
                id: c.id,
                name: c.name,
                flags: c.flags,
                continents: c.continents,
                capital: c.capital,
                subregion: c.subregion,
                area: c.area,
                population: c.population,
            }
        })
    })
    let all= await Country.findAll({
        include:{
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through:{
                attributes:[]
            }
        }
    })
    return all;
};

const getById = async (req, res)=>{
    try {
       const {id} = req.params;
       let countryDetail = await Country.findByPk(id,{
           attributes:['id', 'name', 'flags', 'continents', 'capital', 'subregion', 'area', 'population'],
           include: Activity, 
       }) 
       countryDetail? 
       res.send(countryDetail) :
       res.send('Country not found')
    } catch (error) {
       res.send(error) 
    }
};

const getByName = async (req, res) =>{
    const {name} = req.query;
    const allNames = await getApi();

    if(name){
        let nameCountry = await allNames.filter(c=> c.name.toLowerCase().includes(name.toLowerCase()))
        nameCountry.length?
        res.status(200).send(nameCountry) :
        res.status(404).send('Country noot found')
    }
    return res.send(allNames)
};

module.exports  = {    
    getById,
    getByName,
}









