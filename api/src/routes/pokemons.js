const {Router, application}=require('express')
const axios = require('axios')
const { getpokemosApi } =require('./middleware.js') ;
const router = Router();
const{Op,Pokemon ,Type}=require('../db.js')

// router.get('/', async(req,res)=>{
    
    
//     res.json({error: "error on query request"})
// })

// [ ] GET /pokemons:
// Obtener un listado de los pokemons desde pokeapi.
// Debe devolver solo los datos necesarios para la ruta principal

router.get('/' ,async(req , res )=>{
    const {name}=req.query
    if(name){
        const op=3;
        
        const pokeByName= await getpokemosApi(op,null,name)
        return res.json(pokeByName)
    }
    const op=1;
    const allPokemons=await getpokemosApi(op)
    
    return res.json(allPokemons)
 
})

// [ ] POST /pokemons:
// Recibe los datos recolectados desde el formulario controlado
//  de la ruta de creación de pokemons por body
// Crea un pokemon en la base de datos relacionado con sus tipos.
router.post('/',async(req,res)=>{
    let{name, id, weight, height, hp, attack, defense ,speed ,front_default ,types}=req.body;
    if(name && id){
        const findPokemonName= await Pokemon.findOne({where:{name:name}})
        const findPokemonId=await Pokemon.findByPk(id)

       if(findPokemonName){return res.json({error:`Pokemon with name "${name}" already exists.`})}
       if(findPokemonId){return res.json({error:`Pokemon with id "${id}" already exists.`})}

    }
    if(!name || ! id){return res.json({error:'Incomplete information.'})}

    try{
        const newPokemon= await Pokemon.create({name:name.toLowerCase(),id, weight, height, hp, attack, defense ,speed ,front_default })
        const PokeTypes= await Type.findAll()
        if (types.length===0)types=[Math.floor(Math.random() * (PokeTypes.length))]
        await newPokemon.setTypes(await types)
        return res.send('Pokemon created successfully.' )
    }catch(error){
        return res.status(404).json({error:error})
    }
})


// GET /pokemons/{idPokemon}:
// Obtener el detalle de un pokemon en particular
// Debe traer solo los datos pedidos en la ruta de detalle de pokemon
// Tener en cuenta que tiene que funcionar tanto para un id de un pokemon 
// existente en pokeapi o uno creado por ustedes

router.get('/:id',async(req,res)=>{
    let{id}=req.params
    id=parseInt(id,10)
    const op=2;
    if(id){
        const pokeById= await getpokemosApi(op,id)
        res.json(pokeById)
    }
})

// [ ] GET /pokemons?name="...":
// Obtener el pokemon que coincida exactamente con el nombre pasado como
//  query parameter (Puede ser de pokeapi o creado por nosotros)
// Si no existe ningún pokemon mostrar un mensaje adecuado



module.exports = router;
