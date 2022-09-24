import {  GET_TYPES,
     GET_ALL_POKEMONS,
     GET_POKEMON_BY_ID,
     GET_POKEMON_BY_NAME,
     CLEAR ,
    FILTER_ORDER,
    MEMORY,
    ALL_ID,
    ALL_NAMES
     } from "../actions/typesActions";
import { FilterOrder } from "../actions/filterHelpers";
const initialState={ allTypes:[], 
    allPokemons:[] ,
    pokemonDetail:{},
    pokemonCard:{},
    allPokemonsCopy:[],
    allPokemonsName:[],
    allPokemonsId:[],
    memory:false}

function rootReducer(state=initialState , action){
    switch(action.type){
        case GET_TYPES:
            return{...state,
                allTypes:action.payload
            }
        case ALL_ID:
            return{...state,
                allPokemonsId:action.payload
            }
        case ALL_NAMES:
            return{...state,
                allPokemonsName:action.payload
            }
        case GET_ALL_POKEMONS:
            return{...state,
                allPokemons:action.payload,
                allPokemonsCopy:action.payload
            }
        case GET_POKEMON_BY_ID:
            return{...state,
                pokemonDetail:action.payload
            }
        case GET_POKEMON_BY_NAME:
            return{...state,
                pokemonCard:action.payload
            }
        case CLEAR:
            return {...state,
                [action.payload]:{}
            }
        case MEMORY:
            return{...state,
                memory:action.payload
            }    
        case FILTER_ORDER:
            const newP=FilterOrder(state.allPokemonsCopy,action.payload)
            //console.log(state.allPokemons)
            return{...state,
                allPokemons:newP
                
            }
       
         
        default: return state
    }
}
export default rootReducer;