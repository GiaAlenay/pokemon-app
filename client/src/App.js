import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import {Landing} from './components/Landing/Landing';
import {Home} from './components/Home/Home';
import{CreatePokemon} from './components/CreatePokemon/CreatePokemon'
import {About} from './components/About/About'
import {PokemonDetail} from './components/PokemonDetail/PokemonDetail'

function App() {
  return (
    <div className="App">
      <React.Fragment>
      
      <Route exact path='/' component={Landing}/>
      <Route  exact path='/home' component={Home}/>
      <Route exact path= '/pokemons/:id' component={PokemonDetail}/>
      <Route  path='/create' component={CreatePokemon}/>
      <Route  path='/about' component={About}/>

      </React.Fragment>      
      
    </div>
  );
}

export default App;
