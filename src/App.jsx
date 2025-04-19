import './App.css';
import "./index.css";
import Card from './Components/Card';
import GameResult from './Components/GameResult';
import { useState, useEffect } from 'react';

function App() {

  const [pokemonIds, setPokemonIds] = useState([]);
  const [currentScore, setCurrentScore] = useState(0);
  const [bestScore, setBestScore] = useState(0);
  const [clickedPokemonIds, setClickedPokemonIds] = useState([]);
  const [isGameOver, setIsGameOver] = useState(false);
  const [gameWin, setGameWin] = useState(false);

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


  useEffect(() => {
    document.title = `Memory Game. Score: ${currentScore}`
  }, [currentScore]);


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
    setGameWin(false);
    setCurrentScore(0);
    setClickedPokemonIds([]);
  }

  const handleCardClick = (key) => {
    if (clickedPokemonIds.includes(key)) {
     if (currentScore > bestScore) {
      setBestScore(currentScore);
     }
     setIsGameOver(true);
    }
    else {
      setCurrentScore(prevScore => {
        const newScore = prevScore + 1;
        if (newScore > bestScore) {
          setBestScore(newScore);
        }
        return newScore;
      });
      setClickedPokemonIds(prev => {
        const updated = [...prev, key]
        if (updated.length == pokemonIds.length) {
          setGameWin(true);
        }
        return updated;
      });
      if (currentScore > bestScore) {
        setBestScore(currentScore);
      }
    }
    
    shuffle();
  }


  return (
    <>
      <p>Memory Game</p>
      <div className="scores">
        <div className="current-score">
          <p>Current Score: {currentScore}</p>
        </div>
        <div className="high-score">
          <p>Best Score: {bestScore}</p>
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
      {(isGameOver || gameWin) && (
        <GameResult 
          restartGame={restartGame}
          gameWin = {gameWin}
        />
      )}
    </>
  );
}  

export default App
