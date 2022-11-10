import './App.css';
import pokeball_ico from "../src/resources/pokeball_ico.svg";
import acero from "../src/resources/tipos_pokemon/tipo_acero.png"
import agua from "../src/resources/tipos_pokemon/tipo_agua.png"
import bicho from "../src/resources/tipos_pokemon/tipo_bicho.png"
import dragon from "../src/resources/tipos_pokemon/tipo_dragon.png"
import electrico from "../src/resources/tipos_pokemon/tipo_electrico.png"
import fantasma from "../src/resources/tipos_pokemon/tipo_fantasma.png"
import fuego from "../src/resources/tipos_pokemon/tipo_fuego.png"
import hada from "../src/resources/tipos_pokemon/tipo_hada.png"
import hielo from "../src/resources/tipos_pokemon/tipo_hielo.png"
import lucha from "../src/resources/tipos_pokemon/tipo_lucha.png"
import normal from "../src/resources/tipos_pokemon/tipo_normal.png"
import planta from "../src/resources/tipos_pokemon/tipo_planta.png"
import psiquico from "../src/resources/tipos_pokemon/tipo_psiquico.png"
import roca from "../src/resources/tipos_pokemon/tipo_roca.png"
import siniestro from "../src/resources/tipos_pokemon/tipo_siniestro.png"
import tierra from "../src/resources/tipos_pokemon/tipo_tierra.png"
import veneno from "../src/resources/tipos_pokemon/tipo_veneno.png"
import volador from "../src/resources/tipos_pokemon/tipo_volador.png"
import Pokedex from 'pokedex-promise-v2';
import { useState } from 'react';
import XLSX from 'xlsx-js-style';

const P = new Pokedex();

function App() {
  const [pokemon, setPokemon] = useState(null)
  const [globalType, setGlobalType] = useState()
  const [pokemons, setPokemons] = useState()

  // Función para crear un pokemon aleatorio y asignar valores a los States
  const stats = (type) => {
    setGlobalType(type)
    // Función para obtener datos según el tipo seleccionado
    P.getTypeByName(type)
      .then((response) => {
        console.log(response.pokemon)
        // Función para llamar a un pokemon aleatorio entre los disponibles del tipo elegido
        P.getPokemonByName(response.pokemon[Math.floor(Math.random() * response.pokemon.length - 1)].pokemon.name)
          .then((response) => {
            setPokemon(response)
            console.log(response)
          })
          .catch((error) => {
            console.log('There was an ERROR: ', error);
          });
          // Asignación de la lista de pokemons por tipo para su previa exportación
        P.getPokemonByName(response.pokemon.map(pokemon => pokemon.pokemon.name))
          .then((response) => {
            setPokemons(response)
            console.log(response)
          })
          .catch((error) => {
            console.log('There was an ERROR: ', error);
          });
      })
      .catch((error) => {
        console.log('There was an ERROR: ', error);
      });
  }
  // Función para validar el tipo y mostrar en pantalla el correspondiente
  const validarTipo = () => {
    let pokeType = pokemon && pokemon.types[0].type.name
    if (pokemon !== null) {
      if (pokeType !== globalType) {
        return (
          <div style={{ marginLeft: '6px' }}> 2: {pokemon && pokemon.types[1].type.name}</div>
        )
      } else {
        return (
          <div style={{ marginLeft: '6px' }}> 1: {pokemon && pokemon.types[0].type.name}</div>
        )
      }
    }
  }
  // Función para exportar a CSV
  const exportToCsv = () => {
    let Results = [
      ["Pokemon", "Tipo", "Ataque", "Defensa"],
    ];
    // Recorrido de datos en el API
    pokemons.forEach(pokemon => {
      Results = [...Results, [
        pokemon.name, pokemon.types[0].type.name, pokemon.stats[1].base_stat, pokemon.stats[2].base_stat
      ]]
    })
    // Definición y recorrido de filas y columnas
    let CsvString = "";
    Results.forEach(function (RowItem, RowIndex) {
      RowItem.forEach(function (ColItem, ColIndex) {
        CsvString += ColItem + ',';
      });
      CsvString += "\r\n";
    });
    // Descarga del documento
    CsvString = "data:application/csv," + encodeURIComponent(CsvString);
    var x = document.createElement("A");
    x.setAttribute("href", CsvString);
    x.setAttribute("download", "listapokemon" + globalType + ".csv");
    document.body.appendChild(x);
    x.click();
  }

  const exportToExcel = () => {
    // Creación del libro de trabajo
    const wb = XLSX.utils.book_new();
    // Creación de columnas de datos
    let row = [[
      { v: "Pokémon", t: "s", s: {} },
      { v: "Tipo", t: "s", s: {} },
      { v: "Ataque", t: "s", s: {} },
      { v: "Defensa", t: "s", s: {} },
    ]];
    pokemons.forEach(pokemon => {
      row = [...row, [
        {
          v: pokemon.name,t:"s", s:{}
        }, 
        {
          v: pokemon.types[0].type.name, t:"s", s: {}
        },
        { 
        v: pokemon.stats[1].base_stat, t:"s", s:{}
        },
        {
         v: pokemon.stats[2].base_stat, t:"s", s:{}
        }
      ]]
    })
    // Creación de la hoja de trabajo con las columnas y vinculación de la hoja de trabajo con el libro
    const ws = XLSX.utils.aoa_to_sheet(row);
    XLSX.utils.book_append_sheet(wb, ws, globalType + "Pokemons");
    // Descarga del archivo desde el navegador
    XLSX.writeFile(wb, "lista"+ globalType+".xlsx");
  }

  return (
    <div className="App">
      {/* Header de la App */}
      <header className="App-header">
        <img className="ico" src={pokeball_ico} alt="" />
        <text className="font-face-psn"><text className="poketxt">Bienvenido a tu Pokédex!</text></text>
        <img className="ico" src={pokeball_ico} alt="" />
      </header>
      <body>
        {/* Diseño estético del pokédex */}
        <div className="poke-top8" />
        <div className="poke-top7" />
        <div className="poke-top6" />
        <div className="poke-top5" />
        <div className="poke-top4" />
        <div className="poke-top3" />
        <div className="poke-top2" />
        <div className="poke-top" />
        <div className="poke-bot8" />
        <div className="poke-bot7" />
        <div className="poke-bot6" />
        <div className="poke-bot5" />
        <div className="poke-bot" />
        <div className="poke-bot2" />
        <div className="poke-bot3" />
        <div className="poke-bot4" />
        <div className="poke-mid">
          <button className="poke-mid-button" onClick={() => {
            exportToCsv()
          }}>Importar a CSV</button>
        </div>
        <div className="poke-mid">
          <button className="poke-mid-button2" onClick={() => {
            exportToExcel()
          }}>Importar a Excel</button>
        </div>
        {/* Contenedor donde se muestran los datos */}
        <div className="pokedex">
          <div className="botones_pokedex">
            {/* Contenedor de los botones de cada tipo */}
            <button onClick={() => {
              stats("steel")
            }}><img src={acero} alt="" /></button>

            <button onClick={() => {
              stats("water")
            }}><img src={agua} alt="" /></button>

            <button onClick={() => {
              stats("bug")
            }}><img src={bicho} alt="" /></button>

            <button onClick={() => {
              stats("dragon")
            }}><img src={dragon} alt="" /></button>

            <button onClick={() => {
              stats("electric")
            }}><img src={electrico} alt="" /></button>

            <button onClick={() => {
              stats("ghost")
            }}><img src={fantasma} alt="" /></button>

            <button onClick={() => {
              stats("fire")
            }}><img src={fuego} alt="" /></button>

            <button onClick={() => {
              stats("fairy")
            }}><img src={hada} alt="" /></button>

            <button onClick={() => {
              stats("ice")
            }}><img src={hielo} alt="" /></button>

            <p />

            <button onClick={() => {
              stats("fighting")
            }}><img src={lucha} alt="" /></button>

            <button onClick={() => {
              stats("normal")
            }}><img src={normal} alt="" /></button>

            <button onClick={() => {
              stats("grass")
            }}><img src={planta} alt="" /></button>

            <button onClick={() => {
              stats("psychic")
            }}><img src={psiquico} alt="" /></button>

            <button onClick={() => {
              stats("rock")
            }}><img src={roca} alt="" /></button>

            <button onClick={() => {
              stats("dark")
            }}><img src={siniestro} alt="" /></button>

            <button onClick={() => {
              stats("ground")
            }}><img src={tierra} alt="" /></button>

            <button onClick={() => {
              stats("poison")
            }}><img src={veneno} alt="" /></button>

            <button onClick={() => {
              stats("flying")
            }}><img src={volador} alt="" /></button>

          </div>
          <div className="datos_pokedex">
            {/* Se imprimen en pantalla los datos del pokémon aleatorio */}
            Pokemon: {pokemon && pokemon.name}<br />
            <div style={{ display: 'flex', justifyContent: 'center' }}>Tipo {validarTipo()}</div>
            Hp:{pokemon && pokemon.stats[0].base_stat}<br />
            Ataque: {pokemon && pokemon.stats[1].base_stat}<br />
            Defensa:{pokemon && pokemon.stats[2].base_stat}<br />
            Ataque Especial:{pokemon && pokemon.stats[3].base_stat}<br />
            Defensa Especial:{pokemon && pokemon.stats[4].base_stat}<br />
            Velocidad:{pokemon && pokemon.stats[5].base_stat}
          </div>
        </div>
      </body>
    </div >
  );
}

export default App;
