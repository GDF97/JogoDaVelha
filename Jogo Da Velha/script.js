const X_CLASS = "x"
const CIRCLE_CLASS = "circle"
const FormasDeGanhar = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
]
const cellElement = document.querySelectorAll('[data-cell]')
let circle_Turn
const mensagem = document.querySelector('[data-win-message]')
const mensagemId = document.getElementById('mensagem')
const restartButton = document.getElementById('restarButton')
start()

function start(){
    circle_Turn = false
    cellElement.forEach(cell =>{
    cell.classList.remove(X_CLASS)
    cell.classList.remove(CIRCLE_CLASS)
    cell.addEventListener('click', Clicar, {once: true})
    })
    Efeito()
    mensagemId.classList.remove('show')
}

function Clicar(e){
    cell = e.target
    const currentClass = circle_Turn ? CIRCLE_CLASS : X_CLASS
    Marcador(cell, currentClass)
    if(verificarGanhador(currentClass)){
       fimDeJogo(false)
    }
    else if(empate()){
        fimDeJogo(true)
    }
    else{
        TrocarJogador()
        Efeito()
    }
    
}

function Marcador(cell, currentClass){
        cell.classList.add(currentClass)

}

function TrocarJogador(){
    circle_Turn = !circle_Turn
}

function Efeito(){
    jogodavelha.classList.remove(X_CLASS)
    jogodavelha.classList.remove(CIRCLE_CLASS)
    if(circle_Turn){
        jogodavelha.classList.add(CIRCLE_CLASS)
        
    }
    else{
        jogodavelha.classList.add(X_CLASS)
    }
}

function verificarGanhador(currentClass){
    return FormasDeGanhar.some(combinacao =>{
        return combinacao.every(index => {
            return cellElement[index].classList.contains(currentClass)
        })
    })
}

function fimDeJogo(empate){
    if(empate){
        mensagem.innerHTML = "O Jogo empatou!!! :("
    }
    else{
        mensagem.innerHTML = circle_Turn ? "0 Venceu!!!": "X  Venceu!!!"
    }
    mensagemId.classList.add('show')
}

function empate(){
    return [...cellElement].every(cell =>{
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    })
}
