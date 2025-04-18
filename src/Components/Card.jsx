import { useEffect, useState } from "react";

const Card = ({pokemonId, handleCardClick}) => {

    const [pokemon, setPokemon] = useState(null);

    useEffect(() => {
        const fetchPokemon = async () => {
            try {
                const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
                const data = await response.json();
                const img = data.sprites.front_default;
                const name = data.name;
                console.log(data);
                setPokemon({name, img})
            }

            catch(error) {
                console.error(error);
                console.error("Cannot read");
            }
        }

        fetchPokemon();
    }, [pokemonId]);


    if (!pokemon) return null;

  return (
    <div className="card" onClick={handleCardClick}>
      <img src={pokemon.img} alt="name" />
      <div className="character-name">
        <p>{pokemon.name}</p>
      </div>
    </div>
  )
}

export default Card;
