import React from "react";


function validate(input){
    let errors={};
    if(!input.name){errors.name='El nombre es requerido'}
    if(!input.id){errors.id='El id es requerido'}
    //validacion para id existente
    //validacion para url difrente a jpg o a gif
    //validacion para checkbox
    //validacion para que peso y altura y id no sean numeros negativos
    return errors
}

export const CreatePokemon=()=>{
    const[input,setinput]=React.useState({name:'',
                                            id: 0,
                                            weight:0,
                                            height:0,
                                            hp:0,
                                            attack:0,
                                            defense:0,
                                            speed:0,
                                            front_default:'',
                                            types:[]
                                        })

    const[errors, setErrors]=React.useState({})
   
    

    const handleInputChange=function(e){
        setinput({...input,[e.target.name]:e.target.value })
        setErrors(validate({...input, [e.target.name]:e.target.value}))
    }
    
    const submit = async (e) => {
        e.preventDefault();
    }

    return(
        <div>
            <form  onSubmit={submit}>
                <div>

                <div>
                <label htmlFor="name">NOMBRE</label>
                <input
                className={errors.name && 'danger'} 
                type="text" 
                name="name" 
                value={input.name} 
                placeholder='ingrese el nombre...'
                onChange={handleInputChange}/>
                
                {errors.name && (<h5 className="danger">{errors.name}</h5>)}
                
                </div>
                
                <div>
                <label htmlFor="id">ID</label>
                <input 
                className={errors.id && 'danger'}
                type="number"
                name="id" 
                placeholder="ingrese el id..."                 
                onChange={handleInputChange}
                />
                {errors.id &&(<h5 className="danger">{errors.id}</h5>)}
                </div>

                </div>

                <div>

                <div>
                <label htmlFor="weight">PESO </label>
                <input type="number" 
                name="weight" 
                
                placeholder='ingrese el peso...'
                onChange={handleInputChange}/>
                </div>
                
                <div>
                <label htmlFor="height">ALTURA</label>
                <input type="number" 
                name="height"
                placeholder="ingrese la altura..." 
                
                onChange={handleInputChange}/>
                </div>

                </div>

                <div>
                    <label>FOTO</label>
                    <input type='url'
                    name="front_default"
                    placeholder='ingresa una url...'
                    onChange={handleInputChange}/>

                </div>
                <img src={input.front_default} alt='tu pokemon'/>
                

                <div>
                    <div>
                        <label>VIDA</label>
                        <input type="range" 
                        min="1" max="120"
                        onChange={handleInputChange} 
                        value={input.hp} 
                        class="slider" 
                        name="hp"/>
                        <label>{input.hp}</label>
                    </div>

                    <div>
                        <label>ATAQUE</label>
                        <input type="range"
                         min="1" max="120" 
                         onChange={handleInputChange}
                         value={input.attack} 
                         class="slider" 
                         name="attack"/>
                         <label>{input.attack}</label>
                    </div>

                    <div>
                        <label>VELOCIDAD</label>
                        <input type="range" 
                        min="1" max="120" 
                        onChange={handleInputChange}
                        value={input.defense} 
                        class="slider"
                         name="defense"/>
                         <label>{input.defense}</label>
                    </div>

                    <div>
                        <label>DEFENSA</label>
                        <input type="range" 
                        min="1" max="120" 
                        onChange={handleInputChange}
                        value={input.speed} 
                        class="slider" 
                        name="speed"/>
                        <label>{input.speed}</label>
                    </div>
                </div>

                <button type="submit">CREAR</button>
            </form>
        </div>
    )
}