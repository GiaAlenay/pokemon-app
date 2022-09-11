import {  GET_TYPES, GET_ALL_POKEMONS,GET_POKEMON_BY_ID,GET_POKEMON_BY_NAME  } from "../actions/typesActions";

const initialState={ allTypes:[], allPokemons:[] ,pokemonDetail:{},pokemonCard:{}}

function rootReducer(state=initialState , action){
    switch(action.type){
        case GET_TYPES:
            return{...state,
                allTypes:action.payload
            }
        case GET_ALL_POKEMONS:
            return{...state,
                allPokemons:action.payload
            }
        case GET_POKEMON_BY_ID:
            return{...state,
                pokemonDetail:action.payload
            }
        case GET_POKEMON_BY_NAME:
            return{
                pokemonCard:action.payload
            }    
        default: return state
    }
}
export default rootReducer;