import { GET_TYPES, GET_ALL_POKEMONS,GET_POKEMON_BY_ID,GET_POKEMON_BY_NAME } from './typesActions'
const axios = require('axios')

export  const getTypes=()=>dispatch=>{  
    axios.get('http://localhost:3001/types')
    .then((json)=>{
       dispatch(
        {type:GET_TYPES , payload:json.data})
    } ).catch((error) => {
      console.log(error)})  
}

export const  getAllPokemons=()=>dispatch=>{
  axios.get('http://localhost:3001/pokemons')
  .then((data)=>{
    dispatch({type: GET_ALL_POKEMONS, payload:data.data})
  }).catch((error) => {
    console.log(error)})
}

export const  getPokemonByID=(id)=>dispatch=>{
  axios.get(`http://localhost:3001/pokemons/${id}`)
  .then((data)=>{
    dispatch({type: GET_POKEMON_BY_ID, payload:data.data})
  }).catch((error) => {
    console.log(error)})
}

export const  getAllPokemonByName=(name)=>dispatch=>{
  axios.get(`http://localhost:3001/pokemons?name=${name}`)
  .then((data)=>{
    dispatch({type:GET_POKEMON_BY_NAME , payload:data.data})
  }).catch((error) => {
    console.log(error)})
}