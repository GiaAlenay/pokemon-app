import './App.css';
import React from 'react';
import { Route } from 'react-router-dom';
import { Nav } from './components/Nav/Nav';
import {Landing} from './components/Landing/Landing';
import {Home} from './components/Home/Home';
import{CreatePokemon} from './components/CreatePokemon/CreatePokemon'
import {About} from './components/About/About'

function App() {
  return (
    <div className="App">
      <React.Fragment>
      <Nav/>
      <Route exact path='/' component={Landing}/>
      <Route  path='/home' component={Home}/>
      <Route  path='/create' component={CreatePokemon}/>
      <Route  path='/about' component={About}/>
      </React.Fragment>      
      
    </div>
  );
}

export default App;
