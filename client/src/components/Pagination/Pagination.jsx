import { useEffect } from "react"
import { useState } from "react"
import'./Pagination.css'
import { Cards } from "../Cards/Cards";

export const Pagination=(props)=>{
    const[numberPages, setnumberPages]=useState([])
    const[pokemonsPerPag,setPokemonsPerPag]=useState([])
    
    const[currentPage, setCurrentPage]=useState(1)
    
    useEffect(()=>{
        setnumberPages([1])
        for (let i = 2; i < (props.allPokemons.length/12)+1; i++) {
        setnumberPages(oldNumbers=>[...oldNumbers,i])
        
        }
    },[props.allPokemons])

    useEffect(()=>{
      onClickHandlerPages(1)  
    
    },[props.allPokemons])

    const onClickHandlerPages=(n)=>{
        setCurrentPage(n)
        setPokemonsPerPag([])
        props.allPokemons.map((p,i)=>{
            if((12*(n-1))<=i && i<=((n*12)-1)){
                setPokemonsPerPag(oldPoke=>[...oldPoke,p])
            }
        })
      
    }


    const prevHandler=(e)=>{
        if(currentPage!==1){
            onClickHandlerPages(currentPage-1)
            console.log('prev')
        }
        
    }

    const nextHandler=(e)=>{
        if(numberPages.length>currentPage){

            onClickHandlerPages(currentPage+1)
            console.log('next')
        }
    }
    return(
        <div className="paginationContainer">
            <div className="upperBtn">
                {currentPage!==1 &&(<button name='prev'
                        className='prevBtn' 
                        onClick={(e)=>prevHandler(e)}
                        >.</button>)}
                {numberPages&& numberPages.map((n,i)=>(               
                        <button key={i} name={n} className={`pageBtn ${currentPage===n&&'current'}`} onClick={(e)=>onClickHandlerPages(n)}>
                            {n}
                        </button>                
                )
                )}
                {numberPages.length>currentPage&&(<button name='next'
                        className='nextBtn'                     
                        onClick={(e)=>nextHandler(e)}
                        >.</button>)}
            </div>
            


            <div className="cards">                        
                <Cards allPokemons={pokemonsPerPag} />
            </div>

            <div className="underBtn">
            {currentPage!==1 &&(<button name='prev'
                        className='prevBtn' 
                        onClick={(e)=>prevHandler(e)}
                        >.</button>)}
                {numberPages&& numberPages.map((n,i)=>(               
                        <button key={i} name={n} className={`pageBtn ${currentPage===n&&'current'}`} onClick={(e)=>onClickHandlerPages(n)}>
                            {n}
                        </button>                
                )
                )}
                {numberPages.length>currentPage&&(<button name='next'
                        className='nextBtn'                     
                        onClick={(e)=>nextHandler(e)}
                        >.</button>)}
            </div>
        </div>
    )
}