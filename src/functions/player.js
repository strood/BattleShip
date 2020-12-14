const Player = (isHuman) => {
  const playTurn = (enemyBoard) => {
    // Get all valid coordinates
    let validCoordinates = [];
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        if (enemyBoard.getBoard()[i][j].hit === false) {
          validCoordinates.push([i, j]);
        }
      }
    }
    // Choose random one from list, or choose last remaining
    if (validCoordinates.length > 1) {
      let randChoice = Math.floor(Math.random() * validCoordinates.length);
      return validCoordinates[randChoice];
    } else {
      return validCoordinates[0];
    }
  };

  return { human: isHuman, turn: false, playTurn };
};

export default Player;
