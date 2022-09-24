import React from "react";
import './loading.css'
export const Loading=(props)=>{
    //const url1='https://c.tenor.com/tQVZsHnTSZgAAAAi/pikachu.gif'
    const url2='https://i.pinimg.com/originals/0c/4b/61/0c4b61db17a53de6ba0f4ffa3b842c2b.gif'
    //const url3='https://2img.net/h/orig01.deviantart.net/9ac3/f/2013/330/a/7/pikachu_animaci_oacute_n_15fps_by_slaugthervk-d6vr3cx.gif'
    const random=  Math.floor(Math.random() * 2);
    return(

        <div className={props.typeLoader===1 && 'firstLoader'}>
            {props.typeLoader===1 && (
                <div className="firstLoader1">
                <img id='loader'src={`loader${random}.gif`} alt ='loading...'/>
                
            </div>
            )}
            {props.typeLoader===2 &&(
                <div>                    
                    <h1 className="loading2"><img className="miniLoader" src={url2} alt ='loading...'/></h1>  
                </div>
            )}
            {props.typeLoader===3&&(
                <div>
                    <p className="firstLineLoader">Searching for</p> 
                    <p className="loading3">{props.pokeLoaderName}</p>
                    
                </div>
            )}
            
        </div>
    )
}