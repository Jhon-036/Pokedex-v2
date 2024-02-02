import { useSelector } from "react-redux"
import useFetch from "../hooks/useFetch"
import { useEffect, useRef, useState } from "react"
import PokeCard from "../components/PokedexPage/PokeCard"
import SelectType from "../components/PokedexPage/SelectType"
import "../components/PokedexPage/styles/PokedexPage.css"
import barra from "../img/barra.png"
import logo__img from "../img/logo__pokedex.png"

const PokedexPage = () => {

  const [inputValue, setInputValue] = useState('')
  const [typeSelected, setTypeSelected] = useState('allPokemon')

  const trainerName = useSelector(states => states.trainer)

  const url = 'https://pokeapi.co/api/v2/pokemon?limit=20&offset=0'
  const [pokemons, getPokemons, getTypePokemon] = useFetch(url)

  useEffect(() => {
    if (typeSelected === 'allPokemon') {
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
    <div className="pokedex">
      <img src={barra} alt="" />
      <article className="pokedex__article">
        <img className="logo" src={logo__img} alt="" />
        <h2 className="pokedex__description"><span className="red">Hi {trainerName},</span> here you can find your favorite pokemon</h2>
        <form className="pokedex__form" onSubmit={handleSearch}>
          <input className="pokedex__input" ref={inputName} type="text" />
          <button className="pokedex__btn">Search</button>
          <SelectType setTypeSelected={setTypeSelected} />
        </form >
        <section className="pokedex__cards">
          <div className="pokedex__cards__item">
            {
              pokemons?.results.filter(coFilter).map(pokeInfo => (
                <PokeCard key={pokeInfo.url} url={pokeInfo.url} />
              ))
            }
          </div>
        </section>
      </article>
    </div>
  )
}
export default PokedexPage