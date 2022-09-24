import React, { useEffect } from "react";
import { useState } from "react";
import'./Filter.css'
import { filterOrderAction} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
export const Filter=(props)=>{
    const dispatch=useDispatch()
    const typeNames=[]
    props.allTypes.map((m)=>{typeNames.push(m.name)})
    const[allChecked,setAllChecked]=useState(true)    
    const[filterOrder,setFilterOrder]=useState({types:typeNames,
                                               category:0,
                                               name:0}) 
    
    useEffect(()=>{
        dispatch(filterOrderAction(filterOrder))
        
    },[filterOrder])

    const handleInputChange=(e)=>{        
       
       setFilterOrder({...filterOrder,
            [e.target.name]:parseInt(e.target.value,10)
        })

    }

    const typesCheckbox=function(e){        
                if(filterOrder.types.length===20 && allChecked===true){
                    setAllChecked(false)
                    setFilterOrder({
                        ...filterOrder,
                        types:[],
                    })
                    setFilterOrder({
                        ...filterOrder,
                        types:[e.target.name],
                    })
                    
                }
                if(allChecked===false){
                    if (filterOrder.types.includes(e.target.name)) {
                        filterOrder.types = filterOrder.types.filter((name) => name !== e.target.name);
                        setFilterOrder({
                          ...filterOrder,
                          types: filterOrder.types,
                        });
                      } else {
                        setFilterOrder({
                          ...filterOrder,
                          types: [...filterOrder.types, e.target.name],
                        });
                      }
                }
                if(filterOrder.types.length===0 && allChecked===false){
                    setAllChecked(true)
                    setFilterOrder({
                        ...filterOrder,
                        types:typeNames,
                    })   
                }
                
            }
                
    return(
        <div className="container">
            <div className="containerGeneral">
            <h5 className="filterByTitle">FILTER BY</h5>
            <div className="subContainer">
                <h6>TYPES</h6>
                <div  className="types">
                    

                    <div >
                                <input type="checkbox" 
                                id={21} 
                                name='all'
                                readOnly={true}
                                disabled={true}                                
                                checked={allChecked} 
                                value={typeNames}
                                onClick={typesCheckbox}                                
                                />all
                            </div>   
                    {props.allTypes?.map(
                        (t)=>(
                            <div key={t.id}>
                                <input type="checkbox" 
                                id={t.id} 
                                name={t.name} 
                                value={t.id}
                                onClick={typesCheckbox}
                                
                                />{t.name}
                            </div>
                        ))}
                            
                </div>
                
                <div className="categoryContainer" >
                    <h6>CATEGORY</h6>
                    <div className="category">
                        <input 
                        type="radio"
                        name='category' 
                        value={0}  
                        onClick={handleInputChange} 
                        checked={filterOrder.category!==0?false:true}/> All
                    </div >

                    <div className="category">
                        <input 
                        type="radio" 
                        name='category' 
                        value={1} 
                        onClick={handleInputChange} 
                        checked={filterOrder.category!==1?false:true}/> From pokedex  
                    </div>
                    
                    <div className="category">
                        <input 
                        type="radio" 
                        name='category' 
                        value={2}  
                        onClick={handleInputChange} 
                        checked={filterOrder.category!==2?false:true}/> Created by you 
                    </div>
                </div>

            </div>

            <h5>ORDER BY</h5>
            <div className="subContainer">
                <div className="orderNameContainer">
                    <h6>NAME</h6>

                    <div className="order">
                        <input 
                        type="radio"
                        name='name' 
                        value={0} 
                        onClick={handleInputChange} 
                        checked={filterOrder.name!==0?false:true}/> None
                    </div>
                    <div className="order">
                        <input 
                        type="radio" 
                        name='name' 
                        value={1} 
                        onClick={handleInputChange}/> From A-Z
                    </div>

                    <div className="order">
                        <input 
                        type="radio" 
                        name='name' 
                        value={2} 
                        onClick={handleInputChange}/> From Z-A
                    </div>
                </div>
                
            </div>
            </div>
        </div>
    )
}