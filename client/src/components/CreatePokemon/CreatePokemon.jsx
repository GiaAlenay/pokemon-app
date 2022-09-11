import React from "react";
import { getTypes , getAllPokemons} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
const axios = require('axios')

function validate(input,idNameArray){
    let errors={};
        
    if(!input.name){errors.name='Name is required'}
    
    if(!input.id){errors.id='Id is required'} 
    
    if(input.id<0){errors.id='Id can not be a negative number'}    
    

    if(input.weight<=0 || !input.weight===NaN){errors.weight='Weight can not be null or a negative number'}
    if(input.weight>1000){errors.weight='Weight can have a max value of 1000 kg'}

    if(input.height<=0 || !input.height){errors.height='Heigth can not be null or anegative number'}
    if(input.height>20){errors.height='Heigth can have a max value of 20 meters'}

    if(!input.front_default.match(/\.(jpeg|jpg|gif|png)$/)){errors.front_default='Url not valid'}
    
    //verificcar id no existente 
    //verificar nombre no existente
    
    return errors
}

export const CreatePokemon=()=>{
    const defaultImg='https://st.depositphotos.com/1987177/3470/v/600/depositphotos_34700099-stock-illustration-no-photo-available-or-missing.jpg'
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
    const typeOptions=useSelector(state=> state.allTypes)
    const allPokemons=useSelector(state=>state.allPokemons)
    let concidencias=[]
    allPokemons.map(p=>{concidencias.push({id:p.id,name:p.name})})
    const dispatch=useDispatch()
    
    useEffect(() => {
        dispatch(getTypes())
        dispatch(getAllPokemons())
        setErrors({random:'error random'})
        
     }, [])

    const handleInputChangeNumb= async function(e){
        
        setinput({...input,
                [e.target.name]:parseInt(e.target.value,10) })
        setErrors(validate({...input,
             [e.target.name]:e.target.value},allPokemons))
    }

    const handleInputChange=function(e){
        setinput({...input,
                [e.target.name]:e.target.value })       

        setErrors(validate({...input,
             [e.target.name]:e.target.value}))
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
        <div>
            <form  onSubmit={submit}>
                <div>

                    <div>
                        <label htmlFor="name">NAME </label>
                        <input
                        className={errors.name && 'danger'} 
                        type="text" 
                        name="name" 
                        value={input.name} 
                        placeholder='name...'
                        onChange={handleInputChange}/>
                        
                        {errors.name && (<h5 className="danger">{errors.name}</h5>)}
                        
                    </div>
                
                    <div>
                        <label htmlFor="id">ID </label>
                        <input 
                        className={errors.id && 'danger'}
                        value={input.id}
                        type="number"
                        name="id" 
                        placeholder="id..."                 
                        onChange={handleInputChangeNumb}
                        />
                        {errors.id &&(<h5 className="danger">{errors.id}</h5>)}
                    </div>

                </div>

                <div>

                    <div>
                        <label htmlFor="weight">WEIGTH </label>
                        <input 
                        className={errors.weight && 'danger'}
                        type="number" 
                        name="weight"
                        value={input.weight}                 
                        placeholder={'weigth...'}
                        onChange={handleInputChangeNumb}/>kg

                        {errors.weight && (<h5 className="danger">{errors.weight}</h5>)}

                    </div>
                
                    <div>
                        <label htmlFor="height">HEIGHT </label>
                        <input 
                        className={errors.height && 'danger'}
                        type="number" 
                        value={input.height}
                        name="height"
                        placeholder="height..."                         
                        onChange={handleInputChangeNumb}/> m
                        {errors.height && (<h5 className="danger">{errors.height}</h5>)}
                    </div>

                </div>

                <div>
                    <label>PHOTO</label>
                    <input type='url'
                    className={errors.front_default && 'danger'}
                    name="front_default"
                    placeholder='url...'
                    value={input.front_default}
                    onChange={handleInputChange}/>
                    {errors.front_default && (<h5 className="danger">{errors.front_default}</h5>)}
                </div>
                <img src={input.front_default.length===0?defaultImg:input.front_default} alt='your pokemon'/>

                <hr/>

                <div className="checkboxInputs">
                    <label>Choose your pokemon's types: </label>
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
                
                <hr/>

                <div>
                    <div>
                        <label>HP </label>
                        <input type="range" 
                        min="1" max="120"
                        onChange={handleInputChangeNumb} 
                        value={input.hp} 
                        class="slider" 
                        name="hp"/>
                        <label>{input.hp}</label>
                    </div>

                    <div>
                        <label>ATTACK </label>
                        <input type="range"
                         min="1" max="120" 
                         onChange={handleInputChangeNumb}
                         value={input.attack} 
                         class="slider" 
                         name="attack"/>
                         <label>{input.attack}</label>
                    </div>

                    <div>
                        <label>DEFENSE </label>
                        <input type="range" 
                        min="1" max="120" 
                        onChange={handleInputChangeNumb}
                        value={input.defense} 
                        class="slider"
                         name="defense"/>
                         <label>{input.defense}</label>
                    </div>

                    <div>
                        <label>SPEED </label>
                        <input type="range" 
                        min="1" max="120" 
                        onChange={handleInputChangeNumb}
                        value={input.speed} 
                        class="slider" 
                        name="speed"/>
                        <label>{input.speed}</label>
                    </div>
                </div>

                <button type="submit" disabled={isEmpty?false:true}>CREATE</button>
            </form>
        </div>
    )
}