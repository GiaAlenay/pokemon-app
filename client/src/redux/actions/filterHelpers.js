const allPokemons=[
    {
        id: 1,
        name: "bulbasaur",
        attack:10,
        types: [
            {
                name: "grass"
            },
            {
                name: "poison"
            }
        ],
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/1.png"
    },
    {
        id: 2,
        name: "ivysaur",
        attack:14,
        types: [
            {
                "name": "grass"
            },
            {
                "name": "poison"
            }
        ],
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/2.png"
    },
    {
        id: 3,
        name: "venusaur",
        attack:1,
        types: [
            {
                name: "grass"
            },
            {
                name: "poison"
            }
        ],
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/3.png"
    },
    {
        id: 4,
        name: "charmander",
        attack:100,
        types: [
            {
                "name": "fire"
            }
        ],
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/4.png"
    },
    {
        id: 5,
        name: "charmeleon",
        attack:40,
        types: [
            {
                name: "fire"
            }
        ],
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/5.png"
    },
    {
        id: 6,
        name: "charizard",
        attack:70,
        types: [
            {
                name: "fire"
            },
            {
                name: "flying"
            }
        ],
        front_default: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/6.png"
    },
    
    {
        id: 41,
        name: "gaga",
        attack:55,
        front_default: "https://pokemonletsgo.pokemon.com/assets/img/common/char-pikachu.png",
        types: [
            {
                name: "flying",
                
            },
            {
                name: "grass",
                
            }
        ]
    },
    {
        id: 42,
        name: "mumu",
        attack:48,
        front_default: "https://i.pinimg.com/564x/fa/5d/f5/fa5df57329a2168506817320d3ab0868.jpg",
        types: [
            {
                name: "bug",
                
            },
            {
                name: "ice",
                
            },
            {
                name: "fighting",
                
            },
            {
                name: "ground",
               
            },
            {
                name: "shadow",
            }
                
        ]
    },
    {
        id: 44,
        attack:1,
        name: "gg",
        front_default: "https://p.kindpng.com/picc/s/131-1317454_chibi-animal-koala-cute-kawaii-cute-kawaii-koala.png",
        types: [
            {
                name: "fire",
                
            },
            {
                name: "ground",
            },    
            {
                name: "fairy",
                
            }
        ]
    },
    {
        id: 43,
        name: "kero",
        attack:17,
        front_default: "https://www.kindpng.com/picc/m/413-4138376_transparent-sakura-card-captor-png-kero-sakura-card.png",
        types: [
            {
                "name": "bug",
                
            },
            {
                "name": "fire",
                
            }
        ]
    },
    {
        id: 45,
        name: "chopper",
        attack:100,
        front_default: "https://i.pinimg.com/originals/55/5c/80/555c8084a5a63bce4f734979a0d5134a.png",
        types: [
            {
                name: "fighting",
                
            },
            {
                name: "normal",
               
            }
        ]
    }
]

export const FilterOrder=(allPokemons,object)=>{
    let newAllPokemon=[]
    if(object.types.length>0){        
        const noRepeat=[0]
        allPokemons.map((a)=>{
            a.types.map((aType)=>{
                object.types.map((t)=>{
                    if(aType.name===t){
                        if(noRepeat[0]!==a.id){
                            newAllPokemon.push(a)
                            noRepeat.unshift(a.id)
                            
                        }
                        
                    }
                })
            })
        })
        
           
    }
    
    if(object.category!==null){
        
        
        if(object.category===0){
            
            newAllPokemon= newAllPokemon}
        if(object.category===1){
            let newAllPokemon2=[]
            newAllPokemon.map((m)=>{
                if(m.id<41){newAllPokemon2.push(m)}
            })
            newAllPokemon=newAllPokemon2
            
        }
        if(object.category===2){
            let newAllPokemon2=[]
            newAllPokemon.map((m)=>{
                if(m.id>40){newAllPokemon2.push(m)}
            })
            newAllPokemon=newAllPokemon2
            
        }    
    }

    if(object.name!==null){
        if(object.name===0){
            
            newAllPokemon=newAllPokemon              
        }
        
        if(object.name===1){
            function SortArray(x, y){
                return x.name.localeCompare(y.name);
            }
            newAllPokemon=newAllPokemon.sort(SortArray)        
            
        }
        if(object.name===2){
            function SortArray(y, x){
                return x.name.localeCompare(y.name);
            }
            newAllPokemon=newAllPokemon.sort(SortArray)        
            
        }
    }
    if(newAllPokemon.length===0){
        newAllPokemon=[{error:'no matches to show.'}]
        return newAllPokemon
    }else{

        return newAllPokemon
    }
}



//console.log(FilterOrder(allPokemons,{types:['normal','bug','fire'],name:1,category:2 })) 
// export const orderByAttack=(allPokemons, option)=>{
//    // console.log(allPokemons)
//     if(option===0){
//         function SortArray(x, y){
//             if (x.attack < y.attack) {return -1;}
//             if (x.attack > y.attack) {return 1;}
//             return 0;
//         }
//         const newAllPokemon=allPokemons.sort(SortArray)
//         //console.log('deeeeee'+newAllPokemon)        
//         return newAllPokemon
//     }
//     if(option===1){
//         function SortArray(y, x){
//             if (x.attack < y.attack) {return -1;}
//             if (x.attack > y.attack) {return 1;}
//             return 0;
//         }
//         const newAllPokemon=allPokemons.sort(SortArray)
//         //console.log('deeeeeddddderrre'+newAllPokemon)            
//         return newAllPokemon
//     }
    
// }
//const filterTypes=filterByType(allPokemons,[{name:'bug'},{name:'fire'},{name: "flying"}])
//console.log(orderByAttack(allPokemons,1))
//console.log(orderByName(allPokemons,1))
//console.log(filterByCategory(filterTypes,2))
//console.log(filterTypes)

//filterByType(allPokemons,[{name:'bug'},{name:'fire'}])
