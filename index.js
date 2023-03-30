const boardRegions = document.querySelectorAll('#gameBoard span') // Selecionando os elementos do tabuleiro
const inputPlayer1 = document.querySelector('#player1') // Selecionando o input do primeiro jogador
const inputPlayer2 = document.querySelector('#player2') // Selecionando o input do segundo jogador
let vBoard = []
let turnPlayer = ''

// Função para atualizar o nome do jogador da vez e anunciar o resultado da partida
const updateTitle = () => {
    const playerInput = document.getElementById(turnPlayer)
    document.getElementById('turnPlayer').innerText = playerInput.value
}

// Função para iniciar o jogo e garantir que o tabuleiro seja limpo, no caso de um recomeço de jogo
const initializeGame = () => {
    if(inputPlayer1.value == '' || inputPlayer2.value == '' || inputPlayer2.value == ' ' || inputPlayer2.value == ' ') { // Verifica se os inputs estão preenchidos
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
    }) // Limpeza do tabuleiro e inicio do jogo
}

// Função para verificar quais as regiões que um jogador venceu
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

// Função para desabilitar as áreas já clicadas no tabuleiro
const disableReagion = e => {
    e.classList.remove('cursorPointer')
    e.removeEventListener('click', handleBoardClick)
}

// Função para desabilitar o tabuleiro inteiro, uma vez que algum dos jogadores ganha
const disableGameBoard = e => {
    e.forEach(spans => {
        spans.classList.remove('cursorPointer')
        spans.removeEventListener('click', handleBoardClick)
    })
}

// Função para alterar a cor da área em que o jogador venceu
const handleWin = regions =>{
    regions.forEach(region =>{
        document.querySelector('[data-region="'+ region +'"]').classList.add('win')
    })
    const playerName = document.getElementById(turnPlayer).value
    document.querySelector('h2').innerHTML = playerName + ' venceu!'
    disableGameBoard(boardRegions)
}

// Função para marcar as regiões clicadas do tabuleiro e desabilitaa-las, não podendo ser alteradas
const handleBoardClick = e => {
    const span = e.currentTarget // Seleciona o span clicado
    const region = e.currentTarget.dataset.region // Seleciona o atributo data que contém a coordenada de onde fica o span clicado
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
    console.table(vBoard) // Mostra no console uma tabela referente à situação do jogo
    disableReagion(span) // Desabilita o span clicado da vez
    const winReagions = getWinRegions()
    // Verifica se tem algum ganhador ou se deve proseguir ou declarar empate
    if(winReagions.length > 0){
        handleWin(winReagions)
    } else if (vBoard.flat().includes('')){
        turnPlayer = turnPlayer === 'player1' ? 'player2' : 'player1'
        updateTitle()
    } else {
        document.querySelector('h2').innerHTML = 'Empate!'
    }
}

document.getElementById('start').addEventListener('click', initializeGame) // Adiciona um event listener no botão "Começar"
