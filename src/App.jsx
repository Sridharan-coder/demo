import { useEffect, useState } from 'react';

import './App.css';

import { Button, Grid2, Link, Menu, MenuItem, Stack, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { LuUndo2 } from "react-icons/lu";
import { IoRemoveOutline } from "react-icons/io5";
import { RiSwap2Fill, RiVipCrownFill } from "react-icons/ri";
import { BsGridFill } from "react-icons/bs";


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
  const [anchorEl, setAnchorEl] = useState(null);

  const positiongrid = [14, 132, 250, 368]

  let numberGrid = grid

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

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
            <text x={numberXAlign} y={startColumn + y} style={{ fontSize: 39, fontWeight: 500 }} ><tspan fill='rgb(135 114 89)' style={{ fontWeight: 'bold' }}>{numberGrid[i][j] || ""}</tspan></text>
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
            if (filteredArray[k] === 0) {
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
            if (filteredArray[k] === 0) {
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
            if (filteredArray[k] === 0) {
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
            if (filteredArray[k] === 0) {
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
    // console.log(positionChoosing);

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

    }

  }


  const newGame = () => {
    console.log("ko");

    const intialArray = [
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
      [0, 0, 0, 0],
    ]
    console.log(intialArray);

    // setTimeout(() => {
    numberGrid = intialArray;
    setMoves(0)
    console.log(highScore);
    setHighScore(highScore <= score ? score : highScore);
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
    console.log(intialArray);
    // }, 3000)


  }

  useEffect(() => {
    newGame();
    // eslint-disable-next-line
  }, [])

  return (
    <>
      <Grid2 container alignContent={'center'} marginTop={3}>
        <Grid2 containe size={5}>
          <Button
            id="basic-button"
            aria-controls={open ? 'basic-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
            style={{ display: 'flex', alignItems: 'center', height: 43, color: 'rgb(135 114 89)', fontFamily: 'inherit' }}
          >
            <MenuIcon /> <Typography gutterBottom marginTop={2} fontWeight={700} fontSize={"3rem"}>
              2048
            </Typography>
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
            defaultChecked={1}
          >
            <MenuItem onClick={handleClose} key={1}>Standard</MenuItem>
            <MenuItem onClick={handleClose}>Classic</MenuItem>
            <MenuItem onClick={handleClose}>Tutorial</MenuItem>
          </Menu>
        </Grid2>
        <Grid2 container justifyContent={'flex-start'} size={2} >
          <Grid2 size={2.8}></Grid2>
          <Grid2 container alignContent={'center'} direction={'column'} size={4} className="scoreBoard" borderRadius={3}>
            <Grid2 textAlign={'center'} className="boardName">
              SCORE
            </Grid2>
            <Grid2 textAlign={'center'} className="boardValues">
              {score}
            </Grid2>
          </Grid2>
          <Grid2 size={0.5}></Grid2>
          <Grid2 container alignContent={'center'} direction={'column'} size={4} className="bestScoreBoard" borderRadius={3}>
            <Grid2 textAlign={'center'} className="boardName">
              BEST
            </Grid2>
            <Grid2 textAlign={'center'} className="boardValues">
              {highScore}
            </Grid2>
          </Grid2>
          <Grid2 size={0.7}></Grid2>
        </Grid2>
        <Grid2 container alignItems={'center'} size={5}>
          <Grid2 size={6.4}></Grid2>
          <Grid2 size={2.3}>
            <Link href="https://docs.google.com/forms/d/e/1FAIpQLScZldyVgauCIUTfGVlV90-7Za_6kYUSMGcaNmh6WGIfOAK_RA/
            viewform?usp=pp_url&entry.1880902338=Using%20worker%3A%20true%0ARenderer%20initialized%20once%3A%20true%
            0AWorker%20startup%20failed%3A%20false%0AResolution%3A%203%0AWeb%20worker%20supported%3A%20true%0AUser%
            20agent%3A%20Mozilla%2F5.0%20(Windows%20NT%2010.0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)
            %20Chrome%2F130.0.0.0%20Safari%2F537.36%20Edg%2F130.0.0.0%0AWindow%20width%3A%201592%0AWindow%20height%3A%20921%0AScreen%
            20width%3A%201600%0AScreen%20height%3A%201000%0ADevice%20pixel%20ratio%3A%202%0ACurrent%20URL%3A%20https%3A%2F%2Fplay2048
            .co%2F%0ACookies%20enabled%3A%20true%0APlatform%3A%20Win32%0ABrowser%20version%3A%205.0%20(Windows%20NT%2010.
            0%3B%20Win64%3B%20x64)%20AppleWebKit%2F537.36%20(KHTML%2C%20like%20Gecko)%20Chrome%2F130.0.0.0%20Safari%2F537.
            36%20Edg%2F130.0.0.0%0ABrowser%20vendor%3A%20Google%20Inc.%0ABrowser%20product%3A%20Gecko%0ADevice%20memory%3A%208"
              underline='hover'
              color='inherit'
              fontSize={16}
            >
              Give Feedback
            </Link>
          </Grid2>
          <Grid2 size={3}>
            <Stack spacing={2.1} >
              <Button variant="contained" className='newGameButton' onClick={() => newGame()}>New Game</Button>
            </Stack>
          </Grid2>
          <Grid2 size={0.2}></Grid2>


        </Grid2>
      </Grid2>

      <Grid2 container justifyContent={'center'} size={12} marginTop={4}>
        <Grid2 size={5.4} justifyContent={'center'}>
          <svg width={576} height={530} viewBox='0 0 376 610' xmlns="http://www.w3.org/2000/svg" >
            <g>
              <rect width="492" height="492" rx="25" fill='#9c8979' />
            </g>
            {positiongrid.map((i) => defaultlayout(i))}
            {positiongrid.map((numX) => updatedLayout(numX, positiongrid.indexOf(numX)))}
          </svg>
        </Grid2>
      </Grid2>

      <Grid2 container justifyContent={'center'} size={12}>
        <Grid2 container justifyContent={'center'} className="footer" spacing={2}>
          <Grid2 justifyContent={'center'}>
            <Button variant="contained" className='footerButton' ><LuUndo2 size={28} /></Button>
            <Typography ><IoRemoveOutline size={30} /><IoRemoveOutline size={30} /></Typography>
          </Grid2>
          <Grid2 justifyContent={'center'}>
            <Button variant="contained" className='footerButton' ><RiSwap2Fill size={28} /></Button>
            <Typography ><IoRemoveOutline size={30} /><IoRemoveOutline size={30} /></Typography>
          </Grid2>
          <Grid2 justifyContent={'center'}>
            <Button variant="contained" className='footerButton' ><BsGridFill size={28} /></Button>
            <Typography ><IoRemoveOutline size={30} /><IoRemoveOutline size={30} /></Typography>
          </Grid2>
          <Grid2 justifyContent={'center'} >
            <Button variant="contained" className='footerButton' ><RiVipCrownFill size={28} /></Button>
          </Grid2>
        </Grid2>
      </Grid2>

      <Grid2 container justifyContent={'center'} size={12} marginTop={3}>
        <Typography fontSize={14}>play2048.co © 2014—2024 Gabriele Cirulli. All rights reserved.</Typography>

      </Grid2>

    </>
  );
}

export default App;