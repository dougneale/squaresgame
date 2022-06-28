// a page that displays a 10x10 grid of coloured squares
// the colours are all random
// when the user clicks on a square, the square should change to a random colour
// use a 2d array to store the squares
// the game ends when you have 5 squares in a row of the same colour
// at the end of the game, the color that won is displayed
// the squares of the winning color start spinning when the game ends

import React from "react";

const Index = () => {
  // list of colours that are unique
  const colours = ["red", "green", "blue", "yellow", "orange", "purple"];

  // share tweet text
  const generateTweetHref = (colour) => {
    const text = `I just won a game of Colourful Squares with ${colour}! #colourfulsquares`;
    const href = `https://twitter.com/intent/tweet?text=${text}`;
    return href;
  };

  // set state with square colours
  const [squares, setSquares] = React.useState([]);

  // winning colour
  const [winningColour, setWinningColour] = React.useState("");

  const generateSquareState = () => {
    // create a new list of squares
    const newSquares = [];
    for (let i = 0; i < 10; i++) {
      const newRow = [];
      for (let j = 0; j < 10; j++) {
        newRow.push(colours[Math.floor(Math.random() * colours.length)]);
      }
      newSquares.push(newRow);
    }

    setSquares(newSquares);
  };

  // handle reset
  const handleReset = () => {
    // generate a new list of squares
    generateSquareState();
    // set the winning colour to an empty string
    setWinningColour("");
  };

  // generate colors on page load
  React.useEffect(() => {
    generateSquareState();
  }, []);

  // handle end game state
  const [endGame, setEndGame] = React.useState(false);

  // handle end game
  const handleEndGame = () => {
    setEndGame(true);
  };

  // check state of game
  const checkGame = () => {
    // check if there are 5 squares in a row of the same colour
    for (let i = 0; i < 10; i++) {
      for (let j = 0; j < 10; j++) {
        // case for horizontal
        if (
          j < 6 &&
          squares[i][j] === squares[i][j] &&
          squares[i][j] === squares[i][j + 1] &&
          squares[i][j] === squares[i][j + 2] &&
          squares[i][j] === squares[i][j + 3] &&
          squares[i][j] === squares[i][j + 4]
        ) {
          setWinningColour(squares[i][j]);
          handleEndGame();
        }
        // case for vertical
        if (
          i < 6 &&
          squares[i][j] === squares[i][j] &&
          squares[i][j] === squares[i + 1][j] &&
          squares[i][j] === squares[i + 2][j] &&
          squares[i][j] === squares[i + 3][j] &&
          squares[i][j] === squares[i + 4][j]
        ) {
          setWinningColour(squares[i][j]);
          handleEndGame();
        }

        // case for diagonal
        if (
          i < 6 &&
          j < 6 &&
          squares[i][j] === squares[i][j] &&
          squares[i][j] === squares[i + 1][j + 1] &&
          squares[i][j] === squares[i + 2][j + 2] &&
          squares[i][j] === squares[i + 3][j + 3] &&
          squares[i][j] === squares[i + 4][j + 4]
        ) {
          setWinningColour(squares[i][j]);
          handleEndGame();
        }
        // case for diagonal

        if (
          i < 6 &&
          j > 3 &&
          squares[i][j] === squares[i][j] &&
          squares[i][j] === squares[i + 1][j - 1] &&
          squares[i][j] === squares[i + 2][j - 2] &&
          squares[i][j] === squares[i + 3][j - 3] &&
          squares[i][j] === squares[i + 4][j - 4]
        ) {
          setWinningColour(squares[i][j]);
          handleEndGame();
        }

        // case for diagonal
        if (
          i > 3 &&
          j < 6 &&
          squares[i][j] === squares[i][j] &&
          squares[i][j] === squares[i - 1][j + 1] &&
          squares[i][j] === squares[i - 2][j + 2] &&
          squares[i][j] === squares[i - 3][j + 3] &&
          squares[i][j] === squares[i - 4][j + 4]
        ) {
          setWinningColour(squares[i][j]);
          handleEndGame();
        }

        if (
          i > 3 &&
          j > 3 &&
          squares[i][j] === squares[i][j] &&
          squares[i][j] === squares[i - 1][j - 1] &&
          squares[i][j] === squares[i - 2][j - 2] &&
          squares[i][j] === squares[i - 3][j - 3] &&
          squares[i][j] === squares[i - 4][j - 4]
        ) {
          setWinningColour(squares[i][j]);
          handleEndGame();
        }
      }
    }
  };

  // useEffect check game over
  React.useEffect(() => {
    if (squares.length > 0) {
      checkGame();
    }
  }, [squares]);

  // handle square click
  const handleSquareClick = (i, j) => {
    // check if game is over
    if (endGame) {
      return;
    }
    // get random colour
    const randomColour = colours[Math.floor(Math.random() * colours.length)];
    // set square colour
    setSquares((prevSquares) => {
      const newSquares = [...prevSquares];
      newSquares[i][j] = randomColour;
      return newSquares;
    });
  };

  return (
    <div className="App">
      <style jsx>{`
        .App {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh - 200px;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          // padding at bottom
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(10, 50px);
          grid-template-rows: repeat(10, 50px);
          grid-gap: 1px;
          margin: 20px;
        }
        .square {
          width: 50px;
          height: 50px;
          border: 1px solid black;
        }
        .square:hover {
          background-color: black;
        }
        .spin {
          animation: spin 1s infinite linear;
        }

        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }

        button {
          background-color: black;
          color: white;
          border: none;
          padding: 10px;
          font-size: 1em;
          margin: 10px;
          cursor: pointer;
        }
        button:hover {
          background-color: white;

          color: black;
        }

        .winner {
          font-size: 50px;
          font-weight: bold;
          color: ${winningColour};
        }
      `}</style>
      {/* Title of game */}
      <h1> Tiles game </h1>
      {/* 
        describe game
      */}
      <p>
        Click on a square to get a random colour.
        <br />
        The game ends when there are 5 squares in a row of the same colour.
        <br />
        They could be horizontal, vertical, diagonal or anti-diagonal.
      </p>
      {/*
        grid of squares
      */}
      <div className="grid">
        {squares.map((row, i) => {
          return row.map((square, j) => {
            // spin the with the winning colour when the game is over
            let spin = "";
            if (endGame && winningColour === square) {
              spin = "spin";
            }
            return (
              <div
                key={i + "-" + j}
                className={`square ${spin}`}
                style={{ backgroundColor: square }}
                onClick={() => handleSquareClick(i, j)}
              ></div>
            );
          });
        })}
      </div>
      {/* 
        show end game message if game is over with winning colour
      */}
      {endGame ? (
        <div>
          <h1>Game Over</h1>
          <h2 className="winner">{winningColour} is the winner!</h2>
          <button onClick={handleReset}>Reset</button>
          {/* link to tweet result for player with generateTweetHref, opens in new tab */}
          <a href={generateTweetHref()} target="_blank" rel="noreferrer">
            <button>Tweet</button>
          </a>
        </div>
      ) : (
        <div>
          <h1>Game is not over</h1>
        </div>
      )}
    </div>
  );
};

export default Index;
