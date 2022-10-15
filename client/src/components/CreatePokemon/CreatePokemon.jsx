import React from "react";
import { getTypes ,getAllIdAction,getAllNamesAction} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import {Nav} from '../Nav/Nav'
import'./CreatePokemon.css'
const axios = require('axios')

function Validate(input,allName,allID){
   
    let errors={};
    const inputNameArray=input.name.split('')    
    const foundName=allName.find(f=>f===input.name)
    const foundId=allID.find(f=>f===input.id)
    const foundSpace=inputNameArray.find(f=>f.charCodeAt(0)===32)
    const foundSpecial=inputNameArray.find(f=>f.charCodeAt(0)<65 || f.charCodeAt(0)>122 || f.charCodeAt(0)===91||f.charCodeAt(0)===92||f.charCodeAt(0)===93||f.charCodeAt(0)===94||f.charCodeAt(0)===95||f.charCodeAt(0)===96)    
    
    if(!input.name){errors.name='Name is required'}
    if(foundName){errors.name='Name already exists'}
    if(foundSpace){errors.name='Space detected'}
    if(foundSpecial){errors.name='Special character'}
    if(input.name.length>12){errors.name='Name is too long'}
    
    

    if(!input.id){errors.id='Id is required'} 
    if(foundId){errors.id='Id already exists'}
    if(input.id<0){errors.id='Id can not be a negative number'}    
    
    if(input.weight<=0 || !input.weight){errors.weight='Weight can not be null or a negative number'}
    if(input.weight>1000){errors.weight='Weight can have a max value of 1000 kg'}

    if(input.height<=0 || !input.height){errors.height='Heigth can not be null or anegative number'}
    if(input.height>20){errors.height='Heigth can have a max value of 20 meters'}

    if(!input.front_default.match(/\.(jpeg|jpg|gif|png)$/)){errors.front_default='Url not valid'}
    
    return errors
}

export const CreatePokemon=()=>{
    const defaultImg='https://www.pngkey.com/png/full/909-9099235_camera-icon-neg-circle.png'
    const[input,setinput]=React.useState({name:'',
                                            id: '',
                                            weight:'',
                                            height:'',
                                            hp:60,
                                            attack:60,
                                            defense:60,
                                            speed:60,
                                            front_default:'',
                                            types:[]
                                        })

    const[errors, setErrors]=React.useState({})
    const[current,setcurrent]=React.useState(1)
    const typeOptions=useSelector(state=> state.allTypes)
    const allID=useSelector(state=>state.allPokemonsId)
    const allName=useSelector(state=>state.allPokemonsName)
    const dispatch=useDispatch()
    let noAccess=`You can't continue until you finished this part successfully`
    
    useEffect(() => {
        dispatch(getTypes())
        dispatch(getAllIdAction())
        dispatch(getAllNamesAction())
        setErrors({random:'error random'})
        
    }, [])

    

    const handleInputChangeNumb= async function(e){
        
        setinput({...input,
                [e.target.name]:parseInt(e.target.value,10) })
        setErrors(Validate({...input,
             [e.target.name]:parseInt(e.target.value,10)},allName,allID))
    }

    const handleInputChange=function(e){
        if(e.target.name==='name'){
            setinput({...input,
                [e.target.name]:e.target.value.toLowerCase() })       
        }if(e.target.name==='front_default'){
            setinput({...input,
                [e.target.name]:e.target.value })    
        }
           
        
        setErrors(Validate({...input,
             [e.target.name]:e.target.value},allName,allID))
    }
    
    const typesCheckbox=function(e){        
                
        if (input.types.includes(parseInt(e.target.value,10))) {
            input.types = input.types.filter((id) => id !== parseInt(e.target.value,10));
            setinput({
              ...input,
              types: input.types,
            });
          } else {
            setinput({
              ...input,
              types: [...input.types, parseInt(e.target.value,10)],
            });
          }
    }
    
    const handleBtnNextPrev=(e)=>{
        noAccess=''
        if(e.target.name==='prev' ){
            if(current!==1){
                setcurrent(current-1)
            }
        }
        if(e.target.name==='next'){
            if(current<7){
                setcurrent(current+1)
            }
        }
       
    }
    
    let isEmpty = Object.entries(errors).length === 0;
    
    const submit = async (e) => {
        e.preventDefault();
         const comprobar = await axios.post('http://localhost:3001/pokemons', input)
         .then(d=> {return "Pokemon created successfully."})
         .catch(e=> {return "we could not complete your request , try again later :("})
            alert(comprobar)
        setinput({name:'',
        id: '',
        weight:'',
        height:'',
        hp:60,
        attack:60,
        defense:60,
        speed:60,
        front_default:'',
        types:[]
        })
        setErrors({random:'error random'})
        window.location.reload()
        
    }

    return(
        <div className="createPokemon">
            <Nav/>
            <form  onSubmit={submit}>
                <div className="formCreatePokemon">
                    {current===1 &&(
                        <div className="currentCreatePag">
                        <div>
                            <h1 className="doYou">DO YOU WANT TO CREATE
                                YOUR OWN 
                                POKEMON?</h1>
                            <h2 className="letsStart">LETS START!</h2>
                            <button 
                                type="button"
                                name='next'
                                onClick={(e)=>{handleBtnNextPrev(e)}}
                                className="btnNext1">
                            NEXT</button>
                        </div>

                        <div>
                            <img className="createFirstImg" alt='pokemons' src='cre.png'/>
                        </div>
                    </div>
                    )}
                    {current===2 &&(
                        <div className="currentCreatePag selectedImg">
                            <div>
                                <img className="imgSlct" src={input.front_default.length===0?defaultImg:input.front_default} alt='your pokemon'/>
                            </div>
                            <div className="blurBackPart">
                                <h1 className="showUs">SHOW US HOW IS YOUR POKEMON GOING TO LOOK:</h1>
                                <input type='url'
                                className={`inpt inputUrl `}
                                name="front_default"
                                placeholder='url...'
                                value={input.front_default}
                                onChange={handleInputChange}/>
                                {errors.front_default && (<div className="danger">{errors.front_default}</div>)}
                                <div>
                                    <button
                                        type="button"
                                        name='prev' 
                                        className="btnC Prev"
                                        onClick={(e)=>{handleBtnNextPrev(e)}}
                                    >PREV</button>
                                    
                                    <button 
                                        type="button"
                                        disabled={errors.front_default || input.front_default===''?true:false}
                                        className="btnC Next"
                                        name='next'
                                        onClick={(e)=>{handleBtnNextPrev(e)} }
                                    >NEXT</button>
                                    
                                </div>
                            </div>
                            
                        </div>
                    )}

                    {current===3 &&(
                        <div className="currentCreatePag nameIdCont">
                            <div htmlFor="name">
                                <h1 className="whatsNa">What's your pokemons name?</h1>
                                <input
                                className={`inpt inputNaId`} 
                                type="text" 
                                name="name" 
                                value={input.name} 
                                placeholder='name...'
                                onChange={handleInputChange}/>
                                
                                {errors.name && (<div className="danger">{errors.name}</div>)}
                                
                                <h2 className="whatsId">Let's give them an Id</h2>
                                <input 
                                className={`inpt inputNaId `}
                                value={input.id}
                                type="number"
                                name="id" 
                                placeholder="id..."                 
                                onChange={handleInputChangeNumb}
                                />
                                {errors.id &&(<div className="danger">{errors.id}</div>)}

                                
                                <div>
                                        <button
                                            type="button"
                                            name='prev' 
                                            className="btnC Prev"
                                            onClick={(e)=>{handleBtnNextPrev(e)}}
                                        >PREV</button>
                                        
                                        <button 
                                            type="button"
                                            className="btnC Next"
                                            name='next'
                                            onClick={(e)=>{handleBtnNextPrev(e)}}
                                        >NEXT</button>
                                </div>
                            </div>

                            <div>
                                <img src={input.front_default} alt='your pokemon' className="imgSlct imgMov" ></img>
                            </div>

                    </div>    
                    )}

                    {current===4 &&(
                         <div className="currentCreatePag weigthHeigthCont">
                            <div>
                                <h1 className="tellMore">Tell us more about {input.name}:</h1>
                                <input 
                                className={`inpt inputWeHe `}
                                type="number"
                                step="any" 
                                name="weight"
                                value={input.weight}                 
                                placeholder={'weigth...'}
                                onChange={handleInputChangeNumb}/>kg

                                {errors.weight && (<div className="danger">{errors.weight}</div>)}

                                
                                <input 
                                className={`inpt inputWeHe`}
                                type="number" 
                                value={input.height}
                                name="height"
                                placeholder="height..."                         
                                onChange={handleInputChangeNumb}/> m
                                {errors.height && (<div className="danger">{errors.height}</div>)}

                                <div>
                                        <button
                                            type="button"
                                            name='prev' 
                                            className="btnC Prev"
                                            onClick={(e)=>{handleBtnNextPrev(e)}}
                                        >PREV</button>
                                        
                                        <button 
                                            type="button"
                                            className="btnC Next"
                                            name='next'
                                            onClick={(e)=>{handleBtnNextPrev(e)}}
                                        >NEXT</button>
                                </div>

                            </div>
                            
                            <div>
                                <div className="lookNaId"><span>{input.name} {input.id}</span></div>
                                <img src={input.front_default} alt='your pokemon' className="imgSlct imgMov" ></img>
                            </div>
                        </div> 
                    )}

                    {current=== 5 &&(
                        <div className="currentCreatePag typesCont">
                                                        
                            <div>
                                <div className="lookNaId"><span>{input.name} {input.id}</span></div>
                                <img src={input.front_default} alt='your pokemon' className="imgSlct imgMov" ></img>
                            </div>

                            <div className="checksPartCont">
                                <h1 className="whatType">What type of pokemon will {input.name} be?</h1>
                                <div className="checkboxInputs">
                                {typeOptions?.map((t)=>(
                                    <div key={t.id}>
                                        <input type="checkbox" 
                                        id={t.id} 
                                        name={t.name} 
                                        value={t.id}                        
                                        onChange={typesCheckbox} 
                                        />{t.name}
                                    </div>
                                ))}
                                </div>

                                <div>
                                        <button
                                            type="button"
                                            name='prev' 
                                            className="btnC Prev"
                                            onClick={(e)=>{handleBtnNextPrev(e)}}
                                        >PREV</button>
                                        
                                        <button 
                                            type="button"
                                            className="btnC Next"
                                            name='next'
                                            onClick={(e)=>{handleBtnNextPrev(e)}}
                                        >NEXT</button>
                                </div>

                            </div>
                        </div> 
                        
                    )}

                    {current=== 6 &&(
                      <div className="currentCreatePag">
                        <div>
                                <h1 className="moreCharact">Let's give {input.name} more characteristics:</h1>
                                <div className="hpCont">
                                    <div>HP </div>
                                    <input type="range" 
                                    min="1" max="120"
                                    onChange={handleInputChangeNumb} 
                                    value={input.hp} 
                                    className="slider" 
                                    name="hp"/>
                                    <label>{input.hp}</label>
                                </div>

                                <div className="attackCont">
                                    <div>ATTACK </div>
                                    <input type="range"
                                    min="1" max="120" 
                                    onChange={handleInputChangeNumb}
                                    value={input.attack} 
                                    className="slider" 
                                    name="attack"/>
                                    <label>{input.attack}</label>
                                </div>

                                <div className="defenseCont">
                                    <div>DEFENSE </div>
                                    <input type="range" 
                                    min="1" max="120" 
                                    onChange={handleInputChangeNumb}
                                    value={input.defense} 
                                    className="slider"
                                    name="defense"/>
                                    <label>{input.defense}</label>
                                </div>

                                <div className="speedCont">
                                    <div>SPEED </div>
                                    <input type="range" 
                                    min="1" max="120" 
                                    onChange={handleInputChangeNumb}
                                    value={input.speed} 
                                    className="slider" 
                                    name="speed"/>
                                    <label>{input.speed}</label>
                                </div>
                                    
                                <div className="btnCreate">
                                    <button className="btnCreatFinal" type="submit" disabled={isEmpty?false:true}>CREATE</button>
                                </div>
                        </div>

                        <div>
                                <div className="lookNaId"><span>{input.name} {input.id}</span></div>
                                <img src={input.front_default} alt='your pokemon' className="imgSlct imgMov" ></img>
                        </div>

                      </div>  
                    )}

                    {current=== 7 &&(
                        <div>Congratulation</div>
                    )}
                   
                </div>
            </form>
        </div>
    )
}