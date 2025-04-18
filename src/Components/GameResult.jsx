const GameResult = ({restartGame, gameWin}) => {
  return (
    <div className="gameover">
        <div>
            <p>{gameWin ? "You Won!" : "You Lost!"}</p>
            <button onClick={restartGame}>Restart</button>
        </div>
    </div>
  );
};

export default GameResult;
