import { useRef } from "react"
import { setTrainerG } from "../store/states/trainer.state"
import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"
import "../components/PokedexPage/styles/HomePage.css"
import logo from "../img/logo__pokedex.png"
import barra__footer from "../img/home__barra.png"

const HomePage = () => {

  const inputTrainer = useRef()

  const dispatch = useDispatch()

  const navigate = useNavigate()

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(setTrainerG(inputTrainer.current.value.trim()))
    navigate('/pokedex')
  }

  return (
    <div className="home">
      <img className="logo__img" src={logo} alt="" />
      <div>
      <h2 className="home__title">¡Hi Trainer!</h2>
      <p className="home__text">To start this app, give me you trainer name</p>
      </div>
      <form onSubmit={handleSubmit}>
        <input className="home__input" ref={inputTrainer} type="text" placeholder="Your name"/>
        <button className="home__btn">Catch them all</button>
      </form>
      <footer className="home__footer">
        <img className="home__img__footer" src={barra__footer} alt="" />
      </footer>
    </div>
  )
}
export default HomePage