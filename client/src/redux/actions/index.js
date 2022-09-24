import { GET_TYPES,
   GET_ALL_POKEMONS,
   GET_POKEMON_BY_ID,
   GET_POKEMON_BY_NAME,
   CLEAR,
   FILTER_ORDER,
   MEMORY,
   ALL_ID,
   ALL_NAMES
  } from './typesActions'



  const axios = require('axios')

export  const getTypes=()=>dispatch=>{  
    return axios.get('http://localhost:3001/types')
    .then((json)=>{
       dispatch(
        {type:GET_TYPES , payload:json.data})
    } ).catch((error) => {
      console.log(error)})  
}

export const  getAllPokemons=()=>dispatch=>{
  return axios.get('http://localhost:3001/pokemons')
  .then((data)=>{
    dispatch({type: GET_ALL_POKEMONS, payload:data.data})
  }).catch((error) => {
    console.log(error)})
}

export const  getPokemonByID=(id)=>dispatch=>{
  return axios.get(`http://localhost:3001/pokemons/${id}`)
  .then((data)=>{
    dispatch({type: GET_POKEMON_BY_ID, payload:data.data})
  }).catch((error) => {
    console.log(error)})
}

export const  getAllPokemonByName=(name)=>dispatch=>{
  return axios.get(`http://localhost:3001/pokemons?name=${name}`)
  .then((data)=>{
    console.log(data.data)
    dispatch({type:GET_POKEMON_BY_NAME , payload:data.data})
  }).catch((error) => {
    //console.log(error.response.data)
    dispatch({type:GET_POKEMON_BY_NAME , payload:error.response.data})
  })
}

export const clear=(payload)=>{
  return{ type: CLEAR, payload:payload}
 }

export const filterOrderAction=(object)=>{  
  return{ type:FILTER_ORDER, payload:object} 
}

export const memoryAction=(forget)=>{
  return{ type:MEMORY, payload:forget}
}

export const getAllIdAction=()=>dispatch=>{
  return axios.get('http://localhost:3001/pokemons/id')
  .then((data)=>{
    //console.log(data.data)
    dispatch({type:ALL_ID,  payload:data.data})
  }).catch((error)=>{
    console.log(error)
  })
}

export const getAllNamesAction=()=>dispatch=>{
  return axios.get('http://localhost:3001/pokemons/name')
  .then((data)=>{
    dispatch({type:ALL_NAMES, payload:data.data})
  }).catch((e)=>{console.log(e)})
}