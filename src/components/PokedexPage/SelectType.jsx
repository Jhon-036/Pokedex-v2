import { useEffect, useRef } from "react"
import useFetch from "../../hooks/useFetch"
import "./styles/SelectType.css"

const SelectType = ({setTypeSelected}) => {

    const url = 'https://pokeapi.co/api/v2/type'
    const [types, getTypes] = useFetch(url)

    useEffect(() => {
      getTypes()
    }, [])

    const typeRef = useRef()

    const handleChange = e => {
        setTypeSelected(typeRef.current.value)
    }

  return (
    <select className="selected" ref={typeRef} onChange={handleChange}>
        <option value='allPokemon'>All Pokemon</option>
        {
            types?.results.map(type => (
                <option className="selected__option" key={type.url} value={type.url}>{type.name}</option>
            ))
        }
    </select>
  )
}
export default SelectType