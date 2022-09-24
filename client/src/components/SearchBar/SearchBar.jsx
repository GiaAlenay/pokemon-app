import React, {  useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPokemonByName ,memoryAction} from "../../redux/actions";
import './SearchBar.css'
import { Card } from "../Card/Card";

export const SearchBar=(props)=>{
    
    const dispatch=useDispatch()
    const [text,setText]=useState('')
    const [textConfirm,setTextConfirm]=useState(false)
    const [suggestions,setSuggestions]=useState([])
    const pokemonCard=useSelector(state=>state.pokemonCard)
    const memory=useSelector(state=>state.memory)
    console.log('searchbar memory'+memory)

    

    const resetCard=(txt,memoryReset,cardexistence)=>{
      //setTextConfirm(cardexistence)
      setText(txt)
      dispatch(memoryAction(memoryReset))
    }
    const onSuggestHandler=(text)=>{
        setText(text)
        setSuggestions([])
        //setTextConfirm(true)
        dispatch(getAllPokemonByName(text.toLowerCase()))
        dispatch(memoryAction(true))
            
    }
    console.log(pokemonCard)

     const handleKeyDown = (event) => {    
       if (event.key === 'Enter') {          
         onSuggestHandler(text)
         event.preventDefault(); 
        }
      };
     
    const onSubmitHandler=(e)=>{
        e.preventDefault();
        onSuggestHandler(text)
    }

    const onChangeHandler=(text)=>{
      let matches=[]
      let short=[]
      if(text.length>0){
          matches=props.allPokemons.filter(poke=>{
              const regex= new RegExp(`${text}`,"gi")
              return poke.name.match(regex)
          })
      }
      matches.map((m,i)=>{if(i<5){short.push(m)}})
      setSuggestions(short)
      setText(text)
  }

    return(
      <div>
          <form  onSubmit={(e)=>{onSubmitHandler(e)}}>
            <button className='lupa' type="submit"><img className='lupaImg'src={'lupa.png'} alt='search Icon'/></button>
            
            <input type='search' className="input" style={{marginTop:10}}
            onChange={e=>onChangeHandler(e.target.value)}
            value={text}
            onKeyDown={(e)=>{handleKeyDown(e)}}
            onBlur={()=>{ setTimeout(()=>{setSuggestions([])},200)}}
            />
            
            <div className='cont'>{suggestions && suggestions.map((su,i)=>(
              <div  key={i} 
              id={suggestions.length===i+1 ?'su':undefined}
              className="suggestion"
              onClick={()=>onSuggestHandler(su.name)}
              >{su.name}
                </div>
            
            ))}
            </div>
          </form>

          <div>
              {pokemonCard && memory &&(
              <div>                        
                  <Card name={pokemonCard.name}
                          id={pokemonCard.id}
                          front_default={pokemonCard.front_default}
                          types={pokemonCard.types}
                          cardOnSearch={memory}
                          resetCard={resetCard}
                           pokemonLoaderName={text}
                          error={pokemonCard.error}
                   />
               </div>)}
           </div>

      </div>
    )
}