const GameOver = ({restartGame}) => {
  return (
    <div className="gameover">
        <div>
            <p>Game Over!</p>
            <button onClick={restartGame}>Restart</button>
        </div>
    </div>
  );
};

export default GameOver;
