import './App.css';
import React, { useState } from 'react';
import pokemon from "./pokemon.json"
import { object } from 'prop-types';

const Tablerow = ({pokemon, onSelect}) => (
  <tr>
    <td>{pokemon.name.english}</td>
    <td>{pokemon.type.join(", ")}</td>
    <td><button onClick={() => onSelect(pokemon)}>select</button></td>
  </tr>
)

const PokemonInfo = ({name, base}) => (
  <div>
    <h1>{name.english}</h1>
    <table>
       {
        Object.keys(base).map(key =>(
          <tr key={key}>
            <td>{key}</td>
            <td>{base[key]}</td> 
          </tr>
        ))
       }
    </table>
  </div>
)


function App() {
  const [filter, setFilter] = useState("");
  const [selectedItem, selectedItemSet] = useState(null);

  return (
    <div style={{
      margin: "auto",
      width: 800,
      paddingTop: "1rem"
    }}>
      <h1 className='title'>pokemon search</h1>
      <input value={filter} onChange={(e) => setFilter(e.target.value)}/>
      <div style={{
        display:"grid",
        gridTemplateColumns: "70% 30%",
        columnGap: "1rem"
      }}>
      <div>
        <table width="100%">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {pokemon 
            .filter((pokemon)=> pokemon.name.english.toLowerCase().includes(filter.toLowerCase()))
            .slice(0,20).map((pokemon) => (
              <Tablerow pokemon={pokemon} key={pokemon.id} onSelect={(pokemon) => selectedItemSet(pokemon)}/>
            ))}
          </tbody>
        </table>
      </div>
        {selectedItem && <PokemonInfo  {... selectedItem}/>}
      </div>
    </div>
  );
}

export default App;
