import './App.css';
import { useEffect, useState } from 'react';



function App() {

  const [grid, setGrid] = useState([
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0]
  ])
  const [score, SetScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [highScore, setHighScore] = useState(0)

  const positiongrid = [14, 132, 250, 368]

  let numberGrid = grid

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


  const leftArrow = () => {
    setMoves(moves + 1)

    let tempscore = 0;
    for (let i = 0; i < 4; i++) {

      const filteredArray = numberGrid[i].filter(item => item)
      for (let j = 0; j < filteredArray.length - 1; j++) {

        if (filteredArray.length >= 1 && filteredArray[j] === filteredArray[j + 1]) {
          filteredArray[j] += filteredArray[j + 1];
          filteredArray[j + 1] = 0;
          tempscore += filteredArray[j]
          for (let k = j + 1; k < filteredArray.length - 1; k++) {
            if (filteredArray[k] == 0) {
              filteredArray[k] = filteredArray[k + 1];
              filteredArray[k + 1] = 0
            }

          }
        }
      }

      let count = 0
      for (let index = 0; index < 4; index++) {
        count < filteredArray.length ? numberGrid[i][index] = filteredArray[count++] : numberGrid[i][index] = 0
      }

    }
    SetScore(score + tempscore)
    console.log(grid, "<--------->", numberGrid, "<------------->", numberGrid === grid)
    setGrid(numberGrid)
    let newOne = createData();

    if (newOne) {
      numberGrid[newOne[0]][newOne[1]] = 2;
    }
    setGrid(numberGrid)
  }

  const rightArrow = () => {
    setMoves(moves + 1)
    let tempscore = 0;
    for (let i = 0; i < 4; i++) {

      const filteredArray = numberGrid[i].filter(item => item)

      for (let j = filteredArray.length - 1; j > 0; j--) {
        if (filteredArray.length >= 1 && filteredArray[j] === filteredArray[j - 1]) {
          filteredArray[j] += filteredArray[j - 1];
          filteredArray[j - 1] = 0;
          tempscore += filteredArray[j]
          for (let k = j - 1; k > 0; k--) {
            if (filteredArray[k] == 0) {
              filteredArray[k] = filteredArray[k - 1];
              filteredArray[k - 1] = 0
            }

          }
        }
      }

      let count = filteredArray.length - 1;
      for (let index = 3; index >= 0; index--) {
        count >= 0 ? numberGrid[i][index] = filteredArray[count--] : numberGrid[i][index] = 0
      }

    }
    SetScore(score + tempscore)
    setGrid(numberGrid)
    let newOne = createData();
    console.log("newone ========", newOne);

    if (newOne) {
      numberGrid[newOne[0]][newOne[1]] = 2;
    }
    setGrid(numberGrid)
  }

  const downArrow = () => {
    setMoves(moves + 1)
    let tempscore = 0;
    for (let i = 0; i < 4; i++) {

      const tempArray = [];

      for (let j = 3; j >= 0; j--) {
        tempArray.push(numberGrid[j][i])
      }

      const filteredArray = tempArray.filter(item => item)

      for (let j = 0; j < filteredArray.length - 1; j++) {

        if (filteredArray.length >= 1 && filteredArray[j] === filteredArray[j + 1]) {
          filteredArray[j] += filteredArray[j + 1];
          filteredArray[j + 1] = 0;
          tempscore += filteredArray[j]
          for (let k = j + 1; k < filteredArray.length - 1; k++) {
            if (filteredArray[k] == 0) {
              filteredArray[k] = filteredArray[k + 1];
              filteredArray[k + 1] = 0
            }

          }
        }
      }

      let count = 0;
      for (let index = 3; index >= 0; index--) {
        count < filteredArray.length ? numberGrid[index][i] = filteredArray[count++] : numberGrid[index][i] = 0
      }

    }
    SetScore(score + tempscore)
    setGrid(numberGrid)
    let newOne = createData();

    if (newOne) {
      numberGrid[newOne[0]][newOne[1]] = 2;
    }
    setGrid(numberGrid)
  }


  const upArrow = () => {

    setMoves(moves + 1)

    let tempscore = 0;
    for (let i = 0; i < 4; i++) {

      const tempArray = [];

      for (let j = 0; j < 4; j++) {
        tempArray.push(numberGrid[j][i])
      }

      const filteredArray = tempArray.filter(item => item)

      for (let j = 0; j < filteredArray.length - 1; j++) {

        if (filteredArray.length >= 1 && filteredArray[j] === filteredArray[j + 1]) {
          filteredArray[j] += filteredArray[j + 1];
          filteredArray[j + 1] = 0;
          tempscore += filteredArray[j]
          for (let k = j + 1; k < filteredArray.length - 1; k++) {
            if (filteredArray[k] == 0) {
              filteredArray[k] = filteredArray[k + 1];
              filteredArray[k + 1] = 0
            }

          }
        }
      }

      let count = 0;
      for (let index = 0; index < 4; index++) {
        count < filteredArray.length ? numberGrid[index][i] = filteredArray[count++] : numberGrid[index][i] = 0
      }

    }
    SetScore(score + tempscore)
    setGrid(numberGrid)
    let newOne = createData();

    if (newOne) {
      numberGrid[newOne[0]][newOne[1]] = 2;
    }
    setGrid(numberGrid)
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


  const createDataRandom = (positionChoosing) => {
    return Math.floor(Math.random() * positionChoosing.length)
  }

  const createData = () => {
    const positionChoosing = []
    // console.log(numberGrid)
    for (let i = 0; i < numberGrid.length; i++) {
      for (let j = 0; j < numberGrid.length; j++) {
        if (numberGrid[i][j] === 0)
          positionChoosing.push(`${i} ${j}`)
      }
    }
    let random;
    let randomArray;
    console.log(positionChoosing);

    if (positionChoosing.length) {
      random = positionChoosing[createDataRandom(positionChoosing)];
      randomArray = random.split(" ")
      randomArray[0] = Number(randomArray[0])
      randomArray[1] = Number(randomArray[1])
      return randomArray;
    }
    else {
      alert("new Game")
      newGame()
      return
    }

  }


  const newGame = () => {
    const intialArray = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
    numberGrid = intialArray;
    setMoves(0)
    setHighScore(highScore < score ? score : highScore)
    SetScore(0)
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
    intialArray[one[0]][one[1]] = 2
    intialArray[two[0]][two[1]] = 2
    setGrid([...intialArray]);
    
  }

  useEffect(() => {
    newGame();
  }, [])


  return (
    <>
      <p>Score : {score}</p>
      <p>Moves : {moves}</p>
      <p>High Score : {highScore}</p>
      <button onClick={() => newGame()}>New Game</button>
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
