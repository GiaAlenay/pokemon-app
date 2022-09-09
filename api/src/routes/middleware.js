const axios = require('axios')
const{Type,Pokemon}=require('../db.js')

const getpokemosApi= async(op,id,name)=>{    
    
        const pokearray=[]
        const pokeApi= await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
        .then( d=>{
            const urlArray=[]
            for(i of d.data.results){
                urlArray.push(i.url)
            }
            return urlArray
        })
        
        for(u of pokeApi){
            const pokemon= await axios.get(u)
            const info=pokemon.data
            pokearray.push({
                id: info.id,
                name: info.name,
                type: info.types.map((t) => {return { name:t.type.name}}),
                front_default: info.sprites.other["official-artwork"].front_default,
                weight: info.weight,
                height:info.height,
                hp:info.stats[0].base_stat,
                attack:info.stats[1].base_stat,
                defense:info.stats[2].base_stat,
                speed:info.stats[5].base_stat,                
            })
        }

        if(op===1){
            const pokeAllArray=[]
            pokearray.map((p)=>{pokeAllArray.push({id:p.id, name:p.name,type:p.type,front_default:p.front_default})})
            const pokeFoundDb=await Pokemon.findAll(
                {
                    attributes: {
                        exclude: ['weight', 'height','hp','attack','defense','speed']
                    },
                    include: [{ model: Type, attributes: ['name']}],
                  }   
            )
            if(pokeFoundDb){pokeAllArray.push(pokeFoundDb)}
            const pokeResponse1=pokeAllArray?pokeAllArray:{error:`Not pokemons to show.`}
                  return pokeResponse1
        }
        if(op===2){
            const pokeFoundArray=pokearray.find(p=>p.id===id)
            const pokeFoundDb = await Pokemon.findOne({
                where: {
                  id: id,
                },
                include: [{ model: Type, attributes: ['name']}],
              });
              const pokeResponse2=(pokeFoundArray)? pokeFoundArray : (pokeFoundDb)? pokeFoundDb:{error:`Pokemon with id "${id}"not found`};
              return pokeResponse2;
        }
        if(op===3){           
           
            const pokeFoundDb = await Pokemon.findOne({
                where: {
                  name: name,
                },
                attributes: {
                    exclude: ['weight', 'height','hp','attack','defense','speed']
                },
                include: [{ model: Type, attributes: ['name']}],
              });
              const obj=pokearray.find(p=>p.name===name) 
              let pokeFound={}           
                        
              const pokeResponse3=(obj)?pokeFound={id:obj.id, name:obj.name,type:obj.type,front_default:obj.front_default}:(pokeFoundDb)?pokeFoundDb:{error:`Pokemon by name ${name} not found`}
            return pokeResponse3
        }
        return pokearray
    
}

module.exports={
    getpokemosApi
}