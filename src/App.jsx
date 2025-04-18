import './App.css';
import "./index.css";
import Card from './Components/Card';
import GameOver from './Components/GameOver';
import { useState, useEffect } from 'react';

function App() {

  const [pokemonIds, setPokemonIds] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [highestScore, setHighestScore] = useState(0);
  const [clickedPokemonIds, setClickedPokemonIds] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);

  useEffect(() => {
    const ids = [];
    while (ids.length < 10) {
      const randomId = Math.floor(Math.random() * 1000 + 1);
      if (!ids.includes(randomId)) {
        ids.push(randomId);
      }
    }
    setPokemonIds(ids);
  }, []);


  const shuffle = () => {
    const shuffledIds = [...pokemonIds];
    for (let i = shuffledIds.length -1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i+1));
      [shuffledIds[i], shuffledIds[j]] = [shuffledIds[j], shuffledIds[i]];
    }
    setPokemonIds(shuffledIds);
  }


  const restartGame = () => {
    setIsGameOver(false);
    setCurrentScore(0);
    setClickedPokemonIds([]);
  }

  const handleCardClick = (key) => {
    if (clickedPokemonIds.includes(key)) {
     if (currentScore > highestScore) {
      setHighestScore(currentScore);
     }
     setIsGameOver(true);
    }
    else {
      setCurrentScore(prevScore => {
        const newScore = prevScore + 1;
        if (newScore > highestScore) {
          setHighestScore(newScore);
        }
        return newScore;
      });
      setClickedPokemonIds(prev => [...prev, key]);
      if (currentScore > highestScore) {
        setHighestScore(currentScore);
      }
    }
    shuffle();
  }


  return (
    <>
      <p>Pokemon Memory Game</p>
      <div className="scores">
        <div className="current-score">
          <p>Current Score: {currentScore}</p>
        </div>
        <div className="high-score">
          <p>Highest Score: {highestScore}</p>
        </div>
      </div>
      <div className="cards">
        {pokemonIds.map((id) => (
          <Card
            key={id}
            pokemonId={id}
            handleCardClick={() => handleCardClick(id)}
          />
        ))}
      </div>
      {isGameOver && (
        <GameOver 
          restartGame={restartGame}
        />
      )}
    </>
  );
}  

export default App
