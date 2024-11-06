import './App.css';
import { useEffect, useState } from 'react';



function App() {

  const [Grid, SetGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])
  const [score, SetScore] = useState(0)
  const [moves, setMoves] = useState(0)

  const positiongrid = [14, 132, 250, 368]

  const numberGrid = Grid

  const defaultlayout = (i) => {
    const temp = []
    for (let forward = 14; forward <= 368; forward += 118) {
      temp.push(
        <g key={`staticPosition=${i}-${forward}`}>
          <rect x={forward} y={i} width="108" height="108" rx="10" fill='#BAAC9A' />
        </g>
      )
    }
    return temp;
  }

  const updatedLayout = (startColumn, i) => {
    const temp = []
    const y = 65
    const singleX = 45;
    const doubleX = 35;
    const tribleX = 20;
    const quadrupleX = 13;
    const quintupleX = 0;

    const boxColor = {
      2: "#EEE4DA",
      4: "#EDE0C8",
      8: "#F2B179",
      16: "#F59563",
      32: "#F67C5F",
      64: "#F65E3B",
      128: "#EDCF72",
      256: "#EDCC61",
      512: "#EDC850",
      1024: "#EDC53F",
      2048: "#EDC22E",
      4096: "#3D3A33",
      8192: "#6B4D3E",
      16384: "#92755A",
      32768: "#C19A6B"
    }

    let startRow = 14;
    for (let j = 0; j < numberGrid.length; j++) {
      let numberXAlign = startRow;
      if (Math.floor(numberGrid[i][j] / 10) === 0)
        numberXAlign += singleX;
      else if (Math.floor(numberGrid[i][j] / 100) === 0)
        numberXAlign += doubleX;
      else if (Math.floor(numberGrid[i][j] / 1000) === 0)
        numberXAlign += tribleX;
      else if (Math.floor(numberGrid[i][j] / 10000) === 0)
        numberXAlign += quadrupleX;
      else if (Math.floor(numberGrid[i][j] / 100000) === 0)
        numberXAlign += quintupleX;
      else
        numberXAlign += quintupleX;

      temp.push(
        <g key={`dynamicposition=${startColumn}-${startRow}`}>
          <>
            <rect x={startRow} y={startColumn} width="108" height="108" rx="10" fill={numberGrid[i][j] ? boxColor[numberGrid[i][j]] : "#BAAC9A"} />
            <text x={numberXAlign} y={startColumn + y} style={{ fontSize: 39, fontWeight: 500 }} ><tspan fill='white'>{numberGrid[i][j] || ""}</tspan></text>
          </>
        </g>
      )
      startRow += 118;
    }
    return temp;
  }

  const createData = () => {
    let randomInt1 = Math.floor(Math.random() * 4);

    let randomInt2 = Math.floor(Math.random() * 4);
    console.log(randomInt1, randomInt2);

    return [randomInt1, randomInt2]
  }

  const upArrow = () => {
    setMoves(moves + 1)
    for (let i = 2; i >= 0; i--) {
      for (let j = 0; j < numberGrid.length; j++) {
        if (numberGrid[i][j] === 0) {
          for (let k = i; k < 3; k++) {
            numberGrid[k][j] = numberGrid[k + 1][j]
            numberGrid[k + 1][j] = 0
          }
          // numberGrid[numberGrid.length - 1][j] = 0;
        }
        else if (numberGrid[i][j] === numberGrid[i + 1][j]) {
          numberGrid[i][j] = numberGrid[i][j] + numberGrid[i + 1][j];
          numberGrid[i + 1][j] = 0;
          SetScore(score + numberGrid[i][j])

        }
      }
    }
    console.log(numberGrid);
    const newOne = createData();
    numberGrid[newOne[0]][newOne[1]] = 2;
    SetGrid(numberGrid)
  }

  const downArrow = () => {
    setMoves(moves + 1)
    for (let i = 1; i <= 3; i++) {
      for (let j = 0; j < numberGrid.length; j++) {
        if (numberGrid[i][j] === 0) {
          for (let k = i; k > 0; k--) {
            numberGrid[k][j] = numberGrid[k - 1][j]
            numberGrid[k - 1][j] = 0
          }
          // numberGrid[numberGrid.length - 1][j] = 0;
        }
        else if (numberGrid[i][j] === numberGrid[i - 1][j]) {
          numberGrid[i][j] = numberGrid[i][j] + numberGrid[i - 1][j];
          numberGrid[i - 1][j] = 0;
          SetScore(numberGrid[i][j])

        }
      }
    }
    console.log(numberGrid);
    const newOne = createData();
    numberGrid[newOne[0]][newOne[1]] = 2;
    SetGrid(numberGrid)
  }

  const leftArrow = () => {
    setMoves(moves + 1)
    for (let i = 0; i < numberGrid.length; i++) {
      for (let j = 2; j >= 0; j--) {
        if (numberGrid[i][j] === 0) {
          for (let k = j; k < 3; k++) {
            numberGrid[i][k] = numberGrid[i][k + 1]
            numberGrid[i][k + 1] = 0
          }
          // numberGrid[numberGrid.length - 1][j] = 0;
        }
        else if (numberGrid[i][j] === numberGrid[i][j + 1]) {
          numberGrid[i][j] = numberGrid[i][j] + numberGrid[i][j + 1];
          numberGrid[i][j + 1] = 0;
          SetScore(score + numberGrid[i][j])

        }
      }
    }
    console.log(numberGrid);
    const newOne = createData();
    numberGrid[newOne[0]][newOne[1]] = 2;
    SetGrid(numberGrid)
  }

  const rightArrow = () => {
    setMoves(moves + 1)
    for (let i = numberGrid.length - 1; i >= 0; i--) {
      for (let j = 1; j < 4; j++) {
        if (numberGrid[i][j] === 0) {
          for (let k = j; k >= 0; k--) {
            numberGrid[i][k] = numberGrid[i][k - 1]
            numberGrid[i][k - 1] = 0
          }
          // numberGrid[numberGrid.length - 1][j] = 0;
        }
        else if (numberGrid[i][j] === numberGrid[i][j - 1]) {
          numberGrid[i][j] = numberGrid[i][j] + numberGrid[i][j - 1];
          numberGrid[i][j - 1] = 0;
          SetScore(score + numberGrid[i][j])

        }
      }
    }
    console.log(numberGrid);
    const newOne = createData();
    numberGrid[newOne[0]][newOne[1]] = 2;
    SetGrid(numberGrid)
  }

  document.onkeydown = function (event) {
    console.log(event.key);
    switch (event.key) {
      case "ArrowLeft":
        leftArrow()
        break;
      case "ArrowUp":
        upArrow()
        break;
      case "ArrowRight":
        rightArrow();
        break;
      case "ArrowDown":
        downArrow();
        break;
      default:
        break;
    }

  }

  const newGame = () => {
    let one = createData();
    let two = createData();
    if (one[1] === two[1] && one[0] === two[0]) {
      if (two[1] <= 2) {
        two[1] += 1;
      }
      else {
        two[1] -= 1;
      }
    }
    numberGrid[one[0]][one[1]] = 2
    numberGrid[two[0]][two[1]] = 2
    SetGrid([...numberGrid])

  }

  useEffect(() => {
    console.log(numberGrid);

    newGame();
  }, [])


  return (
    <>
      <p>Score : {score}</p>
      <p>Moves : {moves}</p>
      <button onClick={()=> newGame()}>New Game</button>
      <svg width={576} height={576} viewBox='-100 -100 676 676' xmlns="http://www.w3.org/2000/svg" >
        <g>
          <rect width="492" height="492" rx="10" fill='#9c8979' />
        </g>
        {positiongrid.map((i) => defaultlayout(i))}
        {positiongrid.map((numX) => updatedLayout(numX, positiongrid.indexOf(numX)))}
      </svg>
    </>
  );
}

export default App;
