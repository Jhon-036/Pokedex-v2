import { useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"

const PokedexPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [typeSelected, setTypeSelected] = useState('allPokemon')

  const trainerName = useSelector(states => states.trainer)

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
  const [pokemons, getPokemons, getTypePokemon] = useFetch(url)

  useEffect(() => {
    if(typeSelected === 'allPokemon') {
      getPokemons()
    } else {
      getTypePokemon(typeSelected)
    }
  }, [typeSelected]) 

  const inputName = useRef()

  const handleSearch = e => {
    e.preventDefault()
    setInputValue(inputName.current.value.trim().toLowerCase())
  }

  const coFilter = (pokeInfo) => pokeInfo.name.toLowerCase().includes(inputValue)

  return (
    <div>
      <h2>Hi <span>{trainerName}</span>, here you can find your favorite pokemon</h2>
      <form onSubmit={handleSearch}>
        <input ref={inputName} type="text" />
        <button>Search</button>
      </form >
      <SelectType setTypeSelected={setTypeSelected}/>
      <div>
        {
          pokemons?.results.filter(coFilter).map(pokeInfo => (
            <PokeCard key={pokeInfo.url} url={pokeInfo.url}/>
          ))
        }
      </div>
    </div>
  )
}
export default PokedexPage