const boardRegions = document.querySelectorAll('#gameBoard span')
const inputPlayer1 = document.querySelector('#player1')
const inputPlayer2 = document.querySelector('#player2')
let vBoard = []
let turnPlayer = ''

const updateTitle = () => {
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turnPlayer').innerText = playerInput.value
}

const initializeGame = () => {
    if(inputPlayer1.value == '' || inputPlayer2.value == '' || inputPlayer2.value == ' ' || inputPlayer2.value == ' ') {
        alert('Digite nomes válidos')
        return
    }
    vBoard = [['', '', ''], ['', '', ''], ['', '', '']]
    turnPlayer = 'player1'
    document.querySelector('h2').innerHTML = 'Vez de: <span id="turnPlayer"></span>'
    updateTitle()
    boardRegions.forEach(e => {
        e.classList.remove('win')
        e.classList.add('cursorPointer')
        e.innerText = ''
        e.addEventListener('click', handleBoardClick)
    })
}

const getWinRegions = () => {
    const winRegions = []
    if (vBoard[0][0] && vBoard[0][0] === vBoard[0][1] && vBoard[0][0] === vBoard[0][2])
        winRegions.push("0.0", "0.1", "0.2")
    if (vBoard[1][0] && vBoard[1][0] === vBoard[1][1] && vBoard[1][0] === vBoard[1][2])
        winRegions.push("1.0", "1.1", "1.2")
    if (vBoard[2][0] && vBoard[2][0] === vBoard[2][1] && vBoard[2][0] === vBoard[2][2])
        winRegions.push("2.0", "2.1", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][0] && vBoard[0][0] === vBoard[2][0])
        winRegions.push("0.0", "1.0", "2.0")
    if (vBoard[0][1] && vBoard[0][1] === vBoard[1][1] && vBoard[0][1] === vBoard[2][1])
        winRegions.push("0.1", "1.1", "2.1")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][2] && vBoard[0][2] === vBoard[2][2])
        winRegions.push("0.2", "1.2", "2.2")
    if (vBoard[0][0] && vBoard[0][0] === vBoard[1][1] && vBoard[0][0] === vBoard[2][2])
        winRegions.push("0.0", "1.1", "2.2")
    if (vBoard[0][2] && vBoard[0][2] === vBoard[1][1] && vBoard[0][2] === vBoard[2][0])
        winRegions.push("0.2", "1.1", "2.0")
  return winRegions
}

const disableReagion = e => {
    e.classList.remove('cursorPointer')
    e.removeEventListener('click', handleBoardClick)
}

const disableGameBoard = e => {
    e.forEach(spans => {
        spans.classList.remove('cursorPointer')
        spans.removeEventListener('click', handleBoardClick)
    })
}

const handleWin = regions =>{
    regions.forEach(region =>{
        document.querySelector('[data-region="'+ region +'"]').classList.add('win')
    })
    const playerName = document.getElementById(turnPlayer).value
    document.querySelector('h2').innerHTML = playerName + ' venceu!'
    disableGameBoard(boardRegions)
}

const handleBoardClick = e => {
    const span = e.currentTarget
    const region = e.currentTarget.dataset.region
    const rowColumnPair = region.split('.')
    const row = rowColumnPair[0]
    const column = rowColumnPair[1]
    if(turnPlayer === 'player1') {
        span.innerText = 'X'
        vBoard[row][column] = 'X'
    } else {
        span.innerText = 'O'
        vBoard[row][column] = 'O'
    }
    console.clear()
    console.table(vBoard)
    disableReagion(span)
    const winReagions = getWinRegions()
    if(winReagions.length > 0){
        handleWin(winReagions)
    } else if (vBoard.flat().includes('')){
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        updateTitle()
    } else {
        document.querySelector('h2').innerHTML = 'Empate!'
    }
}

document.getElementById('start').addEventListener('click', initializeGame)